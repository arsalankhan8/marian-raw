import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import img1 from "../../../../assets/tab6.webp";
import img2 from "../../../../assets/tab4.webp";

export default function Communitytab() {
  const [activeTab, setActiveTab] = useState(1);

  // new states for animated overlay behavior
  const [baseTab, setBaseTab] = useState(1); // the image currently shown as the static base
  const [overlay, setOverlay] = useState(null); // { tab: number, direction: 'in' | 'out' }
  const [isAnimating, setIsAnimating] = useState(false);

  // helper to map tab -> image (keep it simple per your existing import)
  const getImageForTab = (tab) => {
    // you only provided img1 in original file; if you add images per tab, return them here
    if (tab === 2) return img2;
    return img1;
  };

  const handleTabChange = (tab) => {
    if (tab === activeTab || isAnimating) return;

    // Set both states simultaneously to start animations together
    setIsAnimating(true);
    setActiveTab(tab);

    // forward (higher tab number) => animate new image in from right on top of current
    if (tab > baseTab) {
      setOverlay({ tab, direction: "in" });
    } else {
      // backward (lower tab number) => put target image as base instantly, animate current out to right
      setBaseTab(tab);
      setOverlay({ tab: baseTab, direction: "out" });
    }
  };

  return (
    <div className="max-w-[90vw] w-full mx-auto bg-[#F9F9F9] p-3 md:p-4 lg:p-6 2xl:p-16">
      <div className="flex justify-between">
        {/* Tab 1 */}
        <span
          className={`font-unageo-semibold transition duration-300 text-[12px] whitespace-nowrap md:text-[25px] lg:text-[26px] 2xl:text-[30px] 3xl:text[41px] p-2 border-b-[1px] cursor-pointer ${
            activeTab === 1
              ? "text-black border-b-black"
              : "text-[#C2C2C2] border-b-transparent"
          }`}
          onClick={() => handleTabChange(1)}
        >
          Garden Sponsorship
        </span>

        {/* Tab 2 */}
        <span
          className={`font-unageo-semibold transition duration-300 text-[12px] whitespace-nowrap md:text-[25px] lg:text-[26px] 2xl:text-[30px] 3xl:text[41px] p-2 border-b-[1px] cursor-pointer ${
            activeTab === 2
              ? "text-black border-b-black"
              : "text-[#C2C2C2] border-b-transparent"
          }`}
          onClick={() => handleTabChange(2)}
        >
          Ceremony Sponsorship
        </span>

        {/* Tab 3 */}
      </div>

      {/* Content below */}
      <div className="mt-10">
        <div className="flex justify-center items-center flex-wrap gap-12">
          {/* IMAGE AREA - keep original width classes, but wrap in relative container for overlay */}
          <div className="md:w-[34%] lg:w-[37%] xl:w-[40%] 3xl:w-[50%] h-full relative overflow-hidden">
            {/* Base image (static) */}
            <img
              src={getImageForTab(baseTab)}
              alt="img"
              className="3xl:w-full  md:h-[250px] lg:h-[330px] xl:h-[450px] 2xl:h-[500px] 3xl:h-full"
              draggable={false}
              style={{ display: "block" }}
            />

            {/* Overlay animated image */}
            <AnimatePresence>
              {overlay && (
                <motion.img
                  key={`overlay-${overlay.tab}-${overlay.direction}`}
                  src={getImageForTab(overlay.tab)}
                  alt={`overlay-${overlay.tab}`}
                  draggable={false}
                  className="w-full h-full"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  initial={
                    overlay.direction === "in"
                      ? { x: "100%" } // new image enters from right
                      : { x: 0 } // current image starts at center when animating out
                  }
                  animate={
                    overlay.direction === "in"
                      ? { x: 0 } // slide in to center
                      : { x: "100%" } // slide out to right
                  }
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  onAnimationComplete={() => {
                    // finalize states after animation
                    if (overlay.direction === "in") {
                      // overlay slid on top -> make it the new base
                      setBaseTab(overlay.tab);
                    }
                    setOverlay(null);
                    setIsAnimating(false);
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* TEXT CONTENT (unchanged layout) with fade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeTab}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center md:w-[45%]"
            >
              {activeTab === 1 && (
                <>
                  <h3 className="font-unageo-semibold text-[16px] md:text-[20px] lg:text-[24px] xl:text-[27px] 2xl:text-[30px] 3xl:text[40px] text-[#00688F] capitalize leading-[112%]">
                    Humber Student Garden Sponsorship
                  </h3>
                  <p className="font-unageo text-[12px] md:text-[16px] lg:text-[17px] xl:text-[20px] 2xl:text-[22px] 3xl:text[32px] text-black capitalize leading-[127%] mt-3">
                    Mariani Metal has sponsored Humber College's student garden,
                    a project that brings education and sustainability together.
                    The initiative encourages stewardship and responsibility,
                    connecting classroom learning to hands-on practice within
                    the campus community.
                  </p>
                </>
              )}

              {activeTab === 2 && (
                <>
                  <h3 className="font-unageo-semibold text-[16px] md:text-[20px] lg:text-[24px] xl:text-[27px] 2xl:text-[30px] 3xl:text[40px] text-[#00688F] capitalize leading-[112%]">
                    STEM Scholarship Ceremony Sponsorship
                  </h3>
                  <p className="font-unageo text-[12px] md:text-[16px] lg:text-[17px] xl:text-[20px] 2xl:text-[22px] 3xl:text[32px] text-black capitalize leading-[127%] mt-3">
                    Mariani Metal contributes to the U.S. Minority Contractors
                    Association's STEM Scholarship Ceremony, an event that
                    celebrates achievement and expands access to education. The
                    sponsorship reflects a commitment to fostering opportunity
                    and investing in the future workforce of the construction
                    industry.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
