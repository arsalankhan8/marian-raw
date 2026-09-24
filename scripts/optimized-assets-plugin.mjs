import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

function normalizePath(value) {
  return value.split(path.sep).join("/");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isInside(parent, child) {
  const relative = path.relative(parent, child);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

export function optimizedAssetsPlugin(projectRoot) {
  const sourceAssetsRoot = path.resolve(projectRoot, "src/assets");
  const optimizedAssetsRoot = path.resolve(projectRoot, ".optimized/assets");
  const manifestPath = path.resolve(projectRoot, ".optimized/manifest.json");
  let manifest = { sourceAssets: {}, publicAssets: {} };
  let publicPattern = null;

  function loadManifest() {
    if (!existsSync(manifestPath)) return;

    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const publicUrls = Object.keys(manifest.publicAssets).sort((a, b) => b.length - a.length);
    publicPattern = publicUrls.length > 0
      ? new RegExp(publicUrls.map(escapeRegExp).join("|"), "g")
      : null;
  }

  return {
    name: "mariani-optimized-assets",
    enforce: "pre",

    configResolved() {
      loadManifest();
    },

    buildStart() {
      if (!existsSync(manifestPath)) {
        this.error("Optimized asset manifest is missing. Run `npm run optimize:assets` first.");
      }
    },

    resolveId(source, importer) {
      if (!importer || !source.startsWith(".")) return null;

      const cleanImporter = importer.split("?", 1)[0];
      const cleanSource = source.split("?", 1)[0];
      const candidate = path.resolve(path.dirname(cleanImporter), cleanSource);

      if (!isInside(sourceAssetsRoot, candidate)) return null;

      const relativePath = normalizePath(path.relative(sourceAssetsRoot, candidate));
      const optimizedRelativePath = manifest.sourceAssets[relativePath];

      if (!optimizedRelativePath) return null;

      return path.join(optimizedAssetsRoot, ...optimizedRelativePath.split("/"));
    },

    transform(code, id) {
      const cleanId = id.split("?", 1)[0];

      if (!publicPattern || !isInside(path.resolve(projectRoot, "src"), cleanId)) {
        return null;
      }

      const transformed = code.replace(
        publicPattern,
        (url) => manifest.publicAssets[url] ?? url,
      );

      return transformed === code ? null : { code: transformed, map: null };
    },

    generateBundle(_outputOptions, bundle) {
      const referenceText = Object.values(bundle)
        .map((output) => {
          if (output.type === "chunk") return output.code;
          return typeof output.source === "string" ? output.source : "";
        })
        .join("\n");

      for (const [bundleKey, output] of Object.entries(bundle)) {
        if (output.type !== "asset" || !output.fileName.startsWith("assets/")) continue;

        const extension = path.extname(output.fileName).toLowerCase();
        const isGeneratedMedia = [
          ".avif", ".gif", ".jpeg", ".jpg", ".mp4", ".png", ".webm", ".webp",
        ].includes(extension);

        if (!isGeneratedMedia) continue;

        const fileName = path.posix.basename(output.fileName);

        if (!referenceText.includes(fileName)) {
          delete bundle[bundleKey];
        }
      }
    },
  };
}
