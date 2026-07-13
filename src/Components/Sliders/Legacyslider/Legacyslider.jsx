import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../../../assets/sliderimg1.webp";
import img2 from "../../../assets/sliderimg2.webp";
import img3 from "../../../assets/sliderimg3.webp";
import line from "../../../assets/line.png";
import left from "../../../assets/left.png";
import right from "../../../assets/right.png";

const slides = [
  {
    id: 1,
    img: img1,
    title: "Precision Fabrication",
    description:
      "Exacting standards from model to installation deliver reliability and consistency.",
  },
  {
    id: 2,
    img: img2,
    title: "Innovative Design",
    description:
      "Creative solutions and cutting-edge tools ensure modern and efficient fabrication.",
  },
  {
    id: 3,
    img: img3,
    title: "Reliable Installation",
    description:
      "Seamless and accurate installation provides long-lasting quality and durability.",
  },
];

export default function LegacySlider() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null); // "next" or "prev" or null
  const sliderRef = useRef(null);

  // fixed sizes to keep layout consistent
  const SMALL_H = 213; // px (small thumbnails)
  const LARGE_H = 370; // px (active)
  const GAP = 24; // px (approx gap-6)
  const STACK_HEIGHT = SMALL_H + GAP + LARGE_H + GAP + SMALL_H; // container height

  const prevIdx = (index - 1 + slides.length) % slides.length;
  const nextIdx = (index + 1) % slides.length;

  const handleNext = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);

    setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
      setIsAnimating(false);
      setDirection(null);
    }, 700); // match transition duration
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);

    setTimeout(() => {
      setIndex((i) => (i - 1 + slides.length) % slides.length);
      setIsAnimating(false);
      setDirection(null);
    }, 700);
  };

  // computed differences for translateY animations (px)
  const centerToTop = SMALL_H + GAP; // how much center must move up to top
  const bottomToCenter = LARGE_H + GAP; // how much bottom must move up to center

  // --- SCROLL HANDLER (wheel + touch) ---
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let touchStartY = null;

    const onWheel = (e) => {
      // if animation is running, we still prevent default so page doesn't scroll
      // but we ignore triggering another slide change
      if (isAnimating) {
        if (e.cancelable) {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }

      // Only handle wheel that happens over this element (listener is attached to el)
      if (e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (e.deltaY > 0) {
        handleNext();
      } else if (e.deltaY < 0) {
        handlePrev();
      }
    };

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0 || touchStartY === null) return;

      const currentY = e.touches[0].clientY;
      const delta = touchStartY - currentY;

      // small threshold to avoid accidental triggers
      if (Math.abs(delta) < 20) return;

      // prevent page scroll while interacting with slider
      if (e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (isAnimating) return;

      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }

      // reset to avoid multiple triggers for the same swipe motion
      touchStartY = null;
    };

    // Use capture:true and passive:false so we can preventDefault reliably
    el.addEventListener("wheel", onWheel, { passive: false, capture: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });

    return () => {
      el.removeEventListener("wheel", onWheel, { capture: true });
      el.removeEventListener("touchstart", onTouchStart, { capture: true });
      el.removeEventListener("touchmove", onTouchMove, { capture: true });
    };
  }, [isAnimating]); // keep same dependency as before

  return (
    <div className="max-w-[90vw] mx-auto w-full p-[30px] rounded-4xl mb-[70px] bg-[#00688F1A] overflow-hidden">
      <div className="flex gap-28">
        {/* LEFT SIDE - Images (scroll target) */}
        <div
          ref={sliderRef}
          className="flex flex-col items-center justify-center w-[45%] relative overflow-hidden"
          style={{
            height: `${STACK_HEIGHT}px`,
            minHeight: `${STACK_HEIGHT}px`,
            maxHeight: `${STACK_HEIGHT}px`,
          }}
        >
          {/* Top (previous) */}
          <motion.img
            key={`prev-${slides[prevIdx].id}`}
            src={slides[prevIdx].img}
            alt={slides[prevIdx].title}
            draggable={false}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              borderRadius: 16,
            }}
            initial={false}
            animate={
              isAnimating && direction === "next"
                ? { opacity: 0, y: -20 }
                : isAnimating && direction === "prev"
                ? { y: centerToTop, height: LARGE_H }
                : { opacity: 1, y: 0, height: SMALL_H }
            }
            transition={{ duration: 0.7, ease: [0.22, 0.8, 0.32, 1] }}
            className="object-cover"
          />

          {/* Center (current) */}
          <motion.img
            key={`current-${slides[index].id}`}
            src={slides[index].img}
            alt={slides[index].title}
            draggable={false}
            style={{
              position: "absolute",
              left: 0,
              top: `${centerToTop}px`,
              width: "100%",
              borderRadius: 16,
            }}
            initial={false}
            animate={
              isAnimating && direction === "next"
                ? { y: -centerToTop, height: SMALL_H }
                : isAnimating && direction === "prev"
                ? { y: bottomToCenter, height: SMALL_H }
                : { y: 0, height: LARGE_H }
            }
            transition={{ duration: 0.7, ease: [0.22, 0.8, 0.32, 1] }}
            className="object-cover"
          />

          {/* Bottom (next) */}
          <motion.img
            key={`next-${slides[nextIdx].id}`}
            src={slides[nextIdx].img}
            alt={slides[nextIdx].title}
            draggable={false}
            style={{
              position: "absolute",
              left: 0,
              top: `${centerToTop + LARGE_H + GAP}px`,
              width: "100%",
              borderRadius: 16,
            }}
            initial={false}
            animate={
              isAnimating && direction === "next"
                ? { y: -bottomToCenter, height: LARGE_H }
                : isAnimating && direction === "prev"
                ? { opacity: 0, y: 20 }
                : { y: 0, height: SMALL_H }
            }
            transition={{ duration: 0.7, ease: [0.22, 0.8, 0.32, 1] }}
            className="object-cover"
          />
        </div>

        {/* RIGHT SIDE - Text */}
        <div className="flex flex-col justify-between w-[55%]">
          <div className="flex flex-col gap-3">
            <p className="font-unageo leading-[112%] text-[19px] 3xl:text-[24px]">
              Our Process
            </p>
            <img src={line} alt="arrow" className="w-[1px] h-[38px]" />
            <p className="font-unageo leading-[112%] text-[19px] 3xl:text-[24px]">
              {`0${index + 1}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="flex flex-col gap-6"
            >
              <p className="font-unageo-bold text-[65px] 3xl:text-[72px] leading-[97%] text-[#00688F] capitalize">
                {slides[index].title}
              </p>
              <p className="font-unageo text-[25px] mt-[-15px] 3xl:text-[28px]">
                {slides[index].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              aria-label="Previous"
              className="disabled:opacity-50"
            >
              <img src={left} alt="left" />
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              aria-label="Next"
              className="disabled:opacity-50"
            >
              <img src={right} alt="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
