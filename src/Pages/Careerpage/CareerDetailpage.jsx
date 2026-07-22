import { useEffect } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import HeaderSticky from "../../Components/Header/HeaderSticky";
import MobileHeader from "../../Components/Header/MobileHeader";
import Footers from "../../Components/Footers/Footers";
import MobileFooters from "../../Components/Footers/MobileFooters";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

import CareerApplicationForm from "./CareerApplicationForm";
import { getCareerDetail } from "./careersData";

const revealAnimation = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, ease: "easeOut" },
};

function DetailList({ title, items }) {
  return (
    <section className="mt-10 border-t border-[#DCE1E3] pt-8">
      <h2 className="text-[25px] font-semibold">{title}</h2>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-4 text-[15px] leading-7 text-[#5F666A]">
            <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00688F]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function CareerDetailpage() {
  const location = useLocation();
  const { slug } = useParams();

  const region = location.pathname.toLowerCase().startsWith("/us")
    ? "us"
    : "canada";

  const regionPath = region === "us" ? "/US" : "/canada";
  const detail = getCareerDetail(region, slug);

  useEffect(() => {
    if (detail) {
      document.title = `${detail.title} | Mariani Careers`;
    }
  }, [detail]);

  if (!detail) {
    return <Navigate to={`${regionPath}/careers`} replace />;
  }

  return (
    <div className="min-h-screen bg-white text-[#111315] font-unageo [&_h1]:font-counture [&_h2]:font-counture [&_h3]:font-counture">
      <HeaderSticky />
      <MobileHeader />

      <main>
        <section className="relative overflow-hidden pb-16 pt-36 text-white lg:p-32">

          {/* Background image */}

          <img
            src="/images/portfolio/VivaNextTransitHub/1.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark overlay */}

          <div className="absolute inset-0 bg-black/65" />

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative z-10 mx-auto max-w-[90vw]"
          >
            <Link
              to={`${regionPath}/careers`}
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/70 transition-colors hover:text-white"
            >
              <span aria-hidden="true">←</span>
              Back to {region === "us" ? "United States" : "Canada"} careers
            </Link>

            <span className="mt-10 block text-[12px] font-semibold uppercase tracking-[0.22em] text-[#8BD0E7]">
              {detail.eyebrow}
            </span>

            <h1 className="mt-5 max-w-[900px] text-[42px] font-semibold leading-[1.05] sm:text-[52px] lg:text-[64px]">
              {detail.title}
            </h1>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-white/70">
              <span>{detail.location}</span>
              <span>{detail.type}</span>
              <span>{detail.department}</span>
            </div>
          </motion.div>
        </section>

        <section className="bg-[#F4F7F8] py-16 lg:py-24">
          <div className="mx-auto grid max-w-[90vw] gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-16">
            <motion.article {...revealAnimation} className="rounded-[24px] bg-white p-7 sm:p-10 lg:p-12">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#00688F]">
                {detail.kind === "job" ? "Position Overview" : "Career Overview"}
              </span>

              <p className="mt-5 text-[18px] leading-8 text-[#42494D]">
                {detail.summary}
              </p>

              <DetailList
                title={detail.kind === "job" ? "Key Responsibilities" : "What You May Work On"}
                items={detail.responsibilities}
              />

              <DetailList
                title={detail.kind === "job" ? "Qualifications" : "What We Value"}
                items={detail.qualifications}
              />

              <section className="mt-10 rounded-[18px] bg-[#EAF4F7] p-6">
                <h2 className="text-[22px] font-semibold">Why Mariani</h2>
                <p className="mt-3 text-[15px] leading-7 text-[#536064]">
                  Work alongside experienced teams on technically demanding projects where craftsmanship, accountability, and long-term quality matter.
                </p>
              </section>
            </motion.article>

            <motion.aside {...revealAnimation} className="lg:sticky lg:top-28">
              <CareerApplicationForm application={detail} region={region} />
            </motion.aside>
          </div>
        </section>
      </main>

      <Footers />
      <MobileFooters />
      <ScrollToTop />
    </div>
  );
}
