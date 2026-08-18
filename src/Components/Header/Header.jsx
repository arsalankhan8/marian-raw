import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

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

  const location = useLocation();
  const region = getSelectedRegion();

  const homePath = getRegionHomePath();
  const portfolioPath = getRegionPortfolioPath();

  const legacyPath = getRegionPagePath("legacy");
  const csrPath = getRegionPagePath("csr");
  const newsPath = getRegionPagePath("news");
  const contactPath = getRegionPagePath("contact");

  const aboutPath = getRegionPagePath("about");

  // eslint-disable-next-line no-unused-vars -- Kept for restoring the commented Careers link.
  const careersPath =
    getRegionPagePath("careers");

  const awardsPath = getRegionPagePath(
    "awards",
    REGIONS.CANADA,
  );

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

  return (
    <motion.div
      className="bg-transparent sticky hidden md:flex justify-center z-[9999]"
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-[90vw] w-full pt-[10px]">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex justify-start">
            <Link to="/">
              <img
                src={logo}
                alt="Mariani Metal"
                className="h-[86px] lg:h-[100px] lg:w-[110px] 2xl:h-[116px] w-[126px] 3xl:h-[126px] 3xl:w-[136px]"
              />
            </Link>
          </div>

          {/* Main navigation */}
          <div className="group flex justify-center items-center gap-5 xl:gap-8 2xl:gap-10 font-medium border-[1px] py-[16px] px-[20px] xl:px-[26px] border-[#00688F] text-[14px] xl:text-[16px] rounded-[20px] bg-transparent hover:bg-[#00688F] transition-colors duration-300 ease-in-out">
            <Link to={homePath}>
              <span className={isActive(homePath)}>
                Home
              </span>
            </Link>

            {/* About dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Link to={aboutPath}>
                <span
                  className={`flex gap-[4px] items-center ${isActive(
                    aboutPath,
                  )}`}
                >
                  About Us

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen
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
                  >
                    <ul className="py-2">
                      {region === REGIONS.CANADA && (
                        <li>
                          <Link
                            to={awardsPath}
                            className="block px-4 py-2 text-black hover:text-[#00688F] cursor-pointer transition-colors duration-200"
                          >
                            Awards &amp; Recognitions
                          </Link>
                        </li>
                      )}

                      <li>
                        <Link
                          to={csrPath}
                          className="block px-4 py-2 text-black hover:text-[#00688F] cursor-pointer transition-colors duration-200"
                        >
                          CSR &amp; Sustainability
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to={portfolioPath}>
              <span className={isActive(portfolioPath)}>
                Portfolio
              </span>
            </Link>

            <Link to={newsPath}>
              <span className={isActive(newsPath)}>
                News
              </span>
            </Link>

            {/* Temporarily hidden. Uncomment this block to restore Careers.
            <Link to={careersPath}>
              <span className={isActive(careersPath)}>
                Careers
              </span>
            </Link>
            */}

            <Link to={contactPath}>
              <span className={isActive(contactPath)}>
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
              <img src={insta} alt="Instagram" />
            </a>

            <a
              href="https://www.linkedin.com/company/mariani-metal-group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mariani Metal on LinkedIn"
              className="bg-[#00688F] hover:bg-[#848282] transition-colors duration-300 ease-in-out py-2 px-2 rounded-full"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
