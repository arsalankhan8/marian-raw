import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function AccessibleHeroVideo({ src, regionLabel }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return undefined;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.25 &&
          !shouldReduceMotion
        ) {
          // Automatic playback is always silent. Sound is enabled only by
          // an explicit user action on the adjacent sound button.
          video.muted = true;
          setIsMuted(true);

          try {
            await video.play();
          } catch (error) {
            console.warn(`${regionLabel} background video could not play.`, error);
          }
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.25] },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      video.pause();
      video.muted = true;
    };
  }, [regionLabel, shouldReduceMotion]);

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (!video.paused) {
      video.pause();
      return;
    }

    try {
      await video.play();
    } catch (error) {
      console.warn(`${regionLabel} background video could not play.`, error);
    }
  };

  const toggleSound = async () => {
    const video = videoRef.current;

    if (!video) return;

    const nextMutedState = !video.muted;
    video.muted = nextMutedState;
    video.volume = 1;
    setIsMuted(nextMutedState);

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.warn(`${regionLabel} background video could not play.`, error);
      }
    }
  };

  const buttonClassName =
    "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/40 text-white backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-black/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  return (
    <div
      ref={sectionRef}
      className="relative flex h-[70vh] w-full overflow-hidden bg-black mt-[-92px] md:mt-[-128px] md:h-auto md:aspect-video"
    >
      <video
        ref={videoRef}
        src={src}
        muted={isMuted}
        loop
        playsInline
        preload={shouldReduceMotion ? "metadata" : "auto"}
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 z-10 bg-black/20" />

      <div
        className="absolute bottom-5 right-5 z-30 flex gap-3"
        aria-label={`${regionLabel} background video controls`}
        role="group"
      >
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className={buttonClassName}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
              <path d="m8 5 11 7-11 7V5z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? "Turn background video sound on" : "Mute background video"}
          className={buttonClassName}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="m22 9-6 6" />
              <path d="m16 9 6 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18 6a8.5 8.5 0 0 1 0 12" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
