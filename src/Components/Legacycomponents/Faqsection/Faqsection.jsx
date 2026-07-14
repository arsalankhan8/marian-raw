import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import faqimg from "../../../assets/faqlegacy.webp";
import arrowr from "../../../assets/arrowr.png";

export default function Faqsection() {
  const awards = [
    {
      id: 1,
      heading:
        "Ontario Steel Design Award of Excellence – Projects Outside Ontario (2007)",
      subtext:
        "Canadian Institute of Steel Construction recognition for the United States Air Force Memorial in Virginia, honouring craftsmanship on an international scale.",
    },
    {
      id: 2,
      heading:
        "Ontario Steel Design Award of Excellence – Bridge Category (2019)",
      subtext:
        "Awarded by CISC for Toronto's Garrison Crossing, highlighting advanced fabrication of landmark duplex stainless steel bridges.",
    },
    {
      id: 3,
      heading: "Canadian Consulting Engineering Award of Excellence (2020)",
      subtext:
        "National recognition from ACEC-Canada for Garrison Crossing, celebrated for engineering innovation and fabrication excellence.",
    },
    {
      id: 4,
      heading: "Top 10 Fabrication Services Providers in Canada (2024)",
      subtext:
        "Named by Manufacturing Technology Insights as one of the country's leading firms in advanced architectural steel fabrication.",
    },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  return (
<section
  ref={ref}
  className="
    mx-auto mt-12 grid w-full max-w-[90vw]
    grid-cols-1 gap-10
    lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]
    lg:gap-14
  "
>
  {/* Left Image */}
  <motion.div
    className="
      relative h-[480px] min-w-0 overflow-hidden
      rounded-[30px]
      md:h-[620px]
      lg:h-[700px]
      2xl:h-[760px]
    "
    initial={{
      clipPath: "inset(0 100% 0 0)",
    }}
    animate={
      inView
        ? {
            clipPath: "inset(0 0% 0 0)",
          }
        : {}
    }
    transition={{
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    <motion.img
      src={faqimg}
      alt="Mariani architectural fabrication project"
      draggable={false}
      className="h-full w-full object-cover"
      initial={{
        scale: 1.06,
        objectPosition: "0% 50%",
      }}
      animate={
        inView
          ? {
              scale: 1,
              objectPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }
          : {}
      }
      transition={{
        scale: {
          duration: 1.6,
          ease: "easeOut",
        },
        objectPosition: {
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        },
      }}
    />
  </motion.div>

  {/* Right Content */}
  <motion.div
    variants={contentVariants}
    initial="hidden"
    animate={inView ? "visible" : "hidden"}
    className="flex min-w-0 flex-col justify-center pb-4 lg:py-10"
  >
    <motion.h2
      variants={itemVariants}
      className="
        max-w-full whitespace-normal break-words
        font-counture text-center
        text-[38px] uppercase leading-[0.95]
        text-[#00688F]
        sm:text-[46px]
        md:text-left md:text-[52px]
        lg:text-[54px]
        xl:text-[64px]
        2xl:text-[72px]
      "
    >
      Awards &amp; Recognitions
    </motion.h2>

    <div className="mt-8 flex min-w-0 flex-col lg:mt-10">
      {awards.map((award, index) => (
        <motion.article
          key={award.id}
          variants={itemVariants}
          className={`
            grid min-w-0
            grid-cols-[40px_minmax(0,1fr)]
            gap-4 py-5
            sm:grid-cols-[44px_minmax(0,1fr)]
            sm:gap-5
            lg:py-6
            ${
              index !== awards.length - 1
                ? "border-b border-black/15"
                : ""
            }
          `}
        >
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-[#00688F]
              font-unageo-medium text-[18px] text-white
              sm:h-11 sm:w-11 sm:text-[20px]
            "
          >
            {award.id}
          </div>

          <div className="min-w-0 max-w-full">
            <h3
              className="
                max-w-full whitespace-normal break-words
                [overflow-wrap:anywhere]
                font-unageo-medium
                text-[18px] leading-[1.3] text-black
                sm:text-[20px]
                lg:text-[21px]
                xl:text-[23px]
              "
            >
              {award.heading}
            </h3>

            <p
              className="
                mt-2 max-w-full whitespace-normal break-words
                [overflow-wrap:anywhere]
                font-unageo-regular
                text-[15px] leading-[1.5] text-black/80
                sm:text-[16px]
                lg:text-[17px]
                xl:text-[18px]
              "
            >
              {award.subtext}
            </p>
          </div>
        </motion.article>
      ))}
    </div>

    <motion.div
      variants={itemVariants}
      className="mt-8 flex justify-center md:justify-start"
    >
      <Link
        to="/awards"
        className="
          group inline-flex min-h-[54px]
          items-center justify-center gap-5
          rounded-[14px] bg-[#00688F]
          px-5 font-unageo-medium
          text-[18px] text-white
          transition-colors duration-300
          hover:bg-[#939598]
          sm:px-6 sm:text-[20px]
        "
      >
        View All Awards

        <img
          src={arrowr}
          alt=""
          aria-hidden="true"
          className="
            h-auto w-[21px]
            transition-transform duration-300
            group-hover:translate-x-1
          "
        />
      </Link>
    </motion.div>
  </motion.div>
</section>
  );
}