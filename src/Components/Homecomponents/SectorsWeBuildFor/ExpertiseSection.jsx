import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {
  getSelectedRegion,
} from "../../../utils/regionPaths";

import { REGIONS } from "../../../constants/regions";

// Existing Canada image imports
import CommercialBuildings from "../../../assets/HomeSec3/CommercialBuildings.webp";
import Amenities from "../../../assets/HomeSec3/Amenities.webp";
import PublicGovernment from "../../../assets/HomeSec3/Public&Government.webp";
import Retail from "../../../assets/HomeSec3/Retail.webp";
import Culture from "../../../assets/HomeSec3/Culture.webp";
import Civil from "../../../assets/HomeSec3/Civil.webp";
import Education from "../../../assets/HomeSec3/Education.jpg";
import Aviation from "../../../assets/HomeSec3/TorontoAirport.jpg";
import Hospitality from "../../../assets/HomeSec3/Residential.jpg";
import Residential from "../../../assets/HomeSec3/Residential.webp";

/*
|--------------------------------------------------------------------------
| Canada Data
|--------------------------------------------------------------------------
*/

const CANADA_EXPERTISE_DATA = [
  {
    id: "canada-commercial",
    title: "Commercial Buildings",
    image: CommercialBuildings,
    description:
      "Integrated metal and glass systems supporting high-performance office towers and corporate headquarters.",
  },
  {
    id: "canada-amenities",
    title: "Amenities",
    image: Amenities,
    description:
      "Architectural feature elements that enhance shared spaces, lobbies, and exterior environments.",
  },
  {
    id: "canada-public-government",
    title: "Public & Government",
    image: PublicGovernment,
    description:
      "Secure, code-compliant fabrication solutions delivered for civic institutions and public buildings.",
  },
  {
    id: "canada-retail",
    title: "Retail",
    image: Retail,
    description:
      "Custom architectural systems engineered to elevate flagship retail and experiential commercial spaces.",
  },
  {
    id: "canada-culture",
    title: "Culture & Recreation",
    image: Culture,
    description:
      "Specialized fabrication for landmark cultural institutions and high-traffic recreational spaces.",
  },
  {
    id: "canada-civil",
    title: "Civil",
    image: Civil,
    description:
      "Durable structural systems supporting transportation infrastructure, bridges, and public works.",
  },
  {
    id: "canada-education",
    title: "Education",
    image: Education,
    description:
      "Precision-built systems tailored for academic campuses and institutional facilities.",
  },
  {
    id: "canada-aviation",
    title: "Aviation",
    image: Aviation,
    description:
      "High-specification metal and glazing systems engineered for terminal environments.",
  },
  {
    id: "canada-hospitality",
    title: "Hospitality",
    image: Hospitality,
    description:
      "Architectural fabrication enhancing premium dining and destination-driven environments.",
  },
  {
    id: "canada-residential",
    title: "Residential",
    image: Residential,
    description:
      "Architectural systems tailored for residential spaces. Designed for long-term performance and clean integration.",
  },
];

/*
|--------------------------------------------------------------------------
| U.S. Data
|--------------------------------------------------------------------------
|
| These image paths come directly from the U.S. HTML you provided.
| No separate React imports or U.S. folder are required.
|
*/

import USCommercial from "../../../assets/HomeSec3/sectors-we-build-commercial-us.webp";
import USCulture from "../../../assets/HomeSec3/Culture.jpg";
import USEducation from "../../../assets/HomeSec3/sectors-we-build-education-us.webp";
import USHospitality from "../../../assets/HomeSec3/sectors-we-build-hospitality-us.webp";
import USPublicGovernment from "../../../assets/HomeSec3/sectors-we-build-public-and-goverment-us.webp";
import USResidential from "../../../assets/HomeSec3/sectors-we-build-residential-us.webp";

