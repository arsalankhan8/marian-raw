import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../../../assets/tabs2.webp";
import img2 from "../../../assets/sliderimg2.webp";
import img3 from "../../../assets/sliderimg3.webp";
import line from "../../../assets/line.png";
import left from "../../../assets/left.png";
import right from "../../../assets/right.png";
import img4 from "../../../assets/tabs.webp";

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
    title: "Integrate Innovation",
    description:
      "Advanced tools are applied with purpose to resolve complexity and bring clarity.",
  },
  {
    id: 3,
    img: img4,
    title: "Bespoke Solutions",
    description:
      "Every project is addressed with tailored methods that respect its unique demands.",
  },
];

export default function Legacysliderv2() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const sliderRef = useRef(null);

  const SMALL_H = 213;
  const LARGE_H = 370;
  const GAP = 24;
  const STACK_HEIGHT = SMALL_H + GAP + LARGE_H + GAP + SMALL_H;

  const prevIdx = (index - 1 + slides.length) % slides.length;
  const nextIdx = (index + 1) % slides.length;

  const handleNext = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);
    setIndex((i) => (i + 1) % slides.length);
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 0); // ✅ No delay
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 0); // ✅ No delay
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let touchStartY = null;

    const onWheel = (e) => {
      if (isAnimating) {
        if (e.cancelable) {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }
      if (e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
      }
      e.deltaY > 0 ? handleNext() : handlePrev();
    };

    const onTouchStart = (e) => {
      if (!e.touches?.length) return;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!e.touches?.length || touchStartY === null) return;
      const delta = touchStartY - e.touches[0].clientY;
      if (Math.abs(delta) < 20) return;
      if (e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (isAnimating) return;
      delta > 0 ? handleNext() : handlePrev();
      touchStartY = null;
    };

    el.addEventListener("wheel", onWheel, { passive: false, capture: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });

    return () => {
      el.removeEventListener("wheel", onWheel, { capture: true });
      el.removeEventListener("touchstart", onTouchStart, { capture: true });
      el.removeEventListener("touchmove", onTouchMove, { capture: true });
    };
  }, [isAnimating]);

  return (
    <div
      ref={sliderRef}
      className="max-w-[90vw] mx-auto w-full p-[30px] rounded-4xl mb-[70px] bg-[#00688F1A] overflow-hidden"
    >
      <div className="flex flex-wrap md:flex-nowrap gap-28">
        {/* LEFT SIDE - IMAGE */}
        <div
          className="flex flex-col items-center justify-center w-[100%] md:w-[45%] relative overflow-hidden h-[400px] md:h-[500px]"
         
        >
          <motion.img
            key={`current-${slides[index].id}`}
            src={slides[index].img}
            alt={slides[index].title}
            draggable={false}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.93 }}
            transition={{ duration: 0.7, ease: [0.22, 0.8, 0.32, 1] }}
            className="object-cover h-full absolute w-full left-0 rounded-[16px]"
          />
        </div>

        {/* RIGHT SIDE - TEXT */}
        <div className="flex flex-col gap-6 justify-between w-[100%] md:w-[55%]">
          <div className="flex flex-col gap-3">
            <p className="font-unageo leading-[112%] text-[14px] md:text-[19px] 3xl:text-[24px]">Our Process</p>
            <img src={line} alt="arrow" className="w-[1px] h-[38px]" />
            <p className="font-unageo leading-[112%] text-[14px] md:text-[19px] 3xl:text-[24px]">{`0${index + 1}`}</p>
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
              <p className="font-unageo-bold text-[30px] md:text-[50px] lg:text-[65px] 3xl:text-[72px] leading-[97%] text-[#00688F] capitalize">
                {slides[index].title}
              </p>
              <p className="font-unageo text-[15px] md:text-[25px] mt-[-15px] 3xl:text-[28px]">{slides[index].description}</p>
            </motion.div>
          </AnimatePresence>

          {/* NAVIGATION */}
          <div className="flex gap-4">
            <button onClick={handlePrev} disabled={isAnimating} className="disabled:opacity-50 w-[30px] md:w-[67px] h-[30px] md:h-[67px]">
              <img src={left} alt="left" />
            </button>
            <button onClick={handleNext} disabled={isAnimating} className="disabled:opacity-50 w-[30px] md:w-[67px] h-[30px] md:h-[67px]">
              <img src={right} alt="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
