import React from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";

import MarianiScales from "../../assets/MarianiScales.webp";
import MarianiWritten from "../../assets/MarianiWritten.webp";
import EnteranceBannerVideo from "../../assets/home/RegionVideo.mp4";

import { REGIONS } from "../../constants/regions";

const RegionModal = ({
  onSelect = () => {},
  variant = "dark",
}) => {
  const location = useLocation();

  const isWhite =
    variant === "white" ||
    location.pathname.toLowerCase() === "/white";

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const textClass = isWhite
    ? "text-black"
    : "text-white";

  const logoClass = isWhite
    ? "brightness-0"
    : "brightness-0 invert";

  const videoFilter = isWhite
    ? "brightness(1) grayscale(0.1)"
    : "brightness(0.4) grayscale(0.2)";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed inset-0 z-[9999] flex h-full w-full flex-col items-center justify-between overflow-hidden py-16"
    >
      {/* Background video */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          style={{
            filter: videoFilter,
          }}
        >
          <source
            src={EnteranceBannerVideo}
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* White or dark overlay */}
      <div
        className={`absolute inset-0 z-[1] ${
          isWhite
            ? "bg-white/40"
            : "bg-slate-950/40"
        }`}
      />

      {/* Top text */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 text-center"
      >
        <h3
          className={`relative top-[-45px] text-[12px] tracking-[0.5em] uppercase font-unageo-medium opacity-80 md:text-[16px] ${textClass}`}
        >
          Less Ordinary, More Monumental
        </h3>
      </motion.div>

      {/* Main logo and region options */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-4">
        <div className="relative flex flex-col items-center">
          <motion.img
            variants={logoVariants}
            src={MarianiScales}
            alt="Mariani Metal"
            className={`relative right-5 mb-6 h-20 w-auto object-contain md:right-0 md:h-28 ${logoClass}`}
          />

          {/* Canada */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 1,
              duration: 0.8,
            }}
            className="group absolute -bottom-8 -left-32 md:-left-56"
          >
            <Link
              to={`/${REGIONS.CANADA}`}
              onClick={() =>
                onSelect(REGIONS.CANADA)
              }
              className="block"
            >
              <h2
                className={`whitespace-nowrap text-[12px] tracking-[0.4em] uppercase font-unageo-medium opacity-100 transition-all duration-300 group-hover:opacity-100 md:text-[15px] ${textClass}`}
              >
                Canada
              </h2>
            </Link>
          </motion.div>

          {/* United States */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 1,
              duration: 0.8,
            }}
            className="group absolute -bottom-8 -right-32 md:-right-72"
          >
            <Link
              to={`/${REGIONS.US}`}
              onClick={() =>
                onSelect(REGIONS.US)
              }
              className="block"
            >
              <h2
                className={`whitespace-nowrap text-[12px] tracking-[0.4em] uppercase font-unageo-medium opacity-100 transition-all duration-300 group-hover:opacity-100 md:text-[15px] ${textClass}`}
              >
                United States
              </h2>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom wordmark */}
      <motion.div
        variants={itemVariants}
        className="relative bottom-[-40px] z-10"
      >
        <img
          src={MarianiWritten}
          alt="Mariani Metal"
          className={`h-5 w-auto object-contain md:h-10 ${logoClass}`}
        />
      </motion.div>
    </motion.div>
  );
};

export default RegionModal;