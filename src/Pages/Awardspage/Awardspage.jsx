import React from "react";
import { motion } from "framer-motion";
import Bannerimage from "../../Components/Banners/Bannerimage";
import bannerimg from "../../assets/awardbanner.webp";
import SingleHeading from "../../Components/Headings/Singleheading/SingleHeading";
import Header from "../../Components/Header/Header";
import Awardlist from "../../Components/Legacycomponents/Awardcomponent/Awardlist";
import Industrylist from "../../Components/Legacycomponents/Awardcomponent/Industrylist/Industrylist";
import Professionalsection from "../../Components/Legacycomponents/Awardcomponent/Professionalsection/Professionalsection";
import Footers from "../../Components/Footers/Footers";
import MobileHeader from "../../Components/Header/MobileHeader";
import MobileFooters from "../../Components/Footers/MobileFooters";
import bannermobile from "../../assets/awardmobile.webp";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

export default function Awardspage() {
  return (
    <div>
      <Header />
      <MobileHeader />

      <main id="main-content" tabIndex={-1}>
      <motion.div
        initial={{ opacity: 0, y: 200 }} // start slightly below + hidden
        whileInView={{ opacity: 1, y: 0 }} // animate upward into place
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }} // trigger once when ~30% is in view
        className="pt-[30px] md:pt-[40px] 2xl:pt-[40px] 3xl:pt-[70px]"
      >
        <Bannerimage image={bannerimg} mobileimg={bannermobile} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 200 }} // start slightly below + hidden
        whileInView={{ opacity: 1, y: 0 }} // animate upward into place
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }} // trigger once when ~30% is in view
        className="pt-[40px] md:pt-[0px]"
      >
        <SingleHeading
          as="h1"
          heading="Awards & Recognitions"
          headingcss="text-center mt-[20px]"
          divcss="justify-center"
        />
        <Awardlist />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 200 }} // start slightly below + hidden
        whileInView={{ opacity: 1, y: 0 }} // animate upward into place
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }} // trigger once when ~30% is in view
        className=""
      >
        <Industrylist />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 200 }} // start slightly below + hidden
        whileInView={{ opacity: 1, y: 0 }} // animate upward into place
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }} // trigger once when ~30% is in view
        className="mb-[0px]"
      >
        <Professionalsection />
      </motion.div>
      </main>
      <ScrollToTop/>
      <Footers />
      <MobileFooters />
    </div>
  );
}
