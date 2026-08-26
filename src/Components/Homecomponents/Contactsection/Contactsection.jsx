import React from "react";
import { motion as Motion } from "framer-motion";
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

  const contactContent = (
    <>
      <Centerheading
        heading="Speak with Us"
        subtext="Witness Your Vision Find Form"
        textColor={isUS ? "text-white" : "text-black"}
        headingcss="font-counture text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px]"
        subtextcss="font-unageo-semibold text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px] 2xl:text-[28px] 3xl:text-[66px]"
      />
      <HomePageform isDark={isUS} />
    </>
  );

  return (
    <Motion.section
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
      className="relative mt-[30px] overflow-hidden"
    >
      {isUS ? (
        <div className="relative min-h-[560px] w-full md:min-h-[520px] lg:min-h-[650px] xl:min-h-[700px] 3xl:min-h-[1050px]">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-black/60"
            aria-hidden="true"
          />
          <div className="relative z-[1] pb-8 pt-[clamp(3rem,6vw,7rem)]">
            {contactContent}
          </div>
        </div>
      ) : (
        <>
          <div className="relative z-[1] mb-[-42px] bg-[#EEF3F9] pb-0 pt-[clamp(3rem,6vw,7rem)] lg:mb-[-340px]">
            {contactContent}
          </div>
          <div className="relative w-full">
            <img
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              className="block h-auto w-full"
            />
          </div>
        </>
      )}
    </Motion.section>
  );
}
