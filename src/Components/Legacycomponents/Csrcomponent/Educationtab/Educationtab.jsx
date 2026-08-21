import React, {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import img1 from "../../../../assets/tab8.webp";
import img2 from "../../../../assets/tab2.webp";
import img3 from "../../../../assets/tab4.webp";

const educationTabs = [
  {
    id: 1,
    label: "Conestoga College",
    image: img1,
    heading:
      "Conestoga College – Mariani Metal Awards",
    description:
      "Mariani Metal supports students at Conestoga College through dedicated awards that recognize initiative and encourage persistence. By easing financial pressures, the awards affirm a belief that talent and ambition should never be limited by circumstance.",
  },
  {
    id: 2,
    label: "Humber Polytechnic",
    image: img2,
    heading:
      "Humber Polytechnic – Civil Engineering & Welding Scholarships",
    description:
      "Ongoing scholarships at Humber Polytechnic provide direct support for students in engineering and trades programs. These opportunities empower recipients to focus on advancing their skills and prepare them to contribute meaningfully to the future of technical excellence.",
  },
  {
    id: 3,
    label: "USMCA STEM",
    image: img3,
    heading: "USMCA STEM Education Foundation",
    description:
      "Through a partnership with the U.S. Minority Contractors Association, Mariani Metal sponsors scholarships and supports the Annual Millennium Builders Awards & STEM Scholarship Ceremony. This initiative promotes diversity, equity, and inclusion in STEM and construction, opening doors for the next generation of leaders.",
  },
];

export default function Educationtab({
  showOnlyUsmcaEducation = false,
}) {
  const initialTab = showOnlyUsmcaEducation
    ? 3
    : 1;

  const [activeTab, setActiveTab] =
    useState(initialTab);

  const [baseTab, setBaseTab] =
    useState(initialTab);

  const [overlay, setOverlay] =
    useState(null);

  const [isAnimating, setIsAnimating] =
    useState(false);

  const visibleTabs = showOnlyUsmcaEducation
    ? educationTabs.filter((tab) => tab.id === 3)
    : educationTabs;

  useEffect(() => {
    const firstTab = showOnlyUsmcaEducation
      ? 3
      : 1;

    setActiveTab(firstTab);
    setBaseTab(firstTab);
    setOverlay(null);
    setIsAnimating(false);
  }, [showOnlyUsmcaEducation]);

  const getTab = (tabId) => {
    return educationTabs.find(
      (tab) => tab.id === tabId,
    );
  };

  const getImageForTab = (tabId) => {
    return getTab(tabId)?.image || img1;
  };

  const handleTabChange = (tabId) => {
    if (
      tabId === activeTab ||
      isAnimating
    ) {
      return;
    }

    setActiveTab(tabId);
    setIsAnimating(true);

    if (tabId > baseTab) {
      setOverlay({
        tab: tabId,
        direction: "in",
      });
    } else {
      const previousBaseTab = baseTab;

      setBaseTab(tabId);

      setOverlay({
        tab: previousBaseTab,
        direction: "out",
      });
    }
  };

  const activeTabContent =
    getTab(activeTab);

  return (
    <div className="max-w-[90vw] w-full mx-auto bg-[#F9F9F9] p-3 md:p-4 lg:p-6 2xl:p-12 3xl:p-16">
      {/* Hide navigation when USMCA is the only item */}
      {visibleTabs.length > 1 && (
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-2">
          {visibleTabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() =>
                handleTabChange(tab.id)
              }
              className={`font-unageo-semibold transition duration-300 text-[11px] whitespace-nowrap md:text-[25px] lg:text-[26px] 2xl:text-[30px] 3xl:text-[41px] p-2 border-b-[1px] cursor-pointer ${
                activeTab === tab.id
                  ? "text-black border-b-black"
                  : "text-[#C2C2C2] border-b-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div
        className={
          visibleTabs.length > 1
            ? "mt-10"
            : "mt-0"
        }
      >
        <div className="flex justify-center items-center flex-wrap gap-12">
          {/* Image area */}
          <div className="w-full md:w-[34%] lg:w-[37%] xl:w-[40%] 3xl:w-[50%] relative overflow-hidden">
            <img
              src={getImageForTab(baseTab)}
              alt={
                getTab(baseTab)?.heading ||
                "Mariani education initiative"
              }
              className="w-full h-[250px] md:h-[250px] lg:h-[330px] xl:h-[450px] 2xl:h-[500px] 3xl:h-auto object-cover"
              draggable={false}
            />

            <AnimatePresence>
              {overlay && (
                <motion.img
                  key={`overlay-${overlay.tab}-${overlay.direction}`}
                  src={getImageForTab(
                    overlay.tab,
                  )}
                  alt={
                    getTab(overlay.tab)
                      ?.heading ||
                    "Mariani education initiative"
                  }
                  draggable={false}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  initial={
                    overlay.direction === "in"
                      ? { x: "100%" }
                      : { x: 0 }
                  }
                  animate={
                    overlay.direction === "in"
                      ? { x: 0 }
                      : { x: "100%" }
                  }
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  onAnimationComplete={() => {
                    if (
                      overlay.direction ===
                      "in"
                    ) {
                      setBaseTab(overlay.tab);
                    }

                    setOverlay(null);
                    setIsAnimating(false);
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Text content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeTab}`}
              initial={{
                opacity: 0,
                y: 3,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -5,
              }}
              transition={{
                duration: 0.3,
              }}
              className="flex flex-col justify-center w-full md:w-[45%]"
            >
              <h3 className="font-unageo-semibold text-[16px] md:text-[20px] lg:text-[24px] xl:text-[27px] 2xl:text-[30px] 3xl:text-[40px] text-[#00688F] capitalize leading-[112%]">
                {activeTabContent?.heading}
              </h3>

              <p className="font-unageo text-[12px] md:text-[16px] lg:text-[17px] xl:text-[20px] 2xl:text-[22px] 3xl:text-[32px] text-black capitalize leading-[127%] mt-3">
                {activeTabContent?.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