const US_EXPERTISE_DATA = [
  {
    id: "us-commercial",
    title: "Commercial Buildings",
    image: USCommercial,
    description:
      "Integrated metal and glass systems supporting high-performance office towers and corporate headquarters.",
  },
  {
    id: "us-culture",
    title: "Culture & Recreation",
    image: USCulture,
    description:
      "Specialized fabrication for landmark cultural institutions and high-traffic recreational spaces.",
  },
  {
    id: "us-education",
    title: "Education",
    image: USEducation,
    description:
      "Precision-built systems tailored for academic campuses and institutional facilities.",
  },
  {
    id: "us-hospitality",
    title: "Hospitality",
    image: USHospitality,
    description:
      "Architectural fabrication enhancing premium dining and destination-driven environments.",
  },
  {
    id: "us-public-government",
    title: "Public & Government",
    image: USPublicGovernment,
    description:
      "Secure, code-compliant fabrication solutions delivered for civic institutions and public buildings.",
  },
  {
    id: "us-residential",
    title: "Residential",
    image: USResidential,
    description:
      "Architectural systems tailored for residential spaces. Designed for long-term performance and clean integration.",
  },
];

/*
|--------------------------------------------------------------------------
| Expertise Card
|--------------------------------------------------------------------------
*/

const ExpertiseCard = ({ item }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="relative h-[300px] w-full cursor-pointer overflow-hidden rounded-xl bg-slate-200 font-counture shadow-md md:h-[320px]"
      onClick={() => setIsActive((current) => !current)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title} details`}
      aria-expanded={isActive}
    >
      {/* Background image */}

      <img
        src={item.image}
        alt={item.title}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
          isActive ? "scale-105" : "scale-100"
        }`}
      />

      {/* Default title state */}

      <div
        aria-hidden={isActive}
        className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 transition-opacity duration-500 ${
          isActive ? "opacity-0" : "opacity-100"
        }`}
      >
        <h3 className="text-sm font-bold uppercase tracking-wider text-white md:text-xl">
          {item.title}
        </h3>
      </div>

      {/* Active overlay state */}

      <div
        aria-hidden={!isActive}
        className={`absolute inset-0 flex flex-col items-center justify-center bg-[#00688F]/90 p-6 text-center transition-all duration-500 ${
          isActive
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <h3 className="mb-2 text-base font-bold uppercase text-white md:text-xl">
          {item.title}
        </h3>

        <div className="mb-4 h-0.5 w-10 bg-white/40" />

        <p
          className={`transform font-unageo-medium text-xs leading-snug text-white/90 transition-transform duration-500 md:text-sm ${
            isActive ? "translate-y-0" : "translate-y-2"
          }`}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Expertise Section
|--------------------------------------------------------------------------
*/

const ExpertiseSection = () => {
  const location = useLocation();

  /*
   * Re-check the selected region whenever the route changes.
   * This follows the same region logic used in your Header.
   */

  const region = useMemo(() => {
    return getSelectedRegion();
  }, [location.pathname]);

  /*
   * Use the U.S. dataset only when the selected region is U.S.
   * Canada remains the default fallback.
   */

  const expertiseData =
    region === REGIONS.US
      ? US_EXPERTISE_DATA
      : CANADA_EXPERTISE_DATA;

  const regionKey =
    region === REGIONS.US ? "us" : "canada";

  return (
    <section className="flex flex-col items-center bg-white px-6 py-16 md:py-24">
      {/* Section heading */}

      <div className="flex w-full max-w-4xl flex-col items-center gap-4 pb-12 text-center md:pb-16">
        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
          }}
          className="font-counture text-[20px] uppercase leading-[84%] text-[#00688F] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px]"
        >
          Sectors We Build For
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
          viewport={{
            once: true,
          }}
          className="font-unageo-medium text-[14px] capitalize text-[#00688F] md:text-[24px] lg:text-[18px] xl:text-[25px] 2xl:text-[28px] 3xl:text-[66px]"
        >
          Supporting public and private infrastructure across multiple
          industries.
        </motion.p>
      </div>

      {/* Region-based carousel */}

      <div className="w-full max-w-7xl">
        <Swiper
          key={regionKey}
          modules={[Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={1.2}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 2.5,
            },
          }}
          className="!pb-16"
        >
          {expertiseData.map((item) => (
            <SwiperSlide key={item.id}>
              <ExpertiseCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: #00688F !important;
          opacity: 0.2;
        }

        .swiper-pagination-bullet-active {
          width: 28px !important;
          border-radius: 4px !important;
          opacity: 1 !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default ExpertiseSection;
