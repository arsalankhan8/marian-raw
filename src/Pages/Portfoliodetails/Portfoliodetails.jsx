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
    <div className="overflow-x-hidden">
      <Header />
      <MobileHeader />

      {/* Portfolio Details */}
      <motion.main
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-[90vw] w-full mx-auto mt-[70px]"
      >
        <SingleHeading
          heading={project.title}
          headingcss="text-left leading-[100%] mb-[20px]"
          divcss="w-[80%]"
        />

        <img
          src={project.mainimage}
          alt={project.title}
          className="block h-[400px] md:h-screen w-full object-cover"
        />

        <div className="relative w-full">
          <Portfoliolisting datas={project} />
        </div>
      </motion.main>

      {/* Related Projects */}
      <section className="relative z-10 bg-white mt-20 md:mt-28 lg:mt-36 pb-20">
        <div className="max-w-[90vw] w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8 md:mb-12">
              <div className="flex items-start gap-3">
                <img
                  src={imground}
                  alt=""
                  className="shrink-0 w-[15px] h-[15px] md:w-[39px] md:h-[39px] mt-2 xl:mt-4"
                />

                <p className="font-counture text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] leading-none">
                  Related Projects
                </p>
              </div>

              <Link
                to={portfolioPath}
                className='font-unageo-medium text-[14px] md:text-[18px] xl:text-[25px] 2xl:text-[28px] 3xl:text-[66px] relative self-start md:self-auto pb-1 after:content-[""] after:absolute after:bg-current after:h-[1px] after:w-[50px] hover:after:w-full after:left-0 after:bottom-0 after:transition-all after:duration-300'
              >
                View more projects
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full overflow-hidden"
          >
            <Portfoliodetailslider datas={relatedProjects} />
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
      <Footers />
      <MobileFooters />
    </div>
  );
}
