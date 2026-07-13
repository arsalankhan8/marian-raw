import React, { useState, useEffect, useRef } from "react";
import locationicon from "../../../assets/mapw.png";
import { Link } from "react-router";

const US_SLIDES = [
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
    img: "/images/portfolio/LeJardin/main-new.jpg",
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

const CANADA_SLIDES = [
  {
    id: "1",
    location: "Toronto, Ontario",
    title: "TD Terrace",
    img: "/images/portfolio/TDTerrace/1.webp",
    link: "/portfoliodetails/td-terrace",
  },
  {
    id: "2",
    location: "York Region, Ontario",
    title: "vivaNext BRT Stations",
    img: "/images/portfolio/VivaNextTransitHub/1.webp",
    link: "/portfoliodetails/viva-next-brt-station",
  },
  {
    id: "3",
    location: "Toronto, Ontario",
    title: "The Well",
    img: "/images/portfolio/TheWell/1.webp",
    link: "/portfoliodetails/the-well",
  },
  {
    id: "4",
    location: "Toronto, Ontario",
    title: "The Luminous Veil",
    img: "/images/portfolio/TheLuminousVeil/TheLuminousVeil.jpg",
    link: "/portfoliodetails/LuminousVeil",
  },
  {
    id: "5",
    location: "Calgary, Alberta",
    title: "The Bow",
    img: "/images/portfolio/TheBow/TheBow.webp",
    link: "/portfoliodetails/the-bow",
  },
  {
    id: "6",
    location: "Toronto, Ontario",
    title: "Garrison Crossing",
    img: "/images/portfolio/GarrisonCrossing/1.webp",
    link: "/portfoliodetails/garrison-crossing",
  },
  {
    id: "7",
    location: "Toronto, Ontario",
    title: "The Spirit Garden",
    img: "/images/portfolio/TheSpiritGarden/1.webp",
    link: "/portfoliodetails/the-spirit-garden",
  },
  {
    id: "8",
    location: "Toronto, Ontario",
    title: "Glen Road Pedestrian Bridge",
    img: "/images/portfolio/GlenRoadPedestrianBridge/1.webp",
    link: "/portfoliodetails/glen-road-pedestrian-bridge",
  },
  {
    id: "9",
    location: "Toronto, Ontario",
    title: "7 Dale Condominium",
    img: "/images/portfolio/dalecondominium/1.webp",
    link: "/portfoliodetails/7-dale-condominium",
  },
  {
    id: "10",
    location: "Toronto, Ontario",
    title: "Art Gallery of Ontario",
    img: "/images/portfolio/ArtGallery/1.jpg",
    link: "/portfoliodetails/art-galary",
  },
  {
    id: "11",
    location: "Toronto, Ontario",
    title: "Rosaline Sharp Pavilion",
    img: "/images/portfolio/RosalieSharp/1.jpg",
    link: "/portfoliodetails/front-facade",
  },
  {
    id: "12",
    location: "Toronto, Ontario",
    title: "University of Toronto",
    img: "/images/portfolio/UniversityToronto/1.jpg",
    link: "/portfoliodetails/landmark-project",
  },
  {
    id: "13",
    location: "Ottawa, Ontario",
    title: "House of Commons Interim Chamber",
    img: "/images/portfolio/WestBlock/5.jpg",
    link: "/portfoliodetails/house-of-commons",
  },
  {
    id: "15",
    location: "Brampton, Ontario",
    title: "Axium Packaging",
    img: "/images/portfolio/AxiumPackaging/1.jpg",
    link: "/portfoliodetails/axium-packaging",
  },
  {
    id: "16",
    location: "St. Catharines, Ontario",
    title: "Welland Canal Fallen Workers Memorial",
    img: "/images/portfolio/WellandCanal/1.webp",
    link: "/portfoliodetails/welland-canal",
  },
  {
    id: "18",
    location: "Toronto, Ontario",
    title: "Garrison Point Staircase",
    img: "/images/portfolio/GarrisonPoint/4.jpg",
    link: "/portfoliodetails/garrison-point",
  },
  {
    id: "19",
    location: "Toronto, Ontario",
    title: "Ten York Condominium",
    img: "/images/portfolio/TenYork/4.jpg",
    link: "/portfoliodetails/ten-york",
  },
  {
    id: "21",
    location: "Toronto, Ontario",
    title: "50 Wellesley Tree",
    img: "/images/portfolio/50Wellesley/1.jpg",
    link: "/portfoliodetails/50-wellesley",
  },
  {
    id: "23",
    location: "Mississauga, Ontario",
    title: "Mississauga Laser Centre",
    img: "/images/portfolio/LaserCentre/1.webp",
    link: "/portfoliodetails/MississaugaLaserCentre",
  },
  {
    id: "24",
    location: "Toronto, Ontario",
    title: "Toronto Pearson Airport Terminal 1",
    img: "/images/portfolio/TorontoAirport/4.webp",
    link: "/portfoliodetails/TorontoPearsonAirport",
  },
];

const interleaveSlides = (usSlides, canadaSlides) => {
  const mergedSlides = [];
  const longestList = Math.max(usSlides.length, canadaSlides.length);

  for (let index = 0; index < longestList; index += 1) {
    if (index < usSlides.length) {
      mergedSlides.push({
        ...usSlides[index],
        id: `us-${usSlides[index].id}`,
        country: "us",
      });
    }

    if (index < canadaSlides.length) {
      mergedSlides.push({
        ...canadaSlides[index],
        id: `canada-${canadaSlides[index].id}`,
        country: "canada",
      });
    }
  }

  return mergedSlides;
};

const MERGED_SLIDES = interleaveSlides(US_SLIDES, CANADA_SLIDES);

export default function Homeslidernew() {
  const slides = MERGED_SLIDES;

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
      (slide) =>
        new Promise((resolve) => {
          const img = new Image();

          img.src = slide.img;

          img.onload = () =>
            resolve({
              src: slide.img,
              status: "ok",
            });

          img.onerror = () =>
            resolve({
              src: slide.img,
              status: "error",
            });

          setTimeout(
            () =>
              resolve({
                src: slide.img,
                status: "timeout",
              }),
            3000
          );
        })
    );

    Promise.all(promises).then(() => {
      if (mounted) {
        setImagesPreloaded(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, [slides]);

  const updateBorderPositions = () => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const containerRect = container.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    const leftX = Math.max(
      0,
      Math.round(contentRect.left - containerRect.left)
    );

    const rightX = Math.max(
      0,
      Math.round(contentRect.right - containerRect.left)
    );

    setBorderLeftPos(leftX);
    setBorderRightPos(rightX);
  };

  const handleMouseMove = (event) => {
    mousePos.current = {
      x: event.clientX,
      y: event.clientY,
    };

    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) {
      setShowLeftArrow(false);
      setShowRightArrow(false);
      return;
    }

    const withinVertical =
      event.clientY >= rect.top && event.clientY <= rect.bottom;

    const withinHorizontal =
      event.clientX >= rect.left && event.clientX <= rect.right;

    const withinSection = withinVertical && withinHorizontal;

    if (!withinSection) {
      setShowLeftArrow(false);
      setShowRightArrow(false);
      return;
    }

    const relativeX = event.clientX - rect.left;

    if (relativeX < rect.width * 0.4) {
      setShowLeftArrow(true);
      setShowRightArrow(false);
    } else if (relativeX > rect.width * 0.6) {
      setShowRightArrow(true);
      setShowLeftArrow(false);
    } else {
      setShowLeftArrow(false);
      setShowRightArrow(false);
    }
  };

  useEffect(() => {
    let animationFrame = null;

    const smoothFollow = () => {
      setMouseX(
        (previous) =>
          previous + (mousePos.current.x - previous) * 0.2
      );

      setMouseY(
        (previous) =>
          previous + (mousePos.current.y - previous) * 0.2
      );

      animationFrame = requestAnimationFrame(smoothFollow);
    };

    animationFrame = requestAnimationFrame(smoothFollow);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    updateBorderPositions();

    const onResize = () => updateBorderPositions();
    const onScroll = () => updateBorderPositions();

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goPrev = () => {
    setCurrentSlide((previous) =>
      previous === 0 ? slides.length - 1 : previous - 1
    );
  };

  const goNext = () => {
    setCurrentSlide((previous) =>
      previous === slides.length - 1 ? 0 : previous + 1
    );
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    updateBorderPositions();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previous) =>
        previous === slides.length - 1 ? 0 : previous + 1
      );
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [slides.length]);

  const currentProject = slides[currentSlide];

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center w-full h-[80vh] bg-cover bg-no-repeat relative overflow-hidden transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: `url(${currentProject.img})`,
      }}
    >
      {/* Hidden images used for browser preloading */}
      <div
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0,
        }}
        aria-hidden="true"
      >
        {slides.map((slide) => (
          <img
            key={slide.id}
            src={slide.img}
            alt=""
            style={{
              width: 0,
              height: 0,
            }}
          />
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
                className="w-[20px] h-[24px] md:w-[20px] md:h-[30px] mt-1.5 sm:mt-0"
              />

              <p className="text-[16px] md:text-[30px] text-center 3xl:text-[36px] leading-[37px] font-unageo">
                {currentProject.location}
              </p>
            </div>

            <p className="text-center text-[25px] md:text-[50px] 2xl:text-[80px] 3xl:text-[100px] text-white uppercase font-unageo-semibold">
              {currentProject.title}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <Link to={currentProject.link}>
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

      {/* Left arrow */}
      {showLeftArrow && (
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
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

      {/* Canada portfolio button */}
      <Link
        to="/C.A.-Portfolio"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 text-white border border-white px-5 md:px-8 py-3 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 font-unageo text-xs md:text-base cursor-pointer whitespace-nowrap"
      >
        View Full Portfolio
      </Link>

      {/* Right arrow */}
      {showRightArrow && (
        <button
          type="button"
          onClick={goNext}
          aria-label="Next project"
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