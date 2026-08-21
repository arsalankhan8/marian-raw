import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Slide1Img from "../../../assets/Static/Slide1Img.webp";
import Slide2Image from "../../../assets/Static/slide2Img.webp";
import Slide3Image from "../../../assets/Static/slide3Img.webp";
import { getRegionPortfolioPath } from "../../../utils/regionPaths";

const StaticCarousel = () => {
  // Slide Data based on your requirements
  const slides = [
    {
      id: 1,
      image: Slide1Img, // Landmark Architecture placeholder
      headline: "Defining Commercial Skylines",
      subText:
        "Architectural metal and glass systems engineered for complex office towers and mixed-use developments.",
      ctaText: "Explore Commercial Work",
      link: getRegionPortfolioPath(),
    },
    {
      id: 2,
      image: Slide2Image, // Infrastructure placeholder
      headline: "Built for Public Impact",
      subText:
        "Durable, code-compliant fabrication supporting transportation hubs, civic landmarks, and infrastructure projects.",
      ctaText: "View Infrastructure Projects",
      link: "/infrastructure",
    },
    {
      id: 3,
      image: Slide3Image, // Craftsmanship placeholder
      headline: "Engineered. Fabricated. Installed.",
      subText:
        "From shop drawings to site execution, we deliver precision-built systems aligned with design intent and field realities.",
      ctaText: "Learn About Our Process",
      link: "/legacy",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation Logic
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[700px] md:h-screen overflow-hidden bg-black font-counture">
      {/* Background Image Layer */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover scale-105 animate-fadeIn"
          />
        </div>
      ))}

      {/* PROP DRILLING: Passing state/data to child components */}
      <SlideContent activeSlide={slides[currentIndex]} />

      <NavigationButtons onNext={nextSlide} onPrev={prevSlide} />

      <ProgressBars
        total={slides.length}
        current={currentIndex}
        setIndex={setCurrentIndex}
      />
    </div>
  );
};

/* --- Sub-Components --- */

const SlideContent = ({ activeSlide }) => {
  return (
    /* Increased z-index to z-30 to stay above the background layer (z-10) */
    <div className="absolute inset-0 z-30 flex flex-col items-start justify-center px-6 md:px-24 text-white">
      <div key={activeSlide.id} className="max-w-4xl space-y-6">
        {/* Headline */}
        <h1 className="text-[30px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] font-counture tracking-tighter uppercase leading-tight animate-fadeUp">
          {activeSlide.headline}
        </h1>

        {/* Sub-text: Removed 'opacity-0' to ensure visibility if animation lags */}
        <p className="text-[18px] lg:text-[19px] 3xl:text-[28px] text-gray-200 max-w-2xl font-unageo-medium leading-[110%] animate-fadeUp [animation-delay:200ms]">
          {activeSlide.subText}
        </p>

        {/* CTA Button: Added 'inline-block' and forced z-index */}
        <div className="pt-4 animate-fadeUp [animation-delay:400ms] relative z-40">
          <a
            href={activeSlide.link}
            className="group inline-flex items-center gap-3 rounded-2xl 
             bg-white/10 backdrop-blur-md 
             border border-white/20 shadow-lg
             text-white px-8 py-4 font-unageo-medium uppercase tracking-widest text-sm 
             transition-all duration-300
             hover:bg-white hover:text-black hover:border-white/40 hover:scale-[1.02]
             active:scale-95"
          >
            {activeSlide.ctaText}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

const NavigationButtons = ({ onNext, onPrev }) => {
  const btnClass =
    "group p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm";

  return (
    <div className="absolute bottom-10 right-6 md:right-24 z-30 flex gap-4">
      <button onClick={onPrev} className={btnClass} aria-label="Previous Slide">
        <ChevronLeft className="w-6 h-6 transition-transform group-active:scale-90" />
      </button>
      <button onClick={onNext} className={btnClass} aria-label="Next Slide">
        <ChevronRight className="w-6 h-6 transition-transform group-active:scale-90" />
      </button>
    </div>
  );
};

const ProgressBars = ({ total, current, setIndex }) => {
  return (
    <div className="absolute bottom-14 left-6 md:left-24 z-30 flex gap-3 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className="group py-4 focus:outline-none"
        >
          <div
            className={`h-[3px] transition-all duration-500 ease-in-out ${
              i === current
                ? "w-16 bg-white"
                : "w-8 bg-white/30 group-hover:bg-white/60"
            }`}
          />
        </button>
      ))}
      <span className="text-white/50 text-xs font-mono ml-4 tracking-widest">
        0{current + 1} / 0{total}
      </span>
    </div>
  );
};

export default StaticCarousel;
