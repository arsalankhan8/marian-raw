import React, { useState } from "react";
import Header from "../../../Components/Header/Header";
import box from "../../../assets/boxlight.png";
import rightarrow from "../../../assets/right.png";
import Footers from "../../../Components/Footers/Footers";
import { Link } from "react-router";
import iconlines from "../../../assets/iconlines.png";
import MobileHeader from "../../../Components/Header/MobileHeader";
import MobileFooters from "../../../Components/Footers/MobileFooters";
import { motion } from "framer-motion";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollTop";
import { getRegionPortfolioPath } from "../../../utils/regionPaths";
import { REGIONS } from "../../../constants/regions";

export default function Referencepage() {
  const [activeTab, setActiveTab] = useState("Country");
  const selectedRegion = sessionStorage.getItem("regionSelected");
  const selectedCountry = selectedRegion === REGIONS.US ? "United States" : "Canada";

  const portfolioPath = `${getRegionPortfolioPath()}/#portfolio`;

  const projectsData = [
  {
    name: "Four Seasons Downtown",
    city: "New York City",
    country: "United States",
    architect: "Robert A.M. Stern Architects",
    contractor: "Tishman Construction",
    typology: "Hotels / Residential",
    link: "/portfoliodetails/four-season",
  },
  {
    name: "NYU Theatre",
    city: "New York City",
    country: "United States",
    architect: "TBD",
    contractor: "TBD",
    typology: "Culture / Education",
    link: "/portfoliodetails/NYUTheatre",
  },
  {
    name: "Le Jardin sur Madison",
    city: "New York City",
    country: "United States",
    architect: "Rockwell Group",
    contractor: "Aecom Tishman",
    typology: "Residential",
    link: "/portfoliodetails/le-jardin",
  },
  {
    name: "Little Island - Pier 55",
    city: "New York City",
    country: "United States",
    architect: "Heatherwick Studio",
    contractor: "Hunter Roberts",
    typology: "Culture / Park",
    link: "/portfoliodetails/little-island",
  },
  {
    name: "Day's End - Pier 52",
    city: "New York City",
    country: "United States",
    architect: "David Hammons (Artist) / Guy Nordenson",
    contractor: "TBD",
    typology: "Culture / Art",
    link: "/portfoliodetails/days-end",
  },
  {
    name: "Weatherhead School of Management",
    city: "Cleveland",
    country: "United States",
    architect: "Frank Gehry",
    contractor: "TBD",
    typology: "Education",
    link: "/portfoliodetails/WeatherheadSchool",
  },
  {
    name: "United States Air Force Memorial",
    city: "Arlington",
    country: "United States",
    architect: "Pei Cobb Freed & Partners",
    contractor: "TBD",
    typology: "Culture / Monument",
    link: "/portfoliodetails/AirForce",
  },
  {
    name: "The New York Times Building",
    city: "New York City",
    country: "United States",
    architect: "Renzo Piano Building Workshop / FXFOWLE",
    contractor: "TBD",
    typology: "Office Space",
    link: "/portfoliodetails/NewYorkTimes",
  },
  {
    name: "The Elevated Acre",
    city: "New York City",
    country: "United States",
    architect: "Rogers Marvel Architects",
    contractor: "TBD",
    typology: "Culture / Park",
    link: "/portfoliodetails/ElevatedAcre",
  },
  {
    name: "Goldman Sachs",
    city: "New York City",
    country: "United States",
    architect: "Pei Cobb Freed & Partners",
    contractor: "TBD",
    typology: "Office Space",
    link: "/portfoliodetails/GoldmanSachs",
  },
  {
    name: "TD Terrace",
    city: "Toronto",
    country: "Canada",
    architect: "Adrian Smith + Gordon Gill Architecture / B+H Architects",
    contractor: "PCL",
    typology: "Office Space",
    link: "/portfoliodetails/td-terrace",
  },
  {
    name: "vivaNext BRT Stations",
    city: "York Region",
    country: "Canada",
    architect: "Multidisciplinary transit design teams",
    contractor: "EllisDon Coco",
    typology: "Infrastructure",
    link: "/portfoliodetails/viva-next-brt-station",
  },
  {
    name: "The Well",
    city: "Toronto",
    country: "Canada",
    architect: "Hariri Pontarini Architects (Masterplan & Office)",
    contractor: "Deltera",
    typology: "Retail & Mixed-Use",
    link: "/portfoliodetails/the-well",
  },
  {
    name: "The Luminous Veil",
    city: "Toronto",
    country: "Canada",
    architect: "Dereck Revington Studio",
    contractor: "TBD",
    typology: "Infrastructure / Art",
    link: "/portfoliodetails/LuminousVeil",
  },
  {
    name: "The Bow",
    city: "Calgary",
    country: "Canada",
    architect: "Foster + Partners / Zeidler",
    contractor: "TBD",
    typology: "Office Space",
    link: "/portfoliodetails/the-bow",
  },
  {
    name: "Garrison Crossing",
    city: "Toronto",
    country: "Canada",
    architect: "Pedelta with DTAH",
    contractor: "Dufferin Construction",
    typology: "Infrastructure",
    link: "/portfoliodetails/garrison-crossing",
  },
  {
    name: "The Spirit Garden",
    city: "Toronto",
    country: "Canada",
    architect: "Gow Hastings Architects with Two Row Architect",
    contractor: "Buttcon Construction",
    typology: "Culture",
    link: "/portfoliodetails/the-spirit-garden",
  },
  {
    name: "Glen Road Pedestrian Bridge",
    city: "Toronto",
    country: "Canada",
    architect: "DTAH / WSP",
    contractor: "Eiffage",
    typology: "Infrastructure",
    link: "/portfoliodetails/glen-road-pedestrian-bridge",
  },
  {
    name: "7 Dale Condominium",
    city: "Toronto",
    country: "Canada",
    architect: "Hariri Pontarini Architects",
    contractor: "Ellsworth Group",
    typology: "Residential",
    link: "/portfoliodetails/7-dale-condominium",
  },
  {
    name: "Art Gallery of Ontario",
    city: "Toronto",
    country: "Canada",
    architect: "Frank Gehry",
    contractor: "TBD",
    typology: "Culture",
    link: "/portfoliodetails/art-galary",
  },
  {
    name: "Rosalie Sharp Pavilion",
    city: "Toronto",
    country: "Canada",
    architect: "Bortolotto",
    contractor: "TBD",
    typology: "Education",
    link: "/portfoliodetails/front-facade",
  },
  {
    name: "University of Toronto",
    city: "Toronto",
    country: "Canada",
    architect: "KPMB Architects / MVVA",
    contractor: "TBD",
    typology: "Education / Landscape",
    link: "/portfoliodetails/landmark-project",
  },
  {
    name: "House of Commons Interim Chamber",
    city: "Ottawa",
    country: "Canada",
    architect: "Architecture49 / EVOQ Architecture",
    contractor: "TBD",
    typology: "Government",
    link: "/portfoliodetails/house-of-commons",
  },
  {
    name: "Axium Packaging",
    city: "Brampton",
    country: "Canada",
    architect: "TBD",
    contractor: "TBD",
    typology: "Industrial",
    link: "/portfoliodetails/axium-packaging",
  },
  {
    name: "Garrison Point Staircase",
    city: "Toronto",
    country: "Canada",
    architect: "Hariri Pontarini Architects / bKL Architecture",
    contractor: "TBD",
    typology: "Residential",
    link: "/portfoliodetails/garrison-point",
  },
  {
    name: "Ten York Condominium",
    city: "Toronto",
    country: "Canada",
    architect: "Wallman Architects",
    contractor: "TBD",
    typology: "Residential",
    link: "/portfoliodetails/ten-york",
  },
  {
    name: "50 Wellesley Tree",
    city: "Toronto",
    country: "Canada",
    architect: "Quadrangle Architects",
    contractor: "TBD",
    typology: "Residential / Art",
    link: "/portfoliodetails/50-wellesley",
  },
  {
    name: "Mississauga Laser Centre",
    city: "Mississauga",
    country: "Canada",
    architect: "TBD",
    contractor: "TBD",
    typology: "Healthcare / Commercial",
    link: "/portfoliodetails/MississaugaLaserCentre",
  },
  {
    name: "Toronto Pearson Airport Terminal 1",
    city: "Toronto",
    country: "Canada",
    architect: "Moshe Safdie / SOM / Adamson Associates",
    contractor: "TBD",
    typology: "Transportation",
    link: "/portfoliodetails/TorontoPearsonAirport",
  }
];

  const filteredProjects = projectsData.filter(
    (project) => project.country === selectedCountry
  );

  const getGroupedData = (field) => {
    // Collect all valid groups
    const groups = {};
    filteredProjects.forEach((project) => {
      const key = project[field];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(project);
    });
    // Return entries sorted alphabetically by key
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  };

  const renderProjectList = (projects) => {
    return (
      <div className="w-full md:w-[65%] flex flex-col gap-8">
        {projects.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-[2px] border-gray-300 pb-6 group transition-all duration-300 hover:border-black"
          >
            <p className="font-unageo-semibold capitalize text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px] relative w-fit after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 after:transition-all after:duration-300 group-hover:after:w-full max-w-[50%]">
              {/* Special coloring for Country tab provided via activeTab check in parent or just use generic text color?
                  The original code used text-[#00688F] for Canada projects and black for US.
                  Here we should maybe unify or keep conditional logic. 
                  Let's use conditional coloring if needed, but for simplicity, let's stick to the design used in US section (Black Text).
                  Wait, Canada section used text-[#00688F]. 
                  Let's use a helper to determine color? Or just black?
                  The design "Layout Consistency" says consistent layout. 
                  I'll use text-[#00688F] for the Name if it has a link? Or just use consistent style.
                  I'll use text-[#00688F] for the project name as per Canada design, or Black as per US?
                  Let's default to text-[#00688F] as it pops more.
               */}
              <span className={activeTab === 'Country' && item.country === 'Canada' ? "text-[#00688F]" : "text-black"}>
                {item.name}
              </span>
            </p>
            <div className="flex items-center justify-between w-full md:w-[45%] mt-3 md:mt-0">
              <p className="font-unageo text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px] capitalize w-[85%] text-gray-700 group-hover:text-black transition-all duration-300 text-right md:text-left">
                {activeTab === "Architect" ? item.city : item.architect}
              </p>
              {item.link ? (
                <Link to={item.link}>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="w-6 h-6 md:w-12 md:h-12 transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 ml-4"
                  />
                </Link>
              ) : (
                <img
                  src={rightarrow}
                  alt="arrow"
                  className="w-6 h-6 md:w-12 md:h-12 transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 ml-4"
                />
              )}
            </div>
          </div>
        ))
        }
      </div >
    );
  };

  return (
    <div>
      <Header />
      <MobileHeader />
      <motion.main
        id="main-content"
        tabIndex={-1}
        initial={{ opacity: 0, y: 200 }} // start slightly below + hidden
        whileInView={{ opacity: 1, y: 0 }} // animate upward into place
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }} // trigger once when ~30% is in view
      >
        <div className="flex flex-col gap-10 max-w-[90vw] w-full mx-auto mt-[60px]">
          {/* Section Titles */}
          <h1 className="text-center md:text-left">
            <span className="block font-unageo-semibold text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] leading-[132%] capitalize mb-2">
              Made by Mariani
            </span>
            <span className="block font-unageo-semibold text-[#00688F] text-center md:text-left text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] capitalize leading-[132%]">
              Less Ordinary, More Monumental
            </span>
          </h1>

          {/* Highlights / Reference Navigation */}
          <div className="flex justify-center md:justify-start gap-10 mt-6">
            <Link to={portfolioPath}>
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={box} alt="box" className="w-[16px] h-[16px]" />
                <p className="text-[#C2C2C3] font-unageo text-[14px] md:text-[20px] capitalize">highlights</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <img src={iconlines} alt="lines" className="w-[16px] h-[16px]" />
              <p className="text-black font-unageo text-[14px] md:text-[20px] capitalize">reference list</p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-10 mt-10 border-b-[2px] border-black pb-4 overflow-x-auto">
            {["Country", "Architect", "Contractor", "Typology"].map((tab) => (
              <p
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-unageo-semibold text-[16px] md:text-[26px] 3xl:text-[36px] cursor-pointer capitalize whitespace-nowrap transition-colors duration-300 ${activeTab === tab ? "text-[#00688F]" : "text-gray-400 hover:text-black"
                  }`}
              >
                {tab}
              </p>
            ))}
          </div>

          {/* Content Sections */}
          <div className="flex flex-col gap-10 mt-10">
            {activeTab === "Country" && (
              <div className="flex flex-col gap-16">
                <h2 className="text-[#00688F] text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] font-unageo-semibold capitalize leading-[132%]">
                  {selectedCountry}
                </h2>
                <div className="flex flex-col gap-12">
                  {Object.entries(
                    filteredProjects.reduce((acc, curr) => {
                      if (!acc[curr.city]) acc[curr.city] = [];
                      acc[curr.city].push(curr);
                      return acc;
                    }, {})
                  )
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([city, projects], index) => (
                      <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-20 border-t-[2px] border-black pt-8">
                        <div className="w-full md:w-[30%]">
                          <p className="text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] capitalize leading-[132%] text-black">
                            {city}
                          </p>
                        </div>
                        {renderProjectList(projects)}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab !== "Country" && (
              <div className="flex flex-col gap-16">
                {/* No Sub-header for other tabs, usually? Or do we need one? 
                     Design doesn't strictly specify, but "Country" had "Canada"/"US".
                     Here we just list the groups (Architects, Contractors, etc).
                 */}
                <div className="flex flex-col gap-12">
                  {getGroupedData(activeTab.toLowerCase()).map(([groupName, projects], index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-20 border-t-[2px] border-black pt-8">
                      <div className="w-full md:w-[30%]">
                        <p className="text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] capitalize leading-[132%] text-black">
                          {groupName}
                        </p>
                      </div>
                      {renderProjectList(projects)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.main>


      {/*}           <div className="flex flex-col gap-6 max-w-[90vw] w-full mx-auto mt-[70px]">
        <p className="font-unageo-semibold text-[24px] 3xl:text-[32px] leading-[132%] capitalize">
          References made by Mariani
        </p>
        <p className="font-unageo-semibold text-center md:text-left text-[30px] md:text-[50px] lg:text-[60px] 3xl:text-[80px] capitalize leading-[132%]">
          milestones of architecture
        </p>

        <div className="flex justify-center md:justify-start gap-6 rounded-4xl mt-8">
          <Link to={portfolioPath}>
            <div className="flex gap-3">
              <img
                src={box}
                alt="location"
                className=" w-[16px] h-[16px] mt-[7px]"
              />

              <p className="text-[#C2C2C3] font-unageo text-[20px] capitalize">
                highlights
              </p>
            </div>
          </Link>
          <div className="flex gap-3">
            <img
              src={iconlines}
              alt="location"
              className=" w-[16px] h-[16px] mt-[7px]"
            />

            <p className="text-black font-unageo text-[20px] capitalize">
              {" "}
              reference list
            </p>
          </div>
        </div>

        <div className="flex justify-between w-[50%] mt-12 gap-4">
          <p className="font-unageo-bold text-[16px] whitespace-nowrap md:text-[26px] 3xl:text-[36px]">
            Country
          </p>
          <p className="font-unageo text-[16px] whitespace-nowrap md:text-[26px] 3xl:text-[36px]">
            Architect
          </p>
          <p className="font-unageo text-[16px] whitespace-nowrap md:text-[26px] 3xl:text-[36px]">
            Project Name
          </p>
        </div>

        <div className="flex justify-between flex-wrap border-t-[2px] border-black pt-8 ">
          <div>
            <p className="text-[27px] md:text-[50px] lg:text-[65px] capitalize leading-[132%] 3xl:text-[74px]">
              Canada
            </p>
          </div>
          <div className="w-full mt-[15px] md:mt-0 md:w-[65%]">
            <div className="flex flex-col w-full">
              <div className="flex justify-between  pb-8 border-b-[2px] w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  vivaNext BRT Stations
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] w-[85%] 3xl:text-[36px] capitalize leading-[132%]">
                    Multidisciplinary transit design teams
                  </p>
                  <Link to={"/portfoliodetails/viva-next-brt-station"}>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-12 h-12
  transform transition-transform duration-300 hover:-translate-y-1"
                  />
                  </Link>
                </div>
              </div>
              <div className="flex justify-between pt-8 border-b-[2px] pb-8  w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  Le Jardin
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] w-[85%] 3xl:text-[36px] capitalize leading-[132%]">
                    Le Jardin
                  </p>
                  <Link to={"/portfoliodetails/le-jardin"}>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-12 h-12
  transform transition-transform duration-300 hover:-translate-y-1"
                  />
                  </Link>
                </div>
              </div>
              <div className="flex justify-between pt-8  pb-8 border-b-[2px] w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  7 Dale Condominium
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] w-[85%] 3xl:text-[36px] capitalize leading-[132%]">
                    Hariri Pontarini Architects
                  </p>
                  <Link to={"/portfoliodetails/7-dale-condominium"}>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-12 h-12
  transform transition-transform duration-300 hover:-translate-y-1"
                  />
                  </Link>
                </div>
              </div>
                            <div className="flex justify-between pt-8  pb-8 border-b-[2px] w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  The Spirit Garden
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] w-[85%] 3xl:text-[36px] capitalize leading-[132%]">
                    Gow Hastings Architects with Two Row Architect
                  </p>
                  <Link to={"/portfoliodetails/the-spirit-garden"}>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-12 h-12
  transform transition-transform duration-300 hover:-translate-y-1"
                  />
                  </Link>
                </div>
              </div>
                            <div className="flex justify-between pt-8  pb-8 border-b-[2px] w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  Garrison Crossing
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] w-[85%] 3xl:text-[36px] capitalize leading-[132%]">
                    Pedelta with DTAH
                  </p>
                  <Link to={"/portfoliodetails/garrison-crossing"}>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-12 h-12
  transform transition-transform duration-300 hover:-translate-y-1"
                  />
                  </Link>
                </div>
              </div>
              <div className="flex justify-between pt-8  pb-8 border-b-[2px] w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  The Well
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] w-[85%] 3xl:text-[36px] capitalize leading-[132%]">
                    Hariri Pontarini Architects (Masterplan & Office Tower)
                  </p>
                  <Link to={"/portfoliodetails/the-well"}>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-12 h-12
  transform transition-transform duration-300 hover:-translate-y-1"
                  />
                  </Link>
                </div>
              </div>
              <div className="flex justify-between pt-8  pb-8 border-b-[2px] w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  TD Terrace
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] w-[85%] 3xl:text-[36px] capitalize leading-[132%]">
                    Adrian Smith + Gordon Gill Architecture (Design) / B+H Architects (Architect of Record)
                  </p>
                  <Link to={"/portfoliodetails/td-terrace"}>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-12 h-12
  transform transition-transform duration-300 hover:-translate-y-1"
                  />
                  </Link>
                </div>
              </div>
              <div className="flex justify-between pt-8  pb-8 w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  Glen Road Pedestrian Bridge
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] w-[85%] 3xl:text-[36px] capitalize leading-[132%]">
                    DTAH (architecture & aesthetics) / WSP (engineering & detailed design)
                  </p>
                  <Link to={"/portfoliodetails/glen-road-pedestrian-bridge"}>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-12 h-12
  transform transition-transform duration-300 hover:-translate-y-1"
                  />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-wrap justify-between ">
          <div>
            <p className="text-[27px] md:text-[50px] lg:text-[65px] capitalize leading-[132%] 3xl:text-[74px]">
              United States
            </p>
          </div>
          <div className="w-full mt-[15px] md:mt-0 md:w-[65%]">
            <div className="flex flex-col w-full">
              <div className="flex justify-between pt-8 border-b-[2px] pb-8  w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px] w-[90%] md:w-[30%]">
                  Four Seasons Hotel, New York
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] w-[85%] 3xl:text-[36px] capitalize leading-[132%]">
                    Property and phase dependent
                  </p>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-12 h-12
  transform transition-transform duration-300 hover:-translate-y-1"
                  />
                </div>
              </div>
              <div className="flex justify-between pt-8 border-b-[2px] pb-8  w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px] w-[90%] md:w-[30%]">
                  Little Island
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] w-[85%] 3xl:text-[36px] capitalize leading-[132%]">
                    Heatherwick Studio
                  </p>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-12 h-12
  transform transition-transform duration-300 hover:-translate-y-1"
                  />
                </div>
              </div>
              <div className="flex justify-between pt-8 border-b-[2px] pb-8  w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px] w-[90%] md:w-[30%]">
                  United States Air Force Memorial
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] w-[85%] 3xl:text-[36px] capitalize leading-[132%]">
                    Pei Cobb Freed & Partners
                  </p>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-12 h-12
  transform transition-transform duration-300 hover:-translate-y-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

*/}

      {/*}    <div className="flex flex-col gap-6 max-w-[90vw] w-full mx-auto mt-[70px]">
        <p className="font-unageo-semibold text-[24px] 3xl:text-[32px] leading-[132%] capitalize">
          References made by Mariani
        </p>
        <p className="font-unageo-semibold text-center md:text-left text-[30px] md:text-[50px] lg:text-[60px] 3xl:text-[80px] capitalize leading-[132%]">
          milestones of architecture
        </p>

        <div className="flex justify-center md:justify-start gap-6 rounded-4xl mt-8">
          <Link to={portfolioPath}>
            <div className="flex gap-3">
              <img
                src={box}
                alt="location"
                className=" w-[16px] h-[16px] mt-[7px]"
              />

              <p className="text-[#C2C2C3] font-unageo text-[20px] capitalize">
                highlights
              </p>
            </div>
          </Link>
          <div className="flex gap-3">
            <img
              src={iconlines}
              alt="location"
              className=" w-[16px] h-[16px] mt-[7px]"
            />

            <p className="text-black font-unageo text-[20px] capitalize">
              {" "}
              reference list
            </p>
          </div>
        </div>

        <div className="flex justify-between w-[50%] mt-12 gap-4">
          <p className="font-unageo-bold text-[16px] whitespace-nowrap md:text-[26px] 3xl:text-[36px]">
            Country
          </p>
          <p className="font-unageo text-[16px] whitespace-nowrap md:text-[26px] 3xl:text-[36px]">
            Architect
          </p>
          <p className="font-unageo text-[16px] whitespace-nowrap md:text-[26px] 3xl:text-[36px]">
            Project Name
          </p>
        </div>

        <div className="flex justify-between flex-wrap border-t-[2px] border-black pt-8 ">
          <div>
            <p className="text-[27px] md:text-[50px] lg:text-[65px] capitalize leading-[132%] 3xl:text-[74px]">
              Australia
            </p>
          </div>
          <div className="w-full mt-[15px] md:mt-0 md:w-[65%]">
            <div className="flex flex-col w-full">
              <div className="flex justify-between  pb-8 border-b-[2px] w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  Chadstone Shopping Centre
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] 3xl:text-[36px] capitalize leading-[132%]">
                    Chadstone Shopping Centre
                  </p>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-[40px] h-[10px] md:w-[178px] md:h-[34px]"
                  />
                </div>
              </div>
              <div className="flex justify-between pt-8   w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  new performing arts venue
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] 3xl:text-[36px] capitalize leading-[132%]">
                    Chadstone Shopping Centre
                  </p>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-[40px] h-[10px] md:w-[178px] md:h-[34px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between border-y-[2px] border-black  ">
          <div>
            <p className="text-[27px] md:text-[50px] lg:text-[65px] capitalize leading-[132%] 3xl:text-[74px]">
              Austria
            </p>
          </div>
          <div className="w-full mt-[15px] md:mt-0 md:w-[65%]">
            <div className="flex flex-col w-full ">
              <div className="flex  justify-between py-8  w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  Brundi Sports flagship store
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] 3xl:text-[36px] capitalize leading-[132%]">
                    Blocher partners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between ">
          <div>
            <p className="text-[27px] md:text-[50px] lg:text-[65px] capitalize leading-[132%] 3xl:text-[74px]">
              brazil
            </p>
          </div>
          <div className="w-full mt-[15px] md:mt-0 md:w-[65%]">
            <div className="flex flex-col w-full">
              <div className="flex justify-between pt-8 border-b-[2px] pb-8  w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px] w-[90%] md:w-[30%]">
                  Albert einstein education and research centre
                </p>
                <div className="flex w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] 3xl:text-[36px] capitalize leading-[132%]">
                    Safdie architecture, lLC
                  </p>
                  <img
                    src={rightarrow}
                    alt="arrow"
                    className="mt-[20px] md:mt-0 w-[40px] h-[10px] md:w-[178px] md:h-[34px]"
                  />
                </div>
              </div>
              <div className="flex justify-between pt-8  w-full ">
                <p className="font-unageo-semibold capitalize leading-[132%] text-[16px] md:text-[25px] 3xl:text-[36px]">
                  charloca wave
                </p>
                <div className="w-[40%] flex md:w-[55%] justify-between">
                  <p className="font-unageo text-[16px] md:text-[25px] 3xl:text-[36px] capitalize leading-[132%]">
                    nir sivan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
*/}
      <div className="mt-[70px]">
        <ScrollToTop/>
        <Footers />
        <MobileFooters />
      </div>
    </div>
  );
}
