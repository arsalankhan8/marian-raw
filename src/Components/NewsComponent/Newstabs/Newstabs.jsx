import React, { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

export default function Newstabs({ blogdata }) {
  const [activeTab, setActiveTab] = useState(1)

  // Filter blogs by category
  const filteredBlogs = blogdata.filter((value) =>
    activeTab === 1
      ? value.category === 'innovation'
      : value.category === 'thought'
  )

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  }

  return (
    <div className="w-full min-w-0">
      {/* Tabs */}
      <div className="mt-[20px] grid w-full grid-cols-2">
        <p
          onClick={() => setActiveTab(1)}
          className={`flex min-w-0 cursor-pointer items-center justify-center px-3 py-[15px] text-center font-unageo-bold text-[13px] leading-[132%] capitalize md:px-5 md:text-[11px] xl:text-[16px] 4k:text-[24px] ${
            activeTab === 1
              ? 'text-black bg-[#D9D9D9]'
              : 'text-[#BFBFBF] bg-white'
          }`}
        >
          Innovation & Tech
        </p>

        <p
          onClick={() => setActiveTab(2)}
          className={`flex min-w-0 cursor-pointer items-center justify-center px-3 py-[15px] text-center font-unageo-bold text-[13px] leading-[132%] capitalize md:px-5 md:text-[11px] xl:text-[16px] 4k:text-[24px] ${
            activeTab === 2
              ? 'text-black bg-[#D9D9D9]'
              : 'text-[#BFBFBF] bg-white'
          }`}
        >
          Thought leadership
        </p>
      </div>

      {/* Animated Content */}
      <div className="relative py-[40px] px-[15px] md:px-[30px] bg-[#D9D9D9]">
        <AnimatePresence mode="wait">
          <Motion.div
            key={activeTab} // triggers animation on tab switch
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-6"
          >
            {filteredBlogs.map((value, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <h4 className="font-unageo-bold text-[16px] md:text-[18px] lg:text-[21px] capitalize leading-[94%] 4k:text-[31px]">
                  {value.title}
                </h4>
                <p className="font-unageo text-[12px] capitalize 4k:text-[17px]">
                  {value.description}
                </p>
                <button className="font-unageo-bold text-[16px] xl:text-[17px] leading-[132%] 4k:text-[21px] capitalize underline w-fit text-[#00688F]">
                  Read More
                </button>
              </div>
            ))}
          </Motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
