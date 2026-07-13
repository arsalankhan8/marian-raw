import React from 'react';
import { motion } from 'framer-motion';

export default function Stickysection({ Backgroundimg, Heading, Subtext, isLast, index, totalItems }) {
  // Only make the section sticky if it's not the last one
  const shouldBeSticky = !isLast;
  
  return (
    <div
      className={`w-full relative h-screen bg-cover bg-center bg-no-repeat ${
        shouldBeSticky ? "sticky top-0" : ""
      }`}
      style={{ backgroundImage: `url(${Backgroundimg})` }}
    >
      {/* Dark Overlay for text readability */}
      <div className="flex justify-center items-center w-full h-full bg-black/60">
        
        {/* Content Container: 2-column grid on desktop */}
        <div className="w-full max-w-[1440px] px-6 md:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center overflow-hidden">
          
          {/* LEFT COLUMN: Heading */}
          <div className="flex flex-col justify-center text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-[30px] lg:text-[40px] xl:text-[55px] 2xl:text-[65px] 3xl:text-[121px] font-counture text-white uppercase leading-[1.1] tracking-tight"
            >
              {Heading}
            </motion.h2>
          </div>

          {/* RIGHT COLUMN: Subtext with vertical border on large screens */}
          <div className="flex flex-col justify-center text-left lg:border-l-2 lg:border-white/50 lg:pl-10">
            <motion.p 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-white/95 font-unageo-medium text-[13px] md:text-[19px] lg:text-[13px] xl:text-[20px] 2xl:text-[23px] 3xl:text-[61px] leading-[120%] whitespace-pre-line"
            >
              {Subtext}
            </motion.p>
          </div>

        </div>
      </div>
    </div>
  );
}