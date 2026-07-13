import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Centerheading from "../../Headings/Centerheading/Centerheading";
import HomePageform from "../../Forms/HomePageform/HomePageform";

import canadaContactBanner from "../../../assets/contactbanner4.jpg";
import usContactBanner from "../../../assets/ContactBannerUs.jpg";

export default function Contactsection({
  region = "canada",
}) {
  const isUS = region.toLowerCase() === "us";

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const backgroundImage = isUS
    ? usContactBanner
    : canadaContactBanner;

  const headingColour = isUS
    ? "text-white"
    : "text-black";

  return (
    <motion.section
      ref={ref}
      initial={{
        opacity: 0,
        y: 250,
      }}
      animate={
        inView
          ? {
            opacity: 1,
            y: 0,
          }
          : {
            opacity: 0,
            y: 250,
          }
      }
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
      className={`${isUS ? "py-[70px]" : "min-h-[1400px] pt-[70px]"
        }  bg-no-repeat bg-cover bg-center mt-[30px] relative`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* US-only black overlay */}
      {isUS && (
        <div className="absolute inset-0 bg-black/55 z-[1]" />
      )}

      <div className="relative z-[2]">

        <Centerheading
          heading="Speak with Us"
          subtext="Witness Your Vision Find Form"
          textColor={isUS ? "text-white" : "text-black"}
          headingcss="font-counture text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px]"
          subtextcss="font-unageo-semibold text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px] 2xl:text-[28px] 3xl:text-[66px]"
        />



        <HomePageform isDark={isUS} />
      </div>
    </motion.section>
  );
}