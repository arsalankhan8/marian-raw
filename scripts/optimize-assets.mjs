import { spawn } from "node:child_process";
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const sourceAssetsRoot = path.join(projectRoot, "src", "assets");
const publicRoot = path.join(projectRoot, "public");
const optimizedRoot = path.join(projectRoot, ".optimized");
const optimizedAssetsRoot = path.join(optimizedRoot, "assets");
const optimizedPublicRoot = path.join(optimizedRoot, "public");
const manifestPath = path.join(optimizedRoot, "manifest.json");

const IMAGE_EXTENSIONS = new Set([".avif", ".gif", ".jfif", ".jpeg", ".jpg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm"]);
const CONFIG_VERSION = 3;

const EXCLUDED_PUBLIC_IMAGES = new Set([
  "images/portfolio/50Wellesley/1.jpg",
  "images/portfolio/ArtGallery/1.jpg",
  "images/portfolio/LaserCentre/1.webp",
  "images/portfolio/TDTerrace/1.webp",
  "images/portfolio/TheLuminousVeil/TheLuminousVeil.jpg",
  "images/portfolio/TheWell/1.webp",
]);

const VIDEO_CONFIG = {
  "home/RegionVideo.mp4": { keepAudio: false },
  "home/new-videos/canada-video.mp4": { keepAudio: true },
  "home/new-videos/usa-video.mp4": { keepAudio: true },
};

function normalizePath(value) {
  return value.split(path.sep).join("/");
}

function isInside(parent, child) {
  const relative = path.relative(parent, child);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function assertSafeGeneratedRoot() {
  const expected = path.resolve(projectRoot, ".optimized");

  if (optimizedRoot !== expected || !isInside(projectRoot, optimizedRoot)) {
    throw new Error(`Refusing to manage unexpected generated directory: ${optimizedRoot}`);
  }
}

async function walkFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await walkFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function readPreviousManifest() {
  try {
    return JSON.parse(await readFile(manifestPath, "utf8"));
  } catch {
    return { records: {} };
  }
}

async function ensureParent(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function runFfmpeg(args, label, { captureStdout = false } = {}) {
  if (!ffmpegPath) {
    throw new Error("ffmpeg-static did not provide an executable path.");
  }

  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, {
      cwd: projectRoot,
      windowsHide: true,
      stdio: ["ignore", captureStdout ? "pipe" : "ignore", "pipe"],
    });
    const stdoutChunks = [];
    let stderr = "";

    child.stdout?.on("data", (chunk) => stdoutChunks.push(chunk));
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      if (stderr.length > 12000) stderr = stderr.slice(-12000);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve(captureStdout ? Buffer.concat(stdoutChunks) : undefined);
        return;
      }

      reject(new Error(`${label} failed with exit code ${code}.\n${stderr}`));
    });
  });
}

function sourceImageProfile(relativePath, metadata, inputBytes) {
  const normalized = normalizePath(relativePath);
  const extension = path.posix.extname(normalized).toLowerCase();
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  const isJpegPhoto = [".jpeg", ".jpg", ".jfif"].includes(extension) &&
    width >= 300 &&
    height >= 250 &&
    inputBytes >= 80 * 1024;
  const isPhotographic = isJpegPhoto ||
    (width >= 700 && height >= 500 && inputBytes >= 80 * 1024);

  if (!isPhotographic) {
    return { copy: true, label: "utility" };
  }

  if (/banner|ContactBanner|Hospitality|Pillar|Static\//i.test(normalized)) {
    return { maxWidth: 1920, quality: 88, label: "hero" };
  }

  if (/^Expertise\//i.test(normalized)) {
    return { maxWidth: 1600, quality: 86, label: "gallery" };
  }

  if (/^(HomeSec3|sliderbanner|awards|Certificates)\//i.test(normalized)) {
    return { maxWidth: 1200, quality: 85, label: "card" };
  }

  if (/mobile/i.test(normalized)) {
    return { maxWidth: 900, quality: 84, label: "mobile" };
  }

  return { maxWidth: 1600, quality: 85, label: "gallery" };
}

function publicImageProfile(relativePath, heroPaths) {
  const publicUrl = `/${normalizePath(relativePath)}`;

  if (heroPaths.has(publicUrl)) {
    return { maxWidth: 1920, quality: 88, label: "hero" };
  }

  if (/\/Detailslider\//i.test(publicUrl) || /\/blogs\//i.test(publicUrl)) {
    return { maxWidth: 900, quality: 84, label: "card" };
  }

  return { maxWidth: 1200, quality: 84, label: "gallery" };
}

