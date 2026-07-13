import React from "react";
import portfoliodata from "../../data/portfoliodata.json";
import Header from "../../Components/Header/Header";
import SingleHeading from "../../Components/Headings/Singleheading/SingleHeading";
import Portfoliolisting from "../../Components/Portfoliolisting/Portfoliolisting";
import Footers from "../../Components/Footers/Footers";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import imground from "../../assets/round.png";
import Portfoliodetailslider from "../../Components/Sliders/Portfoliodetailslider/Portfoliodetailslider";
import MobileHeader from "../../Components/Header/MobileHeader";
import MobileFooters from "../../Components/Footers/MobileFooters";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";
import { getRegionPortfolioPath } from "../../utils/regionPaths";
import { filterPortfolioByRegion } from "../../utils/portfolioRegions";

export default function Portfoliodetails() {
  const { slug } = useParams();
  const portfolioPath = getRegionPortfolioPath();
  const relatedProjects = filterPortfolioByRegion(portfoliodata).filter(
    (item) => item.slug !== slug
  );

  // Find project based on slug
  const project = portfoliodata.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div>
        <Header />
        <MobileHeader />
        <div className="max-w-[90vw] w-full mx-auto py-20 text-center">
          <h2 className="text-2xl font-bold">Project not found</h2>
        </div>
        <Footers />
        <MobileFooters />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <MobileHeader />
      <motion.div
        initial={{ opacity: 0, y: 200 }} // start slightly below + hidden
        whileInView={{ opacity: 1, y: 0 }} // animate upward into place
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }} // trigger once when ~30% is in view
        className="max-w-[90vw] w-full mx-auto mt-[70px]"
      >
        <SingleHeading
          heading={project.title}
          headingcss="text-left leading-[100%] mb-[20px]"
          divcss="w-[80%]"
        />
        <img
          src={project.mainimage}
          alt={project.title}
          className="h-[400px] md:h-screen w-full"
        />
        <Portfoliolisting datas={project} />
      </motion.div>

      {/* Pass only the selected project forward */}
      <motion.div
        initial={{ opacity: 0, y: 200 }} // start slightly below + hidden
        whileInView={{ opacity: 1, y: 0 }} // animate upward into place
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }} // trigger once when ~30% is in view
        className="max-w-[90vw] w-full mx-auto mt-[70px] "
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-[30px]">
          <div className="flex justify-center md:justify-start gap-3">
            <img
              src={imground}
              alt="round"
              className="w-[15px] h-[15px] md:w-[39px] md:h-[39px] mt-2 xl:mt-4"
            />
            <p className="font-counture text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px]">
              Related Projects
            </p>
          </div>
          <Link
            to={portfolioPath}
            className='font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] relative pb-1 after:content-[""] after:absolute after:bg-current after:h-[1px] after:w-[50px] hover:after:w-full after:left-0 after:bottom-0 after:transition-all after:duration-300 mt-2 md:mt-0'
          >
            View more projects
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 200 }} // start off-screen to the right
        whileInView={{ opacity: 1, x: 0 }} // slide in from right
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }} // triggers once when 30% of section is in view
        className="max-w-[90vw] w-full mx-auto"
      >
        <Portfoliodetailslider datas={relatedProjects} />
      </motion.div>

      <ScrollToTop />
      <Footers />
      <MobileFooters />
    </div>
  );
}
