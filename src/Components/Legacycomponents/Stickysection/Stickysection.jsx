import React from "react";
import { motion } from "framer-motion";

export default function Stickysection({
  Backgroundimg,
  Heading,
  Subtext,
  isLast,
}) {
  const shouldBeSticky = !isLast;

  return (
    <section
      className={`
        relative w-full
        min-h-[100svh] lg:min-h-screen
        bg-cover bg-center bg-no-repeat
        ${shouldBeSticky ? "lg:sticky lg:top-0" : ""}
      `}
      style={{
        backgroundImage: `url(${Backgroundimg})`,
      }}
    >
      {/* Dark overlay */}
      <div className="flex min-h-[100svh] w-full items-center bg-black/60 lg:min-h-screen">
        {/* Main container */}
        <div
          className="
            mx-auto grid w-full
            max-w-[1800px]
            grid-cols-1
            items-center
            gap-8
            px-5 py-16
            sm:px-8
            md:px-12 md:py-20
            lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]
            lg:gap-12
            lg:px-16
            xl:gap-16
            xl:px-20
            2xl:px-24
            min-[1800px]:px-28
          "
        >
          {/* Heading */}
          <div className="flex min-w-0 flex-col justify-center text-left">
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              className="
                max-w-full
                break-words
                font-counture
                text-[clamp(2rem,5vw,6rem)]
                font-normal
                uppercase
                leading-[0.95]
                tracking-[-0.02em]
                text-white
              "
            >
              {Heading}
            </motion.h2>
          </div>

          {/* Subtext */}
          <div
            className="
              flex min-w-0 flex-col justify-center text-left
              border-t border-white/40
              pt-7
              lg:border-l-2
              lg:border-t-0
              lg:py-4
              lg:pl-10
              xl:pl-14
              2xl:pl-16
            "
          >
            <motion.p
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              className="
                max-w-[850px]
                whitespace-pre-line
                break-words
                font-unageo-medium
                text-[clamp(0.95rem,1.25vw,1.6rem)]
                leading-[1.45]
                text-white/95
              "
            >
              {Subtext}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}