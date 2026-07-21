import React from "react";
import { motion } from "framer-motion";
import Bannerimage from "../../Components/Banners/Bannerimage";
import banner from "../../assets/portban.webp";
import Header from "../../Components/Header/Header";
import SingleHeading from "../../Components/Headings/Singleheading/SingleHeading";
import Leftheadingtop from "../../Components/Headings/Leftheadingtop/Leftheadingtop";
import Footers from "../../Components/Footers/Footers";
import USPortfoliopagesliderv2 from "../../Components/Sliders/Portfoliopageslider/USPortfoliopagesliderv2";
import MobileFooters from "../../Components/Footers/MobileFooters";
import MobileHeader from "../../Components/Header/MobileHeader";
import bannermob from "../../assets/portfoliomobile.webp";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";
import USPortfolioBanner from "../../assets/HomeSec3/Hospitality.jpg";

export default function USPortfoliopage() {

  return (
    <div>
      <Header />
      <MobileHeader />
      <div className="pt-[30px] pb-[70px]">
        {/* Section with entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 200 }} // start slightly below + hidden
          whileInView={{ opacity: 1, y: 0 }} // animate upward into place
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }} // trigger once when ~30% is in view
        >
          <SingleHeading heading="Landmark Projects" headingcss="text-center" divcss="justify-center" />
          <div className="h-[200px] md:h-auto overflow-hidden [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
            <Bannerimage
              image={USPortfolioBanner}
              mobileimg={USPortfolioBanner}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 200 }} // start slightly below + hidden
          whileInView={{ opacity: 1, y: 0 }} // animate upward into place
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }} // trigger once when ~30% is in view
        >
          <Leftheadingtop
            heading="Defining Skylines and Shaping Spaces"
            subtext={
              <>
                For over three decades, Mariani Metal has been trusted on landmark
                projects across North America and beyond - shaping civic spaces,
                cultural institutions, and architectural icons. Today, our
                operations span a 70,000-square-foot facility equipped with 50-ton
                cranes, robotic welding, CNC machining, and climate-controlled
                bays, all supported by CATIA-driven coordination and full trial
                assemblies.
                <br /> <br />
                From sweeping façades and long-span structures to custom
                staircases and canopies, each component is engineered and
                delivered to perform, built for close scrutiny, long service, and
                the scale of major civic and cultural work.
              </>
            }
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 200 }} // start slightly below + hidden
          whileInView={{ opacity: 1, y: 0 }} // animate upward into place
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }} // trigger once when ~30% is in view
        >
          {/*} <Portfoliopageslider />*/}
          <USPortfoliopagesliderv2 />
        </motion.div>
      </div>
      <ScrollToTop />
      <Footers />
      <MobileFooters />
    </div>
  );
}
