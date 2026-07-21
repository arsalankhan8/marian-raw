import { useEffect, useRef, useState } from "react";
import USVideo from "../../../assets/home/new-videos/usa-video.mp4";

export default function USHerosection1() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);

  const pauseAndMuteVideo = () => {
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.muted = true;
    setIsMuted(true);
  };

  const playMutedVideo = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      video.muted = true;
      setIsMuted(true);
      await video.play();
    } catch (error) {
      console.error("US video autoplay failed:", error);
    }
  };

  const toggleSound = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      video.muted = !video.muted;
      setIsMuted(video.muted);

      if (video.paused) {
        await video.play();
      }
    } catch (error) {
      console.error("Video sound toggle failed:", error);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          playMutedVideo();
        } else {
          pauseAndMuteVideo();
        }
      },
      {
        threshold: [0, 0.25],
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      const video = videoRef.current;

      if (video) {
        video.pause();
        video.muted = true;
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex w-full h-[70vh] md:h-auto md:aspect-video mt-[-92px] md:mt-[-128px] overflow-hidden bg-black"
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={USVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/20" />

      {/* Sound Toggle Button */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? "Turn sound on" : "Mute video"}
        className="absolute bottom-5 right-5 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/40 text-white backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-black/60"
      >
        {isMuted ? (
          /* Muted Icon */
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="m22 9-6 6" />
            <path d="m16 9 6 6" />
          </svg>
        ) : (
          /* Sound On Icon */
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18 6a8.5 8.5 0 0 1 0 12" />
          </svg>
        )}
      </button>

      {/* Content Layer */}
      <div className="pointer-events-none relative z-20 flex h-full w-full flex-col">
        {/* Your content goes here */}
      </div>
    </div>
  );
}