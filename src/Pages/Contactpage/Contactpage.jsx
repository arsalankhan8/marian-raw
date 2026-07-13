import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

import Header from "../../Components/Header/Header";
import MobileHeader from "../../Components/Header/MobileHeader";
import ContactPageform from "../../Components/Forms/ContactPageform/ContactPageform";
import Footers from "../../Components/Footers/Footers";
import MobileFooters from "../../Components/Footers/MobileFooters";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

import arrowIcon from "../../assets/arrowsmall.png";

import canadaBanner from "../../assets/contactbanners.webp";
import usBanner from "../../assets/UsContactPageBanner.jpg";

import {
  getRegionContact,
  getSelectedRegion,
} from "../../utils/regionPaths";

import { REGIONS } from "../../constants/regions";

export default function Contactpage() {
  const contact = getRegionContact();
  const region = getSelectedRegion();
  const isUS = region === REGIONS.US;

  const selectedBanner = isUS
    ? usBanner
    : canadaBanner;

  const imgRef = useRef(null);
  const blueSectionRef = useRef(null);

  const { scrollYProgress: imgScrollYProgress } =
    useScroll({
      target: imgRef,
      offset: ["start end", "end start"],
    });

  const {
    scrollYProgress: blueSectionScrollYProgress,
  } = useScroll({
    target: blueSectionRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(
    imgScrollYProgress,
    [0, 2],
    [1, 1.5],
  );

  const y = useTransform(
    [
      imgScrollYProgress,
      blueSectionScrollYProgress,
    ],
    ([latestImgProgress, latestBlueProgress]) => {
      if (latestBlueProgress > 0.1) {
        return -300 * 0.6;
      }

      return -300 * latestImgProgress;
    },
  );

  const blueSectionY = useTransform(
    blueSectionScrollYProgress,
    [0, 0.4],
    [0, -1200],
  );

  return (
    <>
      <Header />
      <MobileHeader />

      <div className="max-w-[90vw] w-full mx-auto pt-[30px] md:pt-[40px] 2xl:pt-[40px] 3xl:pt-[70px]">
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          {/* Heading */}
          <div className="flex justify-center md:justify-start w-full md:w-[50%]">
            <p className="font-unageo-bold text-[#00688F] text-[24px] md:text-[32px] lg:text-[38px] xl:text-[44px] 2xl:text-[52px] 3xl:text-[60px] leading-[100%]">
              CONTACT US
            </p>
          </div>

          {/* Contact information */}
          <div className="md:flex justify-between w-full md:w-[50%]">
            {/* Address */}
            <div className="flex items-center md:items-start flex-col">
              <p className="flex items-start gap-2 font-unageo-medium text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] 3xl:text-[26px] capitalize">
                <MapPin className="w-4 h-4 md:w-6 md:h-6 mt-1 md:mt-2 shrink-0" />

                <span>
                  {contact.addressLines.map(
                    (line, index) => (
                      <React.Fragment
                        key={`${line}-${index}`}
                      >
                        {index > 0 && (
                          <br
                            className={
                              contact.addressLines
                                .length === 2 &&
                              index === 1
                                ? "hidden md:block"
                                : undefined
                            }
                          />
                        )}

                        {line}
                      </React.Fragment>
                    ),
                  )}
                </span>
              </p>
            </div>

            {/* Phone and email */}
            <div className="flex flex-col gap-1 justify-between mt-2">
              <a
                href={`tel:${contact.phone.replace(
                  /[^\d+]/g,
                  "",
                )}`}
                className="flex items-center justify-center md:justify-start gap-2 font-unageo-medium text-center md:text-left text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px] 2xl:text-[28px] 3xl:text-[66px] leading-[20px]"
              >
                <Phone className="w-4 h-4 md:w-6 md:h-6 shrink-0" />
                {contact.phone}
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="flex items-center justify-center md:justify-start gap-2 font-unageo-medium text-center md:text-left text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px] 2xl:text-[28px] 3xl:text-[66px] leading-[32px]"
              >
                <Mail className="w-4 h-4 md:w-6 md:h-6 shrink-0" />
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Regional animated banner */}
        <motion.img
          ref={imgRef}
          src={selectedBanner}
          alt={
            isUS
              ? "Mariani Metal US contact"
              : "Mariani Metal Canada contact"
          }
          className="w-full h-screen mt-[90px] md:mt-[120px] mb-[-130px] md:mb-[-200px] object-cover"
          style={{
            scaleX,
            y,
          }}
        />
      </div>

      {/* Contact form section */}
      <motion.div
        ref={blueSectionRef}
        className="bg-[#00688F] pt-[100px] pb-[110px] mb-[-950px] 3xl:mb-[-850px]"
        style={{
          y: blueSectionY,
        }}
      >
        <div className="max-w-[90vw] w-full mx-auto text-white">
          <p className="font-counture text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] uppercase leading-[100%]">
            Speak with Us
          </p>

          <p className="font-unageo-semibold text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px] 2xl:text-[28px] 3xl:text-[66px] capitalize">
            Witness Your Vision Find Form
          </p>

          <ContactPageform />

          <div className="flex flex-col w-full md:w-[80%] mt-[50px]">
            <p className="font-unageo-bold text-white text-center md:text-left text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] leading-[112%] tracking-[-2%]">
              Where vision finds permanence,
              <br />
              Legacy takes shape.
            </p>

            <p className="flex justify-center md:justify-start font-unageo-medium text-[15px] md:text-[22px] 3xl:text-[30px] gap-2 mt-4">
              Get Started

              <img
                src={arrowIcon}
                alt=""
                className="w-[16px] h-[16px] mt-1 md:mt-2.5"
              />
            </p>
          </div>
        </div>
      </motion.div>

      <ScrollToTop />
      <Footers />
      <MobileFooters />
    </>
  );
}