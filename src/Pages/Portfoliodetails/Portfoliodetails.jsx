import React, { useEffect } from "react";
import portfoliodata from "../../data/portfoliodata.json";
import Header from "../../Components/Header/Header";
import SingleHeading from "../../Components/Headings/Singleheading/SingleHeading";
import Portfoliolisting from "../../Components/Portfoliolisting/Portfoliolisting";
import Footers from "../../Components/Footers/Footers";
import { useParams, Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const currentRegion = location.pathname
    .toLowerCase()
    .startsWith("/us")
    ? "us"
    : "canada";

  const portfolioPath = getRegionPortfolioPath();

const relatedProjects = portfoliodata.filter(
  (item) => item.slug !== slug
);

  const project = portfoliodata.find((item) => item.slug === slug);

  useEffect(() => {
    const regionName = currentRegion === "us" ? "United States" : "Canada";
    document.title = project
      ? `${project.title} | Mariani Metal ${regionName}`
      : "Project Not Found | Mariani Metal";
  }, [currentRegion, project]);

  if (!project) {
    return (
      <div>
        <Header />
        <MobileHeader />

        <main id="main-content" tabIndex={-1} className="max-w-[90vw] w-full mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold">Project not found</h1>
        </main>

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
        id="main-content"
        tabIndex={-1}
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-[90vw] w-full mx-auto mt-[70px]"
      >
        <SingleHeading
          as="h1"
          heading={project.title}
          headingcss="text-left leading-[100%] mb-[20px]"
          divcss="w-[80%]"
        />

        <div className="relative w-full overflow-hidden rounded-[16px] bg-[#111719]">
          {/* Blurred background fills unused space */}
          <img
            src={project.mainimage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
          />

          <div className="relative flex h-[300px] items-center justify-center sm:h-[400px] md:h-[500px] lg:h-[580px] xl:h-[620px]">
            <img
              src={project.mainimage}
              alt={project.title}
              className="block h-full w-full object-cover"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-black/5" />
        </div>

        <div className="relative w-full">
          <Portfoliolisting datas={project} />
        </div>
      </motion.main>

      {/* Related Projects */}

      <section className="relative z-10 bg-white mt-16 md:mt-24 lg:mt-28 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="border-t border-[#D9DEE0] pt-7 md:pt-10"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex items-start gap-3 md:gap-4">


                <div>
                  <span className="mb-2 block font-unageo text-[11px] font-medium uppercase tracking-[0.2em] text-[#00688F] md:text-[12px]">
                    Explore More
                  </span>

                  <h2 className="font-counture text-[34px] leading-[1.05] text-black sm:text-[42px] md:text-[50px] lg:text-[60px] xl:text-[68px]">
                    Related Projects
                  </h2>
                </div>
              </div>

              <Link
                to={portfolioPath}
                className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#00688F] px-5 py-3 font-unageo-medium text-[14px] text-[#00688F] transition-all duration-300 hover:bg-[#00688F] hover:text-white md:px-6 md:text-[16px]"
              >
                View more projects

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m14 7 5 5-5 5" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Projects slider */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: "easeOut",
              delay: 0.1,
            }}
            viewport={{ once: true, amount: 0.15 }}
            className="relative mx-auto mt-10 w-full max-w-[1320px] overflow-hidden rounded-[20px] bg-[#F4F6F7] pt-2 md:mt-14 md:rounded-[26px] md:p-3"
          >
            <div className="overflow-hidden rounded-[16px] md:rounded-[20px]">
              <Portfoliodetailslider
                datas={relatedProjects}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
      <Footers />
      <MobileFooters />
    </div>
  );
}
