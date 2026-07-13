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
      "Every decision in the shop exists to protect the integrity of the architectural vision on site.",
  },
  {
    id: 2,
    img: img2,
    title: "Master Complexity:",
    description:
      "Complex geometry, demanding tolerances, unprecedented briefs. These are not obstacles. They are where we begin.",
  },
  {
    id: 3,
    img: img4,
    title: "Universal Excellence:",
    description:
      "Quality is not reserved for the showpiece elements. It runs consistently across every scope, every project, every time.",
  },
];

export default function Legacysliderv3() {
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

  // ✅ Auto slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]); // runs continuously, respects animation flag

  return (
    <div
      ref={sliderRef}
      className="max-w-[90vw] mx-auto w-full p-[30px] rounded-4xl mb-[70px] bg-[#00688F1A] overflow-hidden"
    >
      <div className="flex flex-wrap md:flex-nowrap gap-28">
        {/* LEFT SIDE - IMAGE */}
        <div
          className="flex flex-col items-center justify-center w-[100%] md:w-[45%] relative overflow-hidden h-[400px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[500px]"
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
            <p className="font-unageo leading-[112%] text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">Our Values</p>
            <img src={line} alt="arrow" className="w-[1px] h-[38px]" />
            <p className="font-unageo leading-[112%] text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">{`0${index + 1}`}</p>
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
              <p className="font-unageo-bold text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] leading-[97%] text-[#00688F] capitalize">
                {slides[index].title}
              </p>
              <p className="font-unageo text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px] mt-[-15px] md:pr-6">{slides[index].description}</p>
            </motion.div>
          </AnimatePresence>

          {/* NAVIGATION */}
          <div className="flex gap-4">
            <button onClick={handlePrev} disabled={isAnimating} className="disabled:opacity-50 w-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] xl:w-[50px] 2xl:w-[67px] h-[30px]  xl:h-[50px] 2xl:h-[67px]">
              <img src={left} alt="left" />
            </button>
            <button onClick={handleNext} disabled={isAnimating} className="disabled:opacity-50 w-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] xl:w-[50px] 2xl:w-[67px] h-[30px] xl:h-[50px] 2xl:h-[67px]">
              <img src={right} alt="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
