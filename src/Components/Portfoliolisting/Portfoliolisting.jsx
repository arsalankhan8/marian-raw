import React, { useEffect, useState } from "react";
import Portfolioheading from "../Headings/Portfolioheading/Portfolioheading";
import { AnimatePresence, motion } from "framer-motion";

export default function Portfoliolisting({ datas }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const images = datas?.images || [];
  const totalSlides = images.length;

  // Reset slider whenever a different project is opened
  useEffect(() => {
    setCurrentSlide(0);
  }, [datas?.slug]);

  const handleNext = () => {
    if (totalSlides <= 1) return;

    setDirection(1);
    setCurrentSlide((previousSlide) =>
      previousSlide === totalSlides - 1 ? 0 : previousSlide + 1
    );
  };

  const handlePrevious = () => {
    if (totalSlides <= 1) return;

    setDirection(-1);
    setCurrentSlide((previousSlide) =>
      previousSlide === 0 ? totalSlides - 1 : previousSlide - 1
    );
  };

  const slideVariants = {
    enter: (slideDirection) => ({
      x: slideDirection > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (slideDirection) => ({
      x: slideDirection > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="pt-[20px]">
      <div className="flex flex-wrap md:flex-nowrap gap-8 lg:gap-12 pt-[30px] border-t border-black/30 mt-[30px]">
        {/* Left Column */}
        <div className="flex flex-col gap-5 3xl:gap-10 w-full md:w-[40%] md:sticky md:top-[100px] self-start h-fit">
          <Portfolioheading
            heading="Location"
            subtext={datas.location}
          />

          <Portfolioheading
            heading="Architect"
            subtext={datas.architect}
          />

          <Portfolioheading
            heading="Contractor"
            subtext={datas.contractor}
          />

          <p className="font-unageo-medium text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px] leading-[130%] whitespace-pre-line">
            {datas.description}
          </p>
        </div>

        {/* Right Column Slider */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="w-full md:w-[60%] md:border-l md:border-black/30 md:pl-[30px]"
        >
          {totalSlides > 0 ? (
            <div className="relative">
              {/* Slider */}
              <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] 2xl:h-[600px] 3xl:h-[600px] overflow-hidden bg-[#f3f3f3]">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <motion.img
                    key={`${datas.slug}-${currentSlide}`}
                    src={images[currentSlide]}
                    alt={`${datas.title} project image ${currentSlide + 1}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: {
                        type: "spring",
                        stiffness: 250,
                        damping: 30,
                      },
                      opacity: {
                        duration: 0.25,
                      },
                    }}
                    className="absolute inset-0 block w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Previous Arrow */}
                {totalSlides > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    aria-label="View previous project image"
                    className="absolute z-20 left-3 md:left-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 text-black shadow-md cursor-pointer transition-all duration-300 hover:bg-white hover:scale-105"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 md:w-7 md:h-7"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}

                {/* Next Arrow */}
                {totalSlides > 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="View next project image"
                    className="absolute z-20 right-3 md:right-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 text-black shadow-md cursor-pointer transition-all duration-300 hover:bg-white hover:scale-105"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 md:w-7 md:h-7"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 6L15 12L9 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}

                {/* Image Counter */}
                {totalSlides > 1 && (
                  <div className="absolute z-20 right-3 md:right-5 bottom-3 md:bottom-5 px-3 py-2 bg-black/65 text-white font-unageo-medium text-[12px] md:text-[14px]">
                    {String(currentSlide + 1).padStart(2, "0")} /{" "}
                    {String(totalSlides).padStart(2, "0")}
                  </div>
                )}
              </div>

              {/* Navigation Dots */}
              {totalSlides > 1 && (
                <div className="flex items-center justify-center gap-2 mt-5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setDirection(index > currentSlide ? 1 : -1);
                        setCurrentSlide(index);
                      }}
                      aria-label={`View image ${index + 1}`}
                      className={`h-[3px] transition-all duration-300 ${currentSlide === index
                          ? "w-8 bg-black"
                          : "w-4 bg-black/25 hover:bg-black/50"
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-[350px] md:h-[500px] bg-[#f3f3f3]">
              <p className="font-unageo-medium text-sm text-black/60">
                No project images available
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}