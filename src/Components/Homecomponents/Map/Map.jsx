import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import pinIcon from "../../../assets/pin.png";
import mapsimg from "../../../assets/maps.png";
import arrow1 from "../../../assets/arrow1.png";
import arrow2 from "../../../assets/arrow2.png";
import arrow3 from "../../../assets/arrow3.png";

export default function Maps() {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.9,
  });

  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [paddingPct, setPaddingPct] = useState(56.25); // fallback 16:9 ratio
  const [step, setStep] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [hasLockedOnce, setHasLockedOnce] = useState(false);

  const lastWheelTimeRef = useRef(0);
  const wheelDelay = 600; // ms throttle between wheel-driven steps
  const maxStep = 4; // grouped steps — final step when all pins displayed

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      if (img.naturalWidth && img.naturalHeight) {
        const ratio = (img.naturalHeight / img.naturalWidth) * 100;
        setPaddingPct(ratio);
      }
    };

    if (img.complete) handleLoad();
    else img.addEventListener("load", handleLoad);

    return () => img.removeEventListener("load", handleLoad);
  }, []);

  // When the section becomes visible for the first time, mark that we should lock scroll
  useEffect(() => {
    if (inView && !hasLockedOnce) {
      setHasLockedOnce(true);
    }
  }, [inView, hasLockedOnce]);

  // If step reaches final, mark animation complete
  useEffect(() => {
    if (step >= maxStep && !animationComplete) {
      setAnimationComplete(true);
    }
  }, [step, animationComplete]);

  // Install blocking/throttled handlers when we need to lock (first time in view until animationComplete)
  useEffect(() => {
    if (!hasLockedOnce || animationComplete) return;

    // block default & advance grouped step (throttled)
    const handleWheel = (e) => {
      // Only act if we actually are in the viewport (prevents accidental locks)
      if (!inView) return;
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastWheelTimeRef.current < wheelDelay) {
        return; // throttle
      }
      lastWheelTimeRef.current = now;

      if (e.deltaY > 0) {
        setStep((prev) => Math.min(prev + 1, maxStep));
      } else {
        setStep((prev) => Math.max(prev - 1, 0));
      }
    };

    // touchmove should also be blocked
    const handleTouchMove = (e) => {
      if (!inView) return;
      e.preventDefault();
      e.stopPropagation();
    };

    // block keyboard navigation (arrows, space, page up/down) while locked
    const handleKeyDown = (e) => {
      if (!inView) return;
      const blocked = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        " ",
        "Home",
        "End",
      ];
      if (blocked.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Add listeners on capture and passive:false so preventDefault works reliably
    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
    window.addEventListener("keydown", handleKeyDown, { passive: false, capture: true });

    // also prevent overscroll behavior for better UX on some browsers
    const prevOverscroll = document.documentElement.style.overscrollBehavior;
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.documentElement.style.overscrollBehavior = prevOverscroll || "";
    };
  }, [hasLockedOnce, animationComplete, inView]);

  // Pins and Arrows data
  const pins = [
    { id: 1, name: "Canada", top: "25%", left: "8%" },
    { id: 2, name: "USA", top: "47%", left: "18%" },
    { id: 3, name: "Europe", top: "55%", left: "53%" },
    { id: 4, name: "Austria", top: "28%", left: "65%" },
  ];

  const arrows = [
    { id: 1, src: arrow1, top: "21%", left: "11%" }, // Canada → USA
    { id: 2, src: arrow2, top: "37%", left: "20%" }, // USA → Europe
    { id: 3, src: arrow3, top: "23%", left: "56%" }, // Europe → Austria
  ];

  // Grouped visibility logic (with stagger)
  const shouldShowPin = (index) => step > index; // step 1 => pin0, step 2 => pin1, ...
  const shouldShowArrow = (index) => step > index + 1; // arrow appears slightly after its preceding pin

  return (
    <div className="w-full flex justify-center pt-[70px]">
      <div
        ref={inViewRef}
        className="relative w-full max-w-[1500px] min-w-[1480px]"
        
      >
        <div
          ref={containerRef}
          className="relative w-full"
          style={{
            paddingBottom: `${paddingPct}%`,
            WebkitTransform: "translateZ(0)",
          }}
        >
          {/* World Map */}
          <img
            ref={imgRef}
            src={mapsimg}
            alt="World Map"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ display: "block" }}
          />

          {/* Pins & Arrows */}
          {pins.map((pin, i) => (
            <React.Fragment key={pin.id}>
              {/* Pin */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  shouldShowPin(i)
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute flex flex-col items-center"
                style={{
                  top: pin.top,
                  left: pin.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src={pinIcon}
                  alt={pin.name}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-10 lg:w-[37px] lg:h-[46px]"
                />
                <p className="text-black font-semibold text-[10px] sm:text-sm md:text-[18px] lg:text-[26px] font-unageo-semibold whitespace-nowrap mt-1">
                  {pin.name}
                </p>
              </motion.div>

              {/* Arrow (staggered 0.5s after pin) */}
              {i < arrows.length && (
                <motion.img
                  key={`arrow-${i}`}
                  src={arrows[i].src}
                  alt={`arrow-${i}`}
                  className="absolute"
                  style={{
                    top: arrows[i].top,
                    left: arrows[i].left,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={
                    shouldShowArrow(i)
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.85 }
                  }
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: shouldShowPin(i) ? 0.5 : 0,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
