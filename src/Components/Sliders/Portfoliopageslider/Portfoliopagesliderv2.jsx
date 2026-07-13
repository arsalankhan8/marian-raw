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
import box from "../../../assets/box.png";
import down from "../../../assets/arrdown.png";
import iconlines from "../../../assets/lineicon.png";

import locationicon from "../../../assets/location.png";
import iconround from "../../../assets/iconround.png";
import { Link, useNavigate } from "react-router";

export default function Portfoliopagesliderv2() {
  const slides = [
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
    // {
    //   id: "14",
    //   location: "Ottawa, Ontario",
    //   title: "Centre Block Rehabilitation",
    //   img: "",
    //   link: "/portfoliodetails/centre-block-rehabilitation",
    // },
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
    // {
    //   id: "17",
    //   location: "Hamilton, Ontario",
    //   title: "Peter George Centre for Living and Learning",
    //   img: "",
    //   link: "/portfoliodetails/peter-george-centre",
    // },
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
    // {
    //   id: "20",
    //   location: "Toronto, Ontario",
    //   title: "UofT OISE - 5th Floor Renovation",
    //   img: "",
    //   link: "/portfoliodetails/uoft-oise",
    // },
    {
      id: "21",
      location: "Toronto, Ontario",
      title: "50 Wellesley Tree",
      img: "/images/portfolio/50Wellesley/1.jpg",
      link: "/portfoliodetails/50-wellesley",
    },
    // {
    //   id: "22",
    //   location: "Toronto, Ontario",
    //   title: "OpenROM Facade and Entrance",
    //   img: "",
    //   link: "/portfoliodetails/royal-ontario-museum",
    // },
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

  // page navigation state
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

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

    slider.addEventListener("wheel", handleWheel, options);
    slider.addEventListener("mousewheel", handleWheel, options);

    return () => {
      slider.removeEventListener("wheel", handleWheel);
      slider.removeEventListener("mousewheel", handleWheel);
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
    <div
      ref={sliderRef}
      className="relative max-w-[90vw] mx-auto w-full h-screen overflow-hidden  mt-[50px]"
    >
      <motion.div
        animate={{
          filter: isNavigating ? "blur(10px)" : "blur(0px)",
          opacity: isNavigating ? 0 : 1,
        }}
        transition={{ duration: 1.0 }}
        className="w-full h-full relative"
      >
        {/* bottom/static layer (always present) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-10"
          style={{ backgroundImage: `url(${slides[baseIndex].img})` }}
        />

        {/* overlay layer (animates when animIndex !== null) */}
        <AnimatePresence>
          {animIndex !== null && (
            <motion.div
              key={`anim-${animIndex}`}
              className="absolute inset-0 w-full h-full bg-cover bg-center z-20"
              style={{ backgroundImage: `url(${slides[animIndex].img})` }}
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
        <div
          id="portfolio"
          className="absolute inset-0 z-30 flex flex-col justify-between h-full py-[60px] px-[20px] bg-black/40 pointer-events-none"
        >
          {/* Top section */}
          <div className="flex justify-center pointer-events-auto">
            <div className="flex gap-6 bg-white py-2 px-5 rounded-4xl">
              <div className="flex gap-3">
                <img
                  src={box}
                  alt="location"
                  className=" w-[16px] h-[16px] mt-1 md:mt-[5px] xl:mt-[7px]"
                />

                <p className="text-black font-unageo text-[15px] md:text-[18px] xl:text-[20px] capitalize">
                  highlights
                </p>
              </div>
              <div
                className="flex gap-3 cursor-pointer"
                onClick={() => {
                  setIsNavigating(true);
                  setTimeout(() => {
                    navigate("/reference");
                  }, 1000);
                }}
              >
                <div className="flex gap-3">
                  <img
                    src={iconlines}
                    alt="location"
                    className=" w-[15px] h-[15px] mt-1 md:mt-[5px] xl:mt-[7px]"
                  />

                  <p className="text-[#C2C2C3] font-unageo text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] capitalize">
                    {" "}
                    reference list
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Center text */}

          <div className="flex justify-center pointer-events-none">
            <div className="w-[60%] text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`title-${textIndex}`}
                  className="font-unageo-semibold flex gap-4 flex-col md:leading-[83px] text-[25px] md:text-[50px] xl:text-[72px] 2xl:text-[82px] text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex justify-center gap-3">
                    <img
                      src={locationicon}
                      alt="location"
                      className="w-[16px] h-[26px] md:w-[20px] md:h-[30px] md:mt-[26px]"
                    />
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`loc-${textIndex}`}
                        className="text-white font-unageo text-[18px] md:text-[26px] xl:text-[32px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {slides[textIndex].location}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {slides[textIndex].title}
                </motion.p>
              </AnimatePresence>
              <div className="flex flex-col justify-center items-center pointer-events-auto">
                <Link to={slides[textIndex].link}>
                  {" "}
                  <button
                    onClick={handleNext}
                    disabled={isAnimating}
                    className={`mt-3 h-[56px] w-[56px] ${isAnimating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <img
                      src={iconround}
                      alt="up"
                      className="h-full w-full mt-3"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom arrows */}
          <div className="flex flex-col justify-center items-center pointer-events-auto">
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className={`mt-3 h-[56px] w-[56px] ${isAnimating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <img src={down} alt="up" className="w-[20px] h-[40px] ml-5" />
            </button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-white"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
