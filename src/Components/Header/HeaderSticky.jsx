import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  Link,
  useLocation,
} from "react-router-dom";

import logo from "../../assets/logo.png";
import insta from "../../assets/insta.png";
import linkedin from "../../assets/linkedin.png";

import {
  getRegionHomePath,
  getRegionPortfolioPath,
  getRegionPagePath,
  getSelectedRegion,
} from "../../utils/regionPaths";

import { REGIONS } from "../../constants/regions";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Controls normal scroll-based header visibility
  const [showHeader, setShowHeader] =
    useState(false);

  // Controls opening the header through the floating Menu button
  const [
    isHeaderManuallyRevealed,
    setIsHeaderManuallyRevealed,
  ] = useState(false);

  const location = useLocation();
  const region = getSelectedRegion();

  const homePath = getRegionHomePath();
  const portfolioPath =
    getRegionPortfolioPath();

  const legacyPath =
    getRegionPagePath("legacy");

  const csrPath =
    getRegionPagePath("csr");

  const newsPath =
    getRegionPagePath("news");

  const contactPath =
    getRegionPagePath("contact");

  const awardsPath = getRegionPagePath(
    "awards",
    REGIONS.CANADA,
  );

  const isHomePage =
    location.pathname.toLowerCase() ===
    homePath.toLowerCase();

  useEffect(() => {
    const handleScroll = () => {
      const hasScrolled =
        window.scrollY > 8;

      if (isHomePage) {
        setShowHeader(hasScrolled);

        // Once scrolling starts, normal sticky-header behaviour takes over
        if (hasScrolled) {
          setIsHeaderManuallyRevealed(false);
        }
      } else {
        setShowHeader(true);
        setIsHeaderManuallyRevealed(false);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, [isHomePage]);

  // Reset menus when changing pages
  useEffect(() => {
    setIsOpen(false);
    setIsHeaderManuallyRevealed(false);
  }, [location.pathname]);

  const headerIsVisible =
    showHeader ||
    isHeaderManuallyRevealed;

const showMenuTrigger =
  isHomePage && !showHeader;

  const isActive = (path) => {
    const base =
      "cursor-pointer transition-colors duration-300";

    const isCurrentPath =
      location.pathname.toLowerCase() ===
      path.toLowerCase();

    if (isCurrentPath) {
      return `${base} text-[#00688F] group-hover:text-white`;
    }

    return `${base} text-[#939598] hover:text-white`;
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: -60,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <>

{/* Simple floating glow navigation icon */}
<AnimatePresence>
  {showMenuTrigger && (
    <motion.button
      type="button"
      aria-label="Reveal navigation"
      aria-controls="desktop-navigation"
      initial={{
        opacity: 0,
        scale: 0.85,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -7, 0],
        boxShadow: [
          "0 0 12px rgba(0, 104, 143, 0.35)",
          "0 0 28px rgba(0, 104, 143, 0.85)",
          "0 0 12px rgba(0, 104, 143, 0.35)",
        ],
      }}
      exit={{
        opacity: 0,
        scale: 0.85,
      }}
      transition={{
        opacity: {
          duration: 0.3,
        },
        scale: {
          duration: 0.3,
        },
        y: {
          duration: 2.6,
          repeat: Infinity,
          ease: "easeInOut",
        },
        boxShadow: {
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.12,
        backgroundColor: "rgba(0, 104, 143, 0.95)",
        borderColor: "rgba(255, 255, 255, 0.95)",
        boxShadow:
          "0 0 22px rgba(0, 104, 143, 1), 0 0 48px rgba(0, 104, 143, 0.75)",
      }}
      whileTap={{
        scale: 0.95,
      }}
      onMouseEnter={() =>
        setIsHeaderManuallyRevealed(true)
      }
      onFocus={() =>
        setIsHeaderManuallyRevealed(true)
      }
      onClick={() =>
        setIsHeaderManuallyRevealed(true)
      }
      className="
        fixed
        bottom-8
        right-8
        z-[10000]
        hidden
        md:flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        border
        border-[#00688F]/80
        bg-black/50
        text-white
        backdrop-blur-md
        focus:outline-none
        focus:ring-2
        focus:ring-[#00688F]
        focus:ring-offset-2
        focus:ring-offset-transparent
      "
    >
      {/* Subtle animated glow ring */}
      <motion.span
        className="
          pointer-events-none
          absolute
          -inset-[6px]
          rounded-full
          border
          border-[#00688F]/60
        "
        animate={{
          opacity: [0.25, 0.75, 0.25],
          scale: [0.96, 1.13, 0.96],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Simple navigation icon */}
      <span className="relative flex w-6 flex-col gap-[5px]">
        <span className="block h-[1.5px] w-6 rounded-full bg-white" />
        <span className="block h-[1.5px] w-4 self-end rounded-full bg-white" />
        <span className="block h-[1.5px] w-6 rounded-full bg-white" />
      </span>
    </motion.button>
  )}
</AnimatePresence>

      {/* Desktop sticky header */}
      <motion.div
        id="desktop-navigation"
        className="bg-white sticky top-0 hidden md:flex justify-center z-[9999]"
        initial={false}
        animate={
          headerIsVisible
            ? "visible"
            : "hidden"
        }
        variants={variants}
        style={{
          pointerEvents: headerIsVisible
            ? "auto"
            : "none",
        }}
      >
        <div className="max-w-[90vw] w-full pt-[10px]">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex justify-start">
              <Link to="/">
                <img
                  src={logo}
                  alt="Mariani Metal"
                  className="h-[86px] w-[96px] lg:h-[100px] lg:w-[110px] 2xl:h-[116px] 2xl:w-[126px] 3xl:h-[126px] 3xl:w-[136px]"
                />
              </Link>
            </div>

            {/* Main navigation */}
            <div className="group flex justify-center items-center gap-12 font-medium border-[1px] py-[16px] px-[26px] border-[#00688F] text-[16px] rounded-[20px] bg-transparent hover:bg-[#00688F] transition-colors duration-300 ease-in-out">
              <Link to={homePath}>
                <span
                  className={isActive(
                    homePath,
                  )}
                >
                  Home
                </span>
              </Link>

              {/* Legacy dropdown */}
              <div
                className="relative"
                onMouseEnter={() =>
                  setIsOpen(true)
                }
                onMouseLeave={() =>
                  setIsOpen(false)
                }
              >
                <Link to={legacyPath}>
                  <span
                    className={`flex gap-[4px] items-center ${isActive(
                      legacyPath,
                    )}`}
                  >
                    Legacy

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </Link>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md z-50"
                      onMouseEnter={() =>
                        setIsOpen(true)
                      }
                      onMouseLeave={() =>
                        setIsOpen(false)
                      }
                    >
                      <ul className="py-2">
                        {region ===
                          REGIONS.CANADA && (
                          <li>
                            <Link
                              to={awardsPath}
                              className="block px-4 py-2 text-black hover:text-[#00688F] cursor-pointer transition-colors duration-200"
                            >
                              Awards &amp;
                              Recognitions
                            </Link>
                          </li>
                        )}

                        <li>
                          <Link
                            to={csrPath}
                            className="block px-4 py-2 text-black hover:text-[#00688F] cursor-pointer transition-colors duration-200"
                          >
                            CSR &amp;
                            Sustainability
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to={portfolioPath}>
                <span
                  className={isActive(
                    portfolioPath,
                  )}
                >
                  Portfolio
                </span>
              </Link>

              <Link to={newsPath}>
                <span
                  className={isActive(
                    newsPath,
                  )}
                >
                  News
                </span>
              </Link>

              <Link to={contactPath}>
                <span
                  className={isActive(
                    contactPath,
                  )}
                >
                  Contact Us
                </span>
              </Link>
            </div>

            {/* Social links */}
            <div className="flex justify-end text-black gap-4">
              <a
                href="https://www.instagram.com/marianimetal?igsh=MWg3Nm9lMjRzNHdqZA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mariani Metal on Instagram"
                className="bg-[#00688F] hover:bg-[#848282] transition-colors duration-300 ease-in-out py-2 px-2 rounded-full"
              >
                <img
                  src={insta}
                  alt="Instagram"
                />
              </a>

              <a
                href="https://www.linkedin.com/company/mariani-metal-group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mariani Metal on LinkedIn"
                className="bg-[#00688F] hover:bg-[#848282] transition-colors duration-300 ease-in-out py-2 px-2 rounded-full"
              >
                <img
                  src={linkedin}
                  alt="LinkedIn"
                />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}