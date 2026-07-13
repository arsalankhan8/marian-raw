import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sliderimg1 from "../../../assets/sliderbanner/b1.webp";
import sliderimg2 from "../../../assets/sliderbanner/b2.webp";
import sliderimg3 from "../../../assets/sliderbanner/b3.webp";
import sliderimg4 from "../../../assets/sliderbanner/b4.webp";
import sliderimg5 from "../../../assets//sliderbanner/b5.webp";
import sliderimg6 from "../../../assets/sliderbanner/b6.webp";
import sliderimg7 from "../../../assets/sliderbanner/b7.webp";
import sliderimg8 from "../../../assets/sliderbanner/b8.webp";
import sliderimg9 from "../../../assets/sliderbanner/b9.webp";
import sliderimg10 from "../../../assets/sliderbanner/b10.webp";

import locationicon from "../../../assets/location.png";

export default function HomeSlider2() {
  const slides = [
    { id: 1, image: sliderimg1, location: "New York City, New York", title: "Elevated Acre", link: "/projects/1" },
    { id: 2, image: sliderimg2, location: "New York City, New York", title: "Goldman Sachs", link: "/projects/2" },
    { id: 3, image: sliderimg3, location: "Mississauga, Ontario", title: "Mississauga Laser Centre", link: "/projects/3" },
    { id: 4, image: sliderimg4, location: "New York City, New York", title: "New York Times", link: "/projects/4" },
    { id: 5, image: sliderimg5, location: "Cleveland, Ohio", title: "The Gibson bridge", link: "/projects/5" },
    { id: 6, image: sliderimg6, location: "Cleveland, Ohio", title: "The Spirit Garden", link: "/projects/6" },
    { id: 7, image: sliderimg7, location: "Toronto, Ontario", title: "Toronto Airport", link: "/projects/7" },
    { id: 8, image: sliderimg8, location: "Toronto, Ontario", title: "Toronto Viaduct", link: "/projects/8" },
    { id: 9, image: sliderimg9, location: "Arlington, Virginia", title: "US Air Force Memorial", link: "/projects/9" },
    { id: 10, image: sliderimg10, location: "Cleveland, Ohio", title: "Weatherhead School of Management", link: "/projects/10" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [baseIndex, setBaseIndex] = useState(0);
  const [direction, setDirection] = useState("forward");
  const thumbnailsRef = useRef(null);

  const goToIndex = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? "forward" : "backward");
    setBaseIndex(activeIndex);
    setActiveIndex(index);
  };

  // Scroll locking effect for thumbnails section only
  useEffect(() => {
    const thumbnailsElement = thumbnailsRef.current;
    
    const handleWheel = (e) => {
      if (!thumbnailsElement) return;
      
      const rect = thumbnailsElement.getBoundingClientRect();
      const isInThumbnails = (
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom
      );
      
      if (isInThumbnails) {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.deltaY > 0) {
          // Scroll down - go to next slide
          goToIndex((activeIndex + 1) % slides.length);
        } else if (e.deltaY < 0) {
          // Scroll up - go to previous slide
          goToIndex((activeIndex - 1 + slides.length) % slides.length);
        }
      }
    };

    // Use passive: false to allow preventDefault
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, slides.length]);

  // calculate visible thumbnails window - show exactly 3 slides initially
  const startIndex = Math.max(0, activeIndex - 2); // Show 2 before active index
  const endIndex = Math.min(slides.length, activeIndex + 1); // Show 1 after active index
  const visibleSlides = slides.slice(startIndex, endIndex + 2); // Add 2 more to get 3 total

  return (
    // === SECTION WRAPPER: slides in from bottom-left when first scrolled into view ===
    <motion.div
      className="w-[99vw] h-[800px] 3xl:h-[1100px] relative overflow-hidden bg-black"
      initial={{ opacity: 0, x: -200, y: 200 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {/* Static base background */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat z-10"
        style={{ backgroundImage: `url(${slides[baseIndex].image})` }}
      />

      {/* Animated background */}
      <AnimatePresence initial={false}>
        {activeIndex !== baseIndex && (
          <motion.div
            key={slides[activeIndex].id}
            className="absolute inset-0 bg-cover bg-no-repeat z-20"
            style={{ backgroundImage: `url(${slides[activeIndex].image})` }}
            initial={direction === "backward" ? { opacity: 0 } : { x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={direction === "backward" ? { x: "100%", opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Text Section */}
      <div className="relative flex justify-center h-[45%] z-30">
        {/* Text block slides in from right on first view (only entrance effect) */}
        <motion.div
          className="flex justify-end flex-col text-white max-w-[90vw] w-full"
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
        >
          <div className="flex gap-3">
            <img src={locationicon} alt="location" />
            <AnimatePresence mode="wait">
              <motion.p
                key={slides[activeIndex].location}
                className="text-[15px] md:text-[17px] mt-1 font-unageo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {slides[activeIndex].location}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex w-[40%]">
            <AnimatePresence mode="wait">
              <motion.p
                key={slides[activeIndex].title}
                className=" text-[30px] md:text-[50px] xl:text-[70px] 3xl:text-[95px] font-bold leading-tight font-unageo-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {slides[activeIndex].title}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-4">
            <a
              href={slides[activeIndex].link}
              className="px-6 py-2 border border-white rounded-full font-unageo-medium text-white font-semibold transition duration-300 text-[16px] hover:bg-white hover:text-black w-fit"
            >
              View Full Project
            </a>
          </div>
        </motion.div>
      </div>

      {/* Thumbnails Section */}
      {/* thumbnails slide in from right to left on first view */}
      <motion.div
        ref={thumbnailsRef}
        className="relative flex items-end justify-end h-[55%] gap-5 z-30 pr-10 pb-6 overflow-hidden"
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.45 }}
      >
        <AnimatePresence initial={false} custom={direction}>
          {visibleSlides.map((slide, index) => {
            const globalIndex = startIndex + index;
            const isActive = globalIndex === activeIndex;

            return (
              <motion.div
                key={slide.id}
                layout
                className="flex flex-col cursor-pointer"
                onClick={() => goToIndex(globalIndex)}
                initial={{
                  x: direction === "forward" ? 100 : -100,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: direction === "forward" ? -100 : 100,
                  opacity: 0,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <motion.img
                  layout
                  src={slide.image}
                  alt={`img${globalIndex + 1}`}
                  className={`object-cover transition-all duration-700 ${
                    isActive ? "w-[300px] h-[380px] 3xl:w-[400px] 3xl:h-[480px]" : "w-[200px] h-[240px] 3xl:w-[250px] 3xl:h-[290px]"
                  }`}
                />
                <p className="text-white pl-6 pt-1.5 font-unageo-medium">
                  {String(globalIndex + 1).padStart(2, "0")}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}