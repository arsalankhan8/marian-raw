import React, { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import faqimg from "../../../assets/faqlegacy.webp";
import Faq from "../../FAQ/Faq";
import arrowr from "../../../assets/arrowr.png";
import { Link } from "react-router";

export default function Faqsection() {
  const faqitems = [
    {
      id: 1,
      Heading: `Ontario Steel Design Award of Excellence –Projects Outside Ontario (2007)`,
      Subtext: `Canadian Institute of Steel Construction recognition for the United States Air Force Memorial in Virginia, honoring craftsmanship on an international scale.`,
      description:
        "Ontario Steel Design Award of Excellence –Projects Outside Ontario (2007)",
    },
    {
      id: 2,
      Heading: `Ontario Steel Design Award of Excellence –Bridge Category (2019)`,
      Subtext: `Awarded by CISC for Toronto's Garrison Crossing, highlighting advanced fabrication of landmark duplex stainless steel bridges.`,
    },
    {
      id: 3,
      Heading: `Canadian Consulting Engineering Award of Excellence (2020)`,
      Subtext: `National recognition from ACEC-Canada for Garrison Crossing, celebrated for engineering innovation and fabrication excellence.`,
    },
    {
      id: 4,
      Heading: `Top 10 Fabrication Services Providers in Canada (2024)`,
      Subtext: `Named by Manufacturing Technology Insights as one of the country's leading firms in advanced architectural steel fabrication.`,
    },
  ];

  const containerRef = useRef(null);
  const [pos, setPos] = useState(0); // 0 -> 100 (percent)
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef(null);

  // useInView to trigger once when the section becomes sufficiently visible
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  // combine refs
  useEffect(() => {
    if (containerRef.current) {
      inViewRef(containerRef.current);
    }
  }, [containerRef, inViewRef]);

  // smooth left image animation with looping behavior
  useEffect(() => {
    if (!inView) return;

    let rafId = null;
    const duration = 13000; // milliseconds for full pan
    const pauseDuration = 1000; // 1 second pause

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (startTime, startPos, targetPos, onComplete) => {
      const stepFn = (now) => {
        const elapsed = now - startTime;
        const raw = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(raw);
        const current = startPos + (targetPos - startPos) * eased;
        setPos(current);

        if (raw < 1) {
          rafId = requestAnimationFrame(stepFn);
        } else {
          onComplete();
        }
      };
      rafId = requestAnimationFrame(stepFn);
    };

    const startAnimationLoop = () => {
      // Animate from left (0%) to right (100%)
      animate(performance.now(), 0, 100, () => {
        // Pause at right for 1 second
        setTimeout(() => {
          // Animate from right (100%) back to left (0%)
          animate(performance.now(), 100, 0, () => {
            // Pause at left for 1 second
            setTimeout(() => {
              // Restart the loop
              startAnimationLoop();
            }, pauseDuration);
          });
        }, pauseDuration);
      });
    };

    // Start the animation loop
    startAnimationLoop();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [inView]);

  return (
    <div
      className="max-w-[90vw] w-full mx-auto flex flex-wrap md:flex-nowrap justify-center gap-12 mt-12"
      ref={containerRef}>
      {/* LEFT IMAGE WITH WIDTH GROW + SMOOTH PAN */}
      <div className="w-[100%] md:w-[40%] overflow-hidden rounded-4xl">
        <motion.img
          src={faqimg}
          alt="img"
          className="h-[70vh] md:h-[620px] 2xl:h-[700px] 3xl:h-[1199px] rounded-4xl object-cover"
          style={{
            objectPosition: `${pos}% center`,
            willChange: "object-position",
          }}
          draggable={false}
          initial={{ width: "0%" }}
          animate={inView ? { width: "100%" } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* RIGHT SIDE CONTENT WITH SLIDE UP ANIMATION */}
      <motion.div
        className="flex flex-col justify-center w-[100%] md:w-[60%]"
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="font-counture text-center md:text-left text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] leading-[89%] uppercase text-[#00688F]">
          Awards & Recognitions
        </p>

        <div className="flex mt-6 flex-col gap-3">
          {faqitems.map((value) => (
            <Faq
              key={value.id}
              faqtitle={value.Heading}
              faqsubtitle={value.Subtext}
              faqdescription={value.description}
            />
          ))}
        </div>
        <div className="flex justify-center md:justify-start">
          <Link to="/awards">
            <button className="mt-8 w-[132px] h-[55px] lg:w-[162px] lg:h-[50px] text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] rounded-2xl transition duration-200 flex justify-center items-center gap-6 font-unageo-medium text-white bg-[#00688F] hover:bg-[#939598]">
              View All
              <img
                src={arrowr}
                alt="arrow"
                className="w-[16px] md:w-[22px] lg:w-[22px] h-[12px] md:h-[18px] lg:h-[17px]"
              />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
