import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    <div>
      {/* Tabs */}
      <div className="flex justify-between mt-[20px]">
        <p
          onClick={() => setActiveTab(1)}
          className={`font-unageo-bold whitespace-nowrap text-[13px] md:text-[11px] xl:text-[16px] 3xl:text-[24px] px-[25px] py-[15px] leading-[132%] capitalize cursor-pointer ${
            activeTab === 1
              ? 'text-black bg-[#D9D9D9]'
              : 'text-[#BFBFBF] bg-white'
          }`}
        >
          Innovation & Tech
        </p>

        <p
          onClick={() => setActiveTab(2)}
          className={`font-unageo-bold whitespace-nowrap text-[13px] md:text-[11px] xl:text-[16px] 3xl:text-[24px] px-[25px] py-[15px] leading-[132%] capitalize cursor-pointer ${
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
          <motion.div
            key={activeTab} // triggers animation on tab switch
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-6"
          >
            {filteredBlogs.map((value, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <p className="font-unageo-bold text-[16px] md:text-[18px] lg:text-[21px] capitalize leading-[94%] 3xl:text-[31px]">
                  {value.title}
                </p>
                <p className="font-unageo text-[12px] capitalize 3xl:text-[17px]">
                  {value.description}
                </p>
                <button className="font-unageo-bold text-[16px] xl:text-[17px] leading-[132%] 3xl:text-[21px] capitalize underline w-fit text-[#00688F]">
                  Read More
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
