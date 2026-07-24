import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import logo from "../../assets/logo.png";

import {
  getRegionHomePath,
  getRegionPortfolioPath,
  getRegionPagePath,
  getSelectedRegion,
} from "../../utils/regionPaths";

import { REGIONS } from "../../constants/regions";

export default function MobileHeader() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [
    isDropdownOpen,
    setIsDropdownOpen,
  ] = useState(false);

  const [showHeader, setShowHeader] =
    useState(false);

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

  const careersPath =
    getRegionPagePath("careers");

  const awardsPath = getRegionPagePath(
    "awards",
    REGIONS.CANADA,
  );

  const aboutPath = getRegionPagePath("about");

  const isHomePage =
    location.pathname.toLowerCase() ===
    homePath.toLowerCase();

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setShowHeader(window.scrollY > 8);
      } else {
        setShowHeader(true);
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

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((current) => {
      if (current) {
        setIsDropdownOpen(false);
      }

      return !current;
    });
  };

  const showMenuTrigger =
    isHomePage &&
    !showHeader &&
    !isOpen;

  const isActive = (path) => {
    const base =
      "block py-2 text-lg transition-colors duration-300";

    const isCurrentPath =
      location.pathname.toLowerCase() ===
      path.toLowerCase();

    if (isCurrentPath) {
      return `${base} text-[#00688F]`;
    }

    return `${base} text-gray-600 hover:text-[#00688F]`;
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: -60,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Simple floating glow icon */}
      <AnimatePresence>
        {showMenuTrigger && (
          <motion.button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
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
            whileTap={{
              scale: 0.9,
              backgroundColor:
                "rgba(0, 104, 143, 0.95)",
              boxShadow:
                "0 0 24px rgba(0, 104, 143, 1), 0 0 45px rgba(0, 104, 143, 0.75)",
            }}
            onClick={() => setIsOpen(true)}
            className="
              fixed
              bottom-6
              right-5
              z-[10000]
              flex
              md:hidden
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
            {/* Animated glow ring */}
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
                opacity: [
                  0.25,
                  0.75,
                  0.25,
                ],
                scale: [
                  0.96,
                  1.13,
                  0.96,
                ],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Same simple icon as desktop */}
            <span className="relative flex w-6 flex-col gap-[5px]">
              <span className="block h-[1.5px] w-6 rounded-full bg-white" />

              <span className="block h-[1.5px] w-4 self-end rounded-full bg-white" />

              <span className="block h-[1.5px] w-6 rounded-full bg-white" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile header */}
      <motion.div
        id="mobile-navigation"
        className="sticky md:hidden bg-white shadow-md top-0 left-0 w-full z-50"
        initial={false}
        animate={
          showHeader || isOpen
            ? "visible"
            : "hidden"
        }
        variants={variants}
        style={{
          pointerEvents:
            showHeader || isOpen
              ? "auto"
              : "none",
        }}
      >
        {/* Top bar */}
        <div className="flex justify-between items-center px-5 py-4">
          <Link
            to="/"
            onClick={closeMenu}
          >
            <img
              src={logo}
              alt="Mariani Metal"
              className="h-[60px] w-[65px]"
            />
          </Link>

          <button
            type="button"
            aria-label={
              isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isOpen}
            onClick={toggleMenu}
            className="flex flex-col space-y-1.5 p-2"
          >
            <motion.span
              animate={
                isOpen
                  ? {
                    rotate: 45,
                    y: 8,
                  }
                  : {
                    rotate: 0,
                    y: 0,
                  }
              }
              className="block w-6 h-0.5 bg-black"
            />

            <motion.span
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              className="block w-6 h-0.5 bg-black"
            />

            <motion.span
              animate={
                isOpen
                  ? {
                    rotate: -45,
                    y: -8,
                  }
                  : {
                    rotate: 0,
                    y: 0,
                  }
              }
              className="block w-6 h-0.5 bg-black"
            />
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="bg-white px-5 py-4 flex flex-col gap-4 border-t"
            >
              <Link
                to={homePath}
                onClick={closeMenu}
              >
                <span
                  className={isActive(
                    homePath,
                  )}
                >
                  Home
                </span>
              </Link>

              {/* Legacy dropdown */}
              <div>
                <div className="flex items-center justify-between w-full">
                  <Link
                    to={aboutPath}
                    onClick={closeMenu}
                    className="flex-1"
                  >
                    <span
                      className={isActive(
                        aboutPath,
                      )}
                    >
                      About Us
                    </span>
                  </Link>
                  <button
                    type="button"
                    aria-label="Toggle Legacy submenu"
                    aria-expanded={
                      isDropdownOpen
                    }
                    onClick={() =>
                      setIsDropdownOpen(
                        (current) =>
                          !current,
                      )
                    }
                    className="p-3 text-gray-600 hover:text-[#00688F]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen
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
                  </button>
                </div>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="pl-4 flex flex-col gap-2 overflow-hidden"
                    >
                      {region ===
                        REGIONS.CANADA && (
                          <li>
                            <Link
                              to={awardsPath}
                              onClick={closeMenu}
                              className="block py-1 text-gray-600 hover:text-[#00688F]"
                            >
                              Awards &amp;
                              Recognitions
                            </Link>
                          </li>
                        )}

                      <li>
                        <Link
                          to={csrPath}
                          onClick={closeMenu}
                          className="block py-1 text-gray-600 hover:text-[#00688F]"
                        >
                          CSR &amp;
                          Sustainability
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to={portfolioPath}
                onClick={closeMenu}
              >
                <span
                  className={isActive(
                    portfolioPath,
                  )}
                >
                  Portfolio
                </span>
              </Link>

              <Link
                to={newsPath}
                onClick={closeMenu}
              >
                <span
                  className={isActive(
                    newsPath,
                  )}
                >
                  News
                </span>
              </Link>

              <Link
                to={careersPath}
                onClick={closeMenu}
              >
                <span
                  className={isActive(
                    careersPath,
                  )}
                >
                  Careers
                </span>
              </Link>

              <Link
                to={contactPath}
                onClick={closeMenu}
              >
                <span
                  className={isActive(
                    contactPath,
                  )}
                >
                  Contact Us
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}