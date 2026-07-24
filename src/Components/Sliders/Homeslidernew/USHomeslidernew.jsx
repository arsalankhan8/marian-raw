import React, { useState, useEffect, useRef } from "react";
import locationicon from "../../../assets/mapw.png";
import { Link } from "react-router";

export default function Homeslidernew() {
  const slides = [
    {
      id: "1",
      location: "New York City, New York",
      title: "Four Seasons Downtown",
      img: "/images/portfolio/FourSeasonsHotel/1.webp",
      link: "/portfoliodetails/four-season",
    },
    {
      id: "2",
      location: "New York City, New York",
      title: "NYU Theatre",
      img: "/images/portfolio/NYUTheatre/NYUTheatre.jpg",
      link: "/portfoliodetails/NYUTheatre",
    },
    {
      id: "3",
      location: "New York City, New York",
      title: "Le Jardin sur Madison",
      img: "/images/portfolio/LeJardin/main-new.jpeg",
      link: "/portfoliodetails/le-jardin",
    },
    {
      id: "4",
      location: "New York City, New York",
      title: "Little Island - Pier 55",
      img: "/images/portfolio/LittleIsland/main.webp",
      link: "/portfoliodetails/little-island",
    },
    {
      id: "5",
      location: "New York City, New York",
      title: "Day's End - Pier 52",
      img: "/images/portfolio/DaysEnd/DaysEnd.webp",
      link: "/portfoliodetails/days-end",
    },
    {
      id: "6",
      location: "Cleveland, Ohio",
      title: "Weatherhead School of Management",
      img: "/images/portfolio/WeatherheadSchool/3.webp",
      link: "/portfoliodetails/WeatherheadSchool",
    },
    {
      id: "7",
      location: "Arlington, Virginia",
      title: "United States Air Force Memorial",
      img: "/images/portfolio/AirForce/main.webp",
      link: "/portfoliodetails/AirForce",
    },
    {
      id: "8",
      location: "New York City, New York",
      title: "The New York Times Building",
      img: "/images/portfolio/NewYorkTimes/5.webp",
      link: "/portfoliodetails/NewYorkTimes",
    },
    {
      id: "9",
      location: "New York City, New York",
      title: "The Elevated Acre",
      img: "/images/portfolio/ElevatedAcre/1.webp",
      link: "/portfoliodetails/ElevatedAcre",
    },
    {
      id: "10",
      location: "New York City, New York",
      title: "Goldman Sachs",
      img: "/images/portfolio/GoldmanSachs/main-new.jpg",
      link: "/portfoliodetails/GoldmanSachs",
    },
    {
      id: "11",
      location: "New York City, New York",
      title: "NYU Gym",
      img: "/images/portfolio/NYUGym/2.webp",
      link: "/portfoliodetails/NYUGym",
    },
  ];

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [borderLeftPos, setBorderLeftPos] = useState(48);
  const [borderRightPos, setBorderRightPos] = useState(
    typeof window !== "undefined" ? window.innerWidth - 48 : 0
  );

  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const promises = slides.map(
      (s) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = s.img;
          img.onload = () => resolve({ src: s.img, status: "ok" });
          img.onerror = () => resolve({ src: s.img, status: "error" });
          setTimeout(() => resolve({ src: s.img, status: "timeout" }), 3000);
        })
    );

    Promise.all(promises).then(() => {
      if (mounted) setImagesPreloaded(true);
    });

    return () => {
      mounted = false;
    };
  }, [slides]);

  const updateBorderPositions = () => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;
    const cRect = container.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    const leftX = Math.max(0, Math.round(contentRect.left - cRect.left));
    const rightX = Math.max(0, Math.round(contentRect.right - cRect.left));

    setBorderLeftPos(leftX);
    setBorderRightPos(rightX);
  };

  const handleMouseMove = (e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      setShowLeftArrow(false);
      setShowRightArrow(false);
      return;
    }

    const withinVertical = e.clientY >= rect.top && e.clientY <= rect.bottom;
    const withinHorizontal = e.clientX >= rect.left && e.clientX <= rect.right;
    const withinSection = withinVertical && withinHorizontal;

    if (!withinSection) {
      setShowLeftArrow(false);
      setShowRightArrow(false);
      return;
    }

    const relX = e.clientX - rect.left;
    if (relX < rect.width * 0.4) {
      setShowLeftArrow(true);
      setShowRightArrow(false);
    } else if (relX > rect.width * 0.6) {
      setShowRightArrow(true);
      setShowLeftArrow(false);
    } else {
      setShowLeftArrow(false);
      setShowRightArrow(false);
    }
  };

  useEffect(() => {
    let raf = null;
    const smoothFollow = () => {
      setMouseX((prev) => prev + (mousePos.current.x - prev) * 0.2);
      setMouseY((prev) => prev + (mousePos.current.y - prev) * 0.2);
      raf = requestAnimationFrame(smoothFollow);
    };
    raf = requestAnimationFrame(smoothFollow);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    updateBorderPositions();
    const onResize = () => updateBorderPositions();
    const onScroll = () => updateBorderPositions();

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    updateBorderPositions();
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ✅ AUTO SLIDE EVERY 7 SECONDS
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center w-full h-[400px] md:h-[100vh] bg-cover bg-no-repeat relative overflow-hidden transition-all duration-700 ease-in-out"
      style={{ backgroundImage: `url(${slides[currentSlide].img})` }}
    >
      {/* HIDDEN IMG FALLBACK */}
      <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none", opacity: 0 }} aria-hidden>
        {slides.map((s) => (
          <img key={s.id} src={s.img} alt="" style={{ width: 0, height: 0 }} />
        ))}
      </div>

      <div className="flex justify-center items-center bg-black/50 w-full h-full transition-all duration-700 ease-in-out">
        <div className="relative w-full flex justify-center">
          <div
            ref={contentRef}
            className="flex flex-col gap-4 w-full items-center justify-center mx-12 h-[30%] transition-all duration-500 ease-in-out"
          >
            <div className="flex justify-center gap-4 text-white">
              <img
                src={locationicon}
                alt="location"
                className="w-[20px] h-[24px] md:w-[20px] md:h-[30px] mt-1.5 sm:mt-0 "
              />
              <p className="text-[16px] md:text-[30px] text-center 3xl:text-[36px] leading-[37px] font-unageo">
                {slides[currentSlide].location}
              </p>
            </div>
            <p className="text-center text-[25px] md:text-[50px] 2xl:text-[80px] 3xl:text-[100px] text-white uppercase font-unageo-semibold">
              {slides[currentSlide].title}
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              <Link to={`${slides[currentSlide].link}`}>
                <p className="font-unageo text-[15px] md:text-[25px] 3xl:text-[36px] bg-transparent border-b-[2px] text-white border-white">
                  explore this project
                </p>
              </Link>
            </div>
          </div>

          {/* Left border */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 bg-white transition-all duration-500 ease-in-out"
            style={{
              left: borderLeftPos,
              width: 1,
              height: showLeftArrow ? "60%" : "30%",
              zIndex: 40,
            }}
          />

          {/* Right border */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 bg-white transition-all duration-500 ease-in-out"
            style={{
              left: borderRightPos,
              width: 1,
              height: showRightArrow ? "60%" : "30%",
              zIndex: 40,
            }}
          />
        </div>
      </div>

      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={goPrev}
          className="fixed text-white cursor-pointer hover:scale-110 transition-transform duration-150 ease-linear"
          style={{
            top: mouseY,
            left: mouseX,
            transform: "translate(-50%, -50%)",
            fontSize: "105px",
            lineHeight: "105px",
            pointerEvents: "auto",
            zIndex: 50,
          }}
        >
          ‹
        </button>
      )}

      {/* View Full Portfolio Button - Bottom Center */}
      <Link
        to="/U.S.-Portfolio"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 text-white border border-white px-5 md:px-8 py-3 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 font-unageo text-xs md:text-base cursor-pointer whitespace-nowrap"
      >
        View Full Portfolio
      </Link>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={goNext}
          className="fixed text-white cursor-pointer hover:scale-110 transition-transform duration-150 ease-linear"
          style={{
            top: mouseY,
            left: mouseX,
            transform: "translate(-50%, -50%)",
            fontSize: "105px",
            lineHeight: "105px",
            pointerEvents: "auto",
            zIndex: 50,
          }}
        >
          ›
        </button>
      )}
    </div>
  );
}
