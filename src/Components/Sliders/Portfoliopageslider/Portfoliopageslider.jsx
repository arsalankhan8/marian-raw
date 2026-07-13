import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sliderimg1 from "../../../assets/sliderbanner/b1.webp";
import sliderimg2 from "../../../assets/sliderbanner/b2.webp";
import sliderimg3 from "../../../assets/sliderbanner/b3.webp";
import sliderimg4 from "../../../assets/sliderbanner/b4.webp";
import sliderimg5 from "../../../assets/sliderbanner/b5.webp";
import sliderimg6 from "../../../assets/sliderbanner/b6.webp";
import sliderimg7 from "../../../assets/sliderbanner/b7.webp";
import sliderimg8 from "../../../assets/sliderbanner/b8.webp";
import sliderimg9 from "../../../assets/sliderbanner/b9.webp";
import sliderimg10 from "../../../assets/sliderbanner/b10.webp";

import locationicon from "../../../assets/location.png";
import iconround from "../../../assets/iconround.png";

export default function Portfoliopageslider() {
  const slides = [
    { id: 1, image: sliderimg1, location: "New York City, New York", title: "Elevated Acre" },
    { id: 2, image: sliderimg2, location: "New York City, New York", title: "Goldman Sachs" },
    { id: 3, image: sliderimg3, location: "Mississauga, Ontario", title: "Mississauga Laser Centre" },
    { id: 4, image: sliderimg4, location: "New York City, New York", title: "New York Times" },
    { id: 5, image: sliderimg5, location: "Cleveland, Ohio", title: "The Gibson bridge" },
    { id: 6, image: sliderimg6, location: "Cleveland, Ohio", title: "The Spirit Garden" },
    { id: 7, image: sliderimg7, location: "Toronto, Ontario", title: "Toronto Airport" },
    { id: 8, image: sliderimg8, location: "Toronto, Ontario", title: "Toronto Viaduct" },
    { id: 9, image: sliderimg9, location: "Arlington, Virginia", title: "US Air Force Memorial" },
    { id: 10, image: sliderimg10, location: "Cleveland, Ohio", title: "Weatherhead School of Management" },
  ];

  // main visible slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // background (static) index shown underneath while overlay animates
  const [baseIndex, setBaseIndex] = useState(0);

  // index of overlay that is animating (null when none)
  const [animIndex, setAnimIndex] = useState(null);

  // 'up' (incoming slides move up) or 'down' (outgoing slide moves down)
  const [animDirection, setAnimDirection] = useState("up");

  // text keyed shown (so text fades independently)
  const [textIndex, setTextIndex] = useState(0);

  // block controls while animation runs
  const [isAnimating, setIsAnimating] = useState(false);

  const len = slides.length;

  // ✅ Added sliderRef for scroll detection inside slider
  const sliderRef = useRef(null);

  const handleNext = () => {
    if (isAnimating) return;
    const next = (currentIndex + 1) % len;

    // show current as base underneath
    setBaseIndex(currentIndex);

    // prepare overlay to animate in from bottom (next slide)
    setAnimDirection("up");
    setAnimIndex(next);

    // change text early so it fades to new value while overlay animates
    setTextIndex(next);

    setIsAnimating(true);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    const prev = (currentIndex - 1 + len) % len;

    // place previous image immediately as base so it will be revealed
    setBaseIndex(prev);

    // animate outgoing overlay (current) downwards
    setAnimDirection("down");
    setAnimIndex(currentIndex);

    // change text early to fade to previous text while outgoing animates
    setTextIndex(prev);

    setIsAnimating(true);
  };

  // ✅ Fixed scroll prevention with proper event handling
  useEffect(() => {
    const slider = sliderRef.current;

    const handleWheel = (e) => {
      if (!slider) return;
      if (!slider.contains(e.target)) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      if (isAnimating) return;
      
      if (e.deltaY > 0) {
        handleNext();
      } else if (e.deltaY < 0) {
        handlePrev();
      }
    };

    // Use both wheel and mousewheel events for broader browser support
    const options = { passive: false };
    
    slider.addEventListener('wheel', handleWheel, options);
    slider.addEventListener('mousewheel', handleWheel, options);
    
    return () => {
      slider.removeEventListener('wheel', handleWheel);
      slider.removeEventListener('mousewheel', handleWheel);
    };
  }, [isAnimating, currentIndex]);

  // overlay variants
  const overlayVariants = {
    enterFromBottom: { y: "100%", opacity: 1, zIndex: 30 },
    center: { y: "0%", opacity: 1, zIndex: 30 },
    exitDown: { y: "100%", opacity: 1, zIndex: 30 },
  };

  // called after overlay animation finishes
  const onOverlayComplete = () => {
    if (animDirection === "up" && animIndex !== null) {
      setCurrentIndex(animIndex);
      setBaseIndex(animIndex);
    } else if (animDirection === "down" && animIndex !== null) {
      setCurrentIndex(baseIndex);
      setBaseIndex(baseIndex);
    }
    setAnimIndex(null);
    setIsAnimating(false);
  };

  return (
    <div ref={sliderRef} className="relative max-w-[90vw] mx-auto w-full h-screen overflow-hidden mt-[50px]">
      {/* bottom/static layer (always present) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-10"
        style={{ backgroundImage: `url(${slides[baseIndex].image})` }}
      />

      {/* overlay layer (animates when animIndex !== null) */}
      <AnimatePresence>
        {animIndex !== null && (
          <motion.div
            key={`anim-${animIndex}`}
            className="absolute inset-0 w-full h-full bg-cover bg-center z-20"
            style={{ backgroundImage: `url(${slides[animIndex].image})` }}
            variants={overlayVariants}
            initial={animDirection === "up" ? "enterFromBottom" : "center"}
            animate={animDirection === "up" ? "center" : "exitDown"}
            exit={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onAnimationComplete={onOverlayComplete}
          />
        )}
      </AnimatePresence>

      {/* content overlay (dark overlay + UI) */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between h-full py-[20px] px-[20px] bg-black/40 pointer-events-none">
        {/* Top section */}
        <div className="flex justify-between pointer-events-auto">
          <div className="flex gap-3">
            <img src={locationicon} alt="location" className="w-[20px] h-[30px] mt-3" />
            <AnimatePresence mode="wait">
              <motion.p
                key={`loc-${textIndex}`}
                className="text-white font-unageo text-[32px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {slides[textIndex].location}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex pointer-events-auto">
            <img src={iconround} alt="icon" className="mt-3" />
          </div>
        </div>

        {/* Center text */}
        <div className="flex justify-center pointer-events-none">
          <div className="w-[60%] text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={`title-${textIndex}`}
                className="font-unageo-semibold leading-[83px] text-[82px] text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {slides[textIndex].title}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom arrows */}
        <div className="flex flex-col justify-center items-center pointer-events-auto">
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className={`mt-3 h-[56px] w-[56px] ${isAnimating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <img src={iconround} alt="up" className="h-full w-full" />
          </button>

          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className={`mt-3 h-[56px] w-[56px] ${isAnimating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <img src={iconround} alt="down" className="h-full w-full" />
          </button>
        </div>
      </div>
    </div>
  );
}