import React from "react";
import { motion } from "framer-motion";

import SingleHeading from "../../Components/Headings/Singleheading/SingleHeading";
import Bannerimage from "../../Components/Banners/Bannerimage";
import Header from "../../Components/Header/Header";
import MobileHeader from "../../Components/Header/MobileHeader";

import Educationtab from "../../Components/Legacycomponents/Csrcomponent/Educationtab/Educationtab";
import Communitytab from "../../Components/Legacycomponents/Csrcomponent/Communitytab/Communitytab";

import Footers from "../../Components/Footers/Footers";
import MobileFooters from "../../Components/Footers/MobileFooters";
import Leftheadingtop from "../../Components/Headings/Leftheadingtop/Leftheadingtop";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

import banner from "../../assets/csrnew.webp";
import banner2 from "../../assets/UsCsrLastSectionImg.jpg";
import bannermobile from "../../assets/csrmobile.webp";

export default function Csrpage({ region = "canada" }) {
  const isUS = region.toLowerCase() === "us";

  return (
    <div>
      <Header />
      <MobileHeader />

      <div className="max-w-[90vw] w-full mx-auto">
        {/* Page heading and banner */}
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="pt-[30px] md:pt-[40px] 2xl:pt-[40px] 3xl:pt-[70px]"
        >
          <SingleHeading
            heading="CSR & Sustainability"
            headingcss="text-center md:text-right"
            divcss="justify-center"
          />

          <Bannerimage
            image={banner}
            mobileimg={bannermobile}
          />
        </motion.div>

        {/* Introductory content */}
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <Leftheadingtop
            heading="Investing in People, Communities, and Responsible Practice"
            subtext={
              <>
                At Mariani, responsibility is inseparable from craft. The same
                care that ensures the integrity of our structures also guides
                how we invest in people, support communities, and embed
                sustainability into our way of working.
              </>
            }
          />
        </motion.div>

        {/* Education section */}
        <div className="flex justify-center gap-2 md:justify-start pt-[60px] pb-[20px]">
          <span className="font-unageo-bold text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F]">
            Education &amp;
          </span>

          <span className="font-unageo-bold text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F]">
            Scholarship
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <Educationtab
            showOnlyUsmcaEducation={isUS}
          />
        </motion.div>

        {/* Canada-only Community Engagement */}
        {!isUS && (
          <>
            <div className="flex justify-center md:justify-start pt-[60px] pb-[20px]">
              <span className="font-unageo-bold text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F]">
                Community Engagement
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <Communitytab />
            </motion.div>
          </>
        )}
      </div>

      {/* Bottom CSR banner */}
      <div className="relative">
        <motion.div
          className="overflow-hidden absolute bottom-0 left-0 right-0"
          initial={{ height: 0 }}
          whileInView={{ height: 720 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 1 }}
        >
          <div
            className="bg-cover bg-center w-full h-[620px]"
            style={{
              backgroundImage: `url(${banner2})`,
            }}
          >
            <div className="flex justify-center flex-col flex-wrap items-center h-full bg-black/50 text-white">
              <p className="text-[25px] md:text-[55px] leading-[119%] font-unageo 3xl:text-[66px] mb-3">
                CSR &amp; <b>Sustainability</b>
              </p>

              <p className="font-unageo text-[14px] md:text-[22px] w-[65%] capitalize leading-[127%] text-center 3xl:text-[32px]">
                We design with integrity and build for longevity.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="h-[800px]" />
      </div>

      <ScrollToTop />
      <Footers />
      <MobileFooters />
    </div>
  );
}