async function getHeroPublicPaths() {
  const componentPaths = [
    "src/Components/Sliders/Homeslidernew/Homeslidernew.jsx",
    "src/Components/Sliders/Homeslidernew/USHomeslidernew.jsx",
    "src/Components/Sliders/Portfoliopageslider/Portfoliopagesliderv2.jsx",
    "src/Components/Sliders/Portfoliopageslider/USPortfoliopagesliderv2.jsx",
  ];
  const result = new Set();

  for (const componentPath of componentPaths) {
    const source = await readFile(path.join(projectRoot, componentPath), "utf8");

    for (const match of source.matchAll(/\/images\/[^"'`)\s?#]+/g)) {
      result.add(match[0]);
    }
  }

  return result;
}

function makeOutputRelative(relativePath, collisions) {
  const normalized = normalizePath(relativePath);
  const extension = path.posix.extname(normalized).toLowerCase();
  const stem = normalized.slice(0, -extension.length);
  const collisionKey = stem.toLowerCase();
  const suffix = collisions.has(collisionKey) ? `--${extension.slice(1)}` : "";
  return `${stem}${suffix}.webp`;
}

function findStemCollisions(relativePaths) {
  const groups = new Map();

  for (const relativePath of relativePaths) {
    const normalized = normalizePath(relativePath);
    const extension = path.posix.extname(normalized);
    const key = normalized.slice(0, -extension.length).toLowerCase();
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }

  return new Set([...groups].filter(([, count]) => count > 1).map(([key]) => key));
}

async function optimizeImage({
  inputPath,
  outputPath,
  profile,
  allowOriginalWebp = true,
}) {
  const inputBuffer = await readFile(inputPath);
  const inputExtension = path.extname(inputPath).toLowerCase();
  const image = sharp(inputBuffer, { failOn: "warning" });
  const metadata = await image.metadata();

  if (profile.copy) {
    await ensureParent(outputPath);
    await writeFile(outputPath, inputBuffer);
    return {
      bytes: inputBuffer.length,
      format: metadata.format,
      width: metadata.width,
      height: metadata.height,
      copied: true,
    };
  }

  const outputBuffer = await image
    .rotate()
    .resize({
      width: profile.maxWidth,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: profile.quality,
      alphaQuality: 100,
      effort: 6,
      smartSubsample: true,
    })
    .toBuffer();

  const shouldKeepOriginal =
    allowOriginalWebp &&
    inputExtension === ".webp" &&
    (metadata.width ?? 0) <= profile.maxWidth &&
    outputBuffer.length >= inputBuffer.length;
  const finalBuffer = shouldKeepOriginal ? inputBuffer : outputBuffer;
  const finalMetadata = shouldKeepOriginal
    ? metadata
    : await sharp(finalBuffer).metadata();

  await ensureParent(outputPath);
  await writeFile(outputPath, finalBuffer);

  return {
    bytes: finalBuffer.length,
    format: finalMetadata.format,
    width: finalMetadata.width,
    height: finalMetadata.height,
    copied: shouldKeepOriginal,
  };
}

async function transcodeVideo(inputPath, outputPath, keepAudio) {
  await ensureParent(outputPath);

  const args = [
    "-y",
    "-i", inputPath,
    "-map", "0:v:0",
  ];

  if (keepAudio) {
    args.push("-map", "0:a?");
  }

  args.push(
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "24",
    "-tune", "film",
    "-profile:v", "high",
    "-level", "4.1",
    "-pix_fmt", "yuv420p",
    "-vf", "scale=min(1920\\,iw):-2",
    "-movflags", "+faststart",
  );

  if (keepAudio) {
    args.push("-c:a", "aac", "-b:a", "160k");
  } else {
    args.push("-an");
  }

  args.push(outputPath);
  await runFfmpeg(args, `Transcoding ${path.basename(inputPath)}`);
}

async function createPoster(videoPath, outputPath) {
  const frame = await runFfmpeg([
    "-ss", "00:00:01",
    "-i", videoPath,
    "-frames:v", "1",
    "-f", "image2pipe",
    "-vcodec", "png",
    "pipe:1",
  ], `Creating poster for ${path.basename(videoPath)}`, { captureStdout: true });

  await ensureParent(outputPath);
  await sharp(frame)
    .resize({ width: 1920, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toFile(outputPath);
}

function isReusable(previousRecord, sourceStats, signature, outputPath) {
  return previousRecord?.sourceBytes === sourceStats.size &&
    previousRecord?.sourceMtimeMs === sourceStats.mtimeMs &&
    previousRecord?.signature === signature &&
    previousRecord?.outputPath === normalizePath(path.relative(optimizedRoot, outputPath));
}

async function outputExists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function pruneGeneratedFiles(directory, expectedFiles) {
  const files = await walkFiles(directory);

  for (const filePath of files) {
    if (!expectedFiles.has(path.resolve(filePath))) {
      await rm(filePath, { force: true });
    }
  }
}

function formatMiB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

async function main() {
  assertSafeGeneratedRoot();
  await mkdir(optimizedAssetsRoot, { recursive: true });
  await mkdir(optimizedPublicRoot, { recursive: true });

  sharp.cache(false);
  sharp.concurrency(Math.max(1, Math.min(4, sharp.concurrency())));

  const previousManifest = await readPreviousManifest();
  const expectedFiles = new Set();
  const records = {};
  const sourceMap = {};
  const publicMap = {};
  const heroPublicPaths = await getHeroPublicPaths();
  const sourceFiles = await walkFiles(sourceAssetsRoot);
  const publicFiles = await walkFiles(publicRoot);
  const sourceImages = sourceFiles.filter((filePath) => IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()));
  const publicImages = publicFiles.filter((filePath) => IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()));
  const sourceImageRelativePaths = sourceImages.map((filePath) => path.relative(sourceAssetsRoot, filePath));
  const publicImageRelativePaths = publicImages.map((filePath) => path.relative(publicRoot, filePath));
  const sourceCollisions = findStemCollisions(sourceImageRelativePaths);
  const publicCollisions = findStemCollisions(publicImageRelativePaths);
  const summary = {
    sourceBytes: 0,
    outputBytes: 0,
    optimizedImages: 0,
    copiedUtilities: 0,
    reusedFiles: 0,
    excludedPublicImages: [],
    profiles: {},
  };

  const staticPublicFiles = publicFiles.filter((filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    return !IMAGE_EXTENSIONS.has(extension) && !VIDEO_EXTENSIONS.has(extension);
  });

  for (const inputPath of staticPublicFiles) {
    const relativePath = path.relative(publicRoot, inputPath);
    const outputPath = path.join(optimizedPublicRoot, relativePath);
    await ensureParent(outputPath);
    await cp(inputPath, outputPath, { force: true });
    expectedFiles.add(path.resolve(outputPath));
  }

  const imageJobs = [
    ...sourceImages.map((inputPath) => ({ scope: "source", inputPath })),
    ...publicImages.map((inputPath) => ({ scope: "public", inputPath })),
  ];

  let completedImages = 0;

  for (const job of imageJobs) {
    const inputRoot = job.scope === "source" ? sourceAssetsRoot : publicRoot;
    const outputRoot = job.scope === "source" ? optimizedAssetsRoot : optimizedPublicRoot;
    const relativePath = path.relative(inputRoot, job.inputPath);
    const normalizedRelativePath = normalizePath(relativePath);

    if (job.scope === "public" && EXCLUDED_PUBLIC_IMAGES.has(normalizedRelativePath)) {
      summary.excludedPublicImages.push(normalizedRelativePath);
      continue;
    }

    const sourceStats = await stat(job.inputPath);
    const metadata = await sharp(job.inputPath).metadata();
    const profile = job.scope === "source"
      ? sourceImageProfile(relativePath, metadata, sourceStats.size)
      : publicImageProfile(relativePath, heroPublicPaths);
    const collisionSet = job.scope === "source" ? sourceCollisions : publicCollisions;
    const outputRelativePath = profile.copy
      ? normalizedRelativePath
      : makeOutputRelative(relativePath, collisionSet);
    const outputPath = path.join(outputRoot, ...outputRelativePath.split("/"));
    const signature = JSON.stringify({ version: CONFIG_VERSION, scope: job.scope, profile, outputRelativePath });
    const recordKey = `${job.scope}:${normalizedRelativePath}`;
    const previousRecord = previousManifest.records?.[recordKey];
    let result;

    if (isReusable(previousRecord, sourceStats, signature, outputPath) && await outputExists(outputPath)) {
      const outputStats = await stat(outputPath);
      result = {
        bytes: outputStats.size,
        format: previousRecord.format,
        width: previousRecord.width,
        height: previousRecord.height,
        copied: previousRecord.copied,
      };
      summary.reusedFiles += 1;
    } else {
      result = await optimizeImage({
        inputPath: job.inputPath,
        outputPath,
        profile,
        allowOriginalWebp: true,
      });
    }

    expectedFiles.add(path.resolve(outputPath));
    summary.sourceBytes += sourceStats.size;
    summary.outputBytes += result.bytes;
    summary[profile.copy ? "copiedUtilities" : "optimizedImages"] += 1;
    summary.profiles[profile.label] = (summary.profiles[profile.label] ?? 0) + 1;
    records[recordKey] = {
      sourceBytes: sourceStats.size,
      sourceMtimeMs: sourceStats.mtimeMs,
      outputBytes: result.bytes,
      outputPath: normalizePath(path.relative(optimizedRoot, outputPath)),
      signature,
      format: result.format,
      width: result.width,
      height: result.height,
      copied: result.copied,
    };

    if (job.scope === "source") {
      sourceMap[normalizedRelativePath] = outputRelativePath;
    } else {
      publicMap[`/${normalizedRelativePath}`] = `/${outputRelativePath}`;
    }

    completedImages += 1;
    if (completedImages % 50 === 0 || completedImages === imageJobs.length) {
      console.log(`Images: ${completedImages}/${imageJobs.length}`);
    }
  }

  for (const [relativePath, config] of Object.entries(VIDEO_CONFIG)) {
    const inputPath = path.join(sourceAssetsRoot, ...relativePath.split("/"));
    const outputPath = path.join(optimizedAssetsRoot, ...relativePath.split("/"));
    const posterRelativePath = relativePath.replace(/\.mp4$/i, "-poster.webp");
    const posterPath = path.join(optimizedAssetsRoot, ...posterRelativePath.split("/"));
    const sourceStats = await stat(inputPath);
    const signature = JSON.stringify({ version: CONFIG_VERSION, type: "video", ...config, crf: 24, preset: "slow" });
    const recordKey = `video:${relativePath}`;
    const previousRecord = previousManifest.records?.[recordKey];
    const reusable = isReusable(previousRecord, sourceStats, signature, outputPath) &&
      await outputExists(outputPath) &&
      await outputExists(posterPath);

    if (!reusable) {
      console.log(`Video: optimizing ${relativePath}`);
      await transcodeVideo(inputPath, outputPath, config.keepAudio);
      await createPoster(outputPath, posterPath);
    } else {
      summary.reusedFiles += 2;
    }

    const outputStats = await stat(outputPath);
    const posterStats = await stat(posterPath);
    expectedFiles.add(path.resolve(outputPath));
    expectedFiles.add(path.resolve(posterPath));
    summary.sourceBytes += sourceStats.size;
    summary.outputBytes += outputStats.size + posterStats.size;
    sourceMap[relativePath] = relativePath;
    records[recordKey] = {
      sourceBytes: sourceStats.size,
      sourceMtimeMs: sourceStats.mtimeMs,
      outputBytes: outputStats.size,
      posterBytes: posterStats.size,
      outputPath: normalizePath(path.relative(optimizedRoot, outputPath)),
      posterPath: normalizePath(path.relative(optimizedRoot, posterPath)),
      signature,
    };
  }

  const originalRedirectsPath = path.join(publicRoot, "_redirects");
  let originalRedirects = "";

  try {
    originalRedirects = (await readFile(originalRedirectsPath, "utf8")).trim();
  } catch {
    // A redirects file is optional.
  }

  const compatibilityRedirects = Object.entries(publicMap)
    .filter(([originalUrl, optimizedUrl]) => originalUrl !== optimizedUrl)
    .map(([originalUrl, optimizedUrl]) => `${originalUrl} ${optimizedUrl} 301`);
  const generatedRedirectsPath = path.join(optimizedPublicRoot, "_redirects");
  await writeFile(
    generatedRedirectsPath,
    `${compatibilityRedirects.join("\n")}\n${originalRedirects}\n`,
    "utf8",
  );
  expectedFiles.add(path.resolve(generatedRedirectsPath));

  const originalHeadersPath = path.join(publicRoot, "_headers");
  let originalHeaders = "";

  try {
    originalHeaders = (await readFile(originalHeadersPath, "utf8")).trim();
  } catch {
    // A headers file is optional.
  }

  const generatedHeadersPath = path.join(optimizedPublicRoot, "_headers");
  const cacheHeaders = [
    "/assets/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
    "/images/*",
    "  Cache-Control: public, max-age=604800, stale-while-revalidate=86400",
    "",
    "/index.html",
    "  Cache-Control: public, max-age=0, must-revalidate",
  ].join("\n");
  await writeFile(
    generatedHeadersPath,
    `${originalHeaders}\n\n${cacheHeaders}\n`,
    "utf8",
  );
  expectedFiles.add(path.resolve(generatedHeadersPath));

  const manifest = {
    version: CONFIG_VERSION,
    generatedAt: new Date().toISOString(),
    sourceAssets: sourceMap,
    publicAssets: publicMap,
    excludedPublicImages: summary.excludedPublicImages,
    records,
    summary,
  };
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  expectedFiles.add(path.resolve(manifestPath));

  await pruneGeneratedFiles(optimizedAssetsRoot, expectedFiles);
  await pruneGeneratedFiles(optimizedPublicRoot, expectedFiles);

  console.log(`Original processed media: ${formatMiB(summary.sourceBytes)}`);
  console.log(`Generated media: ${formatMiB(summary.outputBytes)}`);
  console.log(`Generator reduction: ${(100 * (1 - summary.outputBytes / summary.sourceBytes)).toFixed(1)}%`);
  console.log(`Reused generated files: ${summary.reusedFiles}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
