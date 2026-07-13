import React, { useRef, useState, useEffect } from "react";
import pinIcon from "../../../../assets/pinw.png";
import mapsimg from "../../../../assets/Map2.webp";

export default function Newmap() {
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const hideTimeout = useRef(null);
  const [paddingPct, setPaddingPct] = useState(56.25);
  const [hoveredPin, setHoveredPin] = useState(null);

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

const pins = [
  {
    id: 1,
    name: "Toronto, Ontario",
    title: "The Spirit Garden",
    link: "/portfoliodetails/the-spirit-garden",
    top: "60%",
    left: "58%",
  },
  {
    id: 2,
    name: "Toronto, Ontario",
    title: "Glen Road Pedestrian Bridge",
    link: "/portfoliodetails/glen-road-pedestrian-bridge",
    top: "70%",
    left: "65%",
  },
  {
    id: 3,
    name: "York Region, Ontario",
    title: "vivaNext BRT Stations",
    link: "/portfoliodetails/viva-next-brt-station",
    top: "68%",
    left: "68%",
  },
  {
    id: 4,
    name: "New York City, New York",
    title: "Le Jardin",
    link: "/portfoliodetails/le-jardin",
    top: "90%",
    left: "59%",
  },
  {
    id: 5,
    name: "Toronto, Ontario",
    title: "7 Dale Condominium",
    link: "/portfoliodetails/7-dale-condominium",
    top: "72%",
    left: "67%",
  },
  {
    id: 6,
    name: "Toronto, Ontario",
    title: "Garrison Crossing",
    link: "/portfoliodetails/garrison-crossing",
    top: "73%",
    left: "65%",
  },
  {
    id: 7,
    name: "Toronto, Ontario",
    title: "The Well",
    link: "/portfoliodetails/the-well",
    top: "84%",
    left: "63%",
  },
  {
    id: 8,
    name: "Toronto, Ontario",
    title: "TD Terrace",
    link: "/portfoliodetails/td-terrace",
    top: "87%",
    left: "62%",
  },
];


  const handleMouseEnter = (id) => {
    clearTimeout(hideTimeout.current);
    setHoveredPin(id);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => setHoveredPin(null), 200);
  };

  return (
    <div className="w-full flex justify-center pt-[70px]">
      <div className="relative w-full max-w-[1500px] xl:min-w-[1300px]">
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

          {/* Pins */}
          {pins.map((pin) => (
            <div
              key={pin.id}
              className="absolute flex flex-col items-center"
              style={{
                top: pin.top,
                left: pin.left,
                transform: "translate(-50%, -50%)",
                zIndex: hoveredPin === pin.id ? 50 : 1, // Ensures hovered pin stack is above others
              }}
            >
              {/* Popup (higher z-index than pin & text) */}
              <div
                className={`absolute bg-white text-black shadow-lg rounded-lg p-3 w-[180px] md:w-[220px] text-center transform -translate-x-1/2 transition-all duration-300 ease-in-out ${
                  hoveredPin === pin.id
                    ? "opacity-100 translate-y-0 visible z-[60]"
                    : "opacity-0 -translate-y-3 invisible z-0"
                }`}
                style={{
                  bottom: "120%",
                  left: "50%",
                  pointerEvents: hoveredPin === pin.id ? "auto" : "none",
                }}
                onMouseEnter={() => handleMouseEnter(pin.id)}
                onMouseLeave={handleMouseLeave}
              >
                <p className="text-[14px] md:text-[16px] font-unageo-semibold text-[#333]">
                  {pin.title}
                </p>
                <p className="text-[12px] md:text-[14px] text-[#777] mb-2">
                  {pin.name}
                </p>
                <a
                  href={pin.link}
                  className="inline-block bg-[#00688F] text-white text-[12px] md:text-[14px] px-3 py-1 rounded-md hover:bg-[#005777] transition-all duration-300"
                >
                  View Details
                </a>
              </div>

              {/* Pin icon */}
              <img
                src={pinIcon}
                alt={pin.name}
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-10 lg:w-[28px] lg:h-[37px] cursor-pointer z-[10]"
                onMouseEnter={() => handleMouseEnter(pin.id)}
                onMouseLeave={handleMouseLeave}
              />

              {/* Label 
              <p className="text-[#ADADAD] font-semibold text-[10px] sm:text-sm md:text-[18px] lg:text-[16px] font-unageo-semibold whitespace-nowrap mt-1 z-[10]">
                {pin.name}
              </p>*/}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
