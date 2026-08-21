
import React from "react";
import { motion } from "framer-motion";

import Header from "../../Components/Header/Header";
import MobileHeader from "../../Components/Header/MobileHeader";
import Leftheadingright from "../../Components/Headings/Leftheadingtop/Leftheadingright";
import Bannerimage from "../../Components/Banners/Bannerimage";
import Newssection from "../../Components/NewsComponent/Newssection/Newssection";
import Footers from "../../Components/Footers/Footers";
import MobileFooters from "../../Components/Footers/MobileFooters";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

import canadaBanner from "../../assets/newsbanner.webp";
import usBanner from "../../assets/UsNewsPageBanner.jpeg";
import mobileBanner from "../../assets/newsmobile.webp";

export default function Newspage({ region = "canada" }) {
  const isUS = region.toLowerCase() === "us";

  const desktopBanner = isUS
    ? usBanner
    : canadaBanner;

  return (
    <div>
      <Header />
      <MobileHeader />

      <main id="main-content" tabIndex={-1}>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        className="pt-[30px] md:pt-[40px] 2xl:pt-[40px] 3xl:pt-[70px]"
      >
        <Leftheadingright
          as="h1"
          heading="News & Insights"
          subtext={
            <>
              Updates, insights, and perspectives on delivering complex
              installations &amp; facades with precision. A look at Mariani
              Metal’s work beyond architecture &amp; design.
            </>
          }
        />

        <Bannerimage
          image={desktopBanner}
          mobileimg={mobileBanner}
        />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        className="mb-[70px]"
      >
        <div className="max-w-[90vw] w-full mx-auto mb-[50px] mt-[70px]">
          <h2 className="font-unageo-bold text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] md:leading-[57px] capitalize text-[#00688F]">
            Featured Articles
          </h2>
        </div>

        <Newssection />
      </motion.section>
      </main>

      <ScrollToTop />
      <Footers />
      <MobileFooters />
    </div>
  );
}
