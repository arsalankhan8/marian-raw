import React from 'react'
import { motion } from 'framer-motion' 
import Justifyheading from '../../Headings/Justifyheading/Justifyheading'
import USHomeslidernew from '../../Sliders/Homeslidernew/USHomeslidernew'

export default function Herosection3() {
  return (
    <div className='px-4 md:px-10 lg:px-20 py-10 bg-[#00688F1A] rounded-4xl'>
      {/* New Headings Section */}
      <div className="flex flex-col pb-[40px] md:w-[100%] lg:w-[100%] gap-2 items-center">
        
        {/* H1: Precision in Practice */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F] font-counture text-center md:text-left leading-[84%] uppercase"
        >
          Precision in Practice
        </motion.h2>

        {/* H2: Featured Projects */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] text-[#00688F] font-unageo-medium capitalize text-center md:text-left"
        >
          Featured Projects
        </motion.p>

        {/* Sub-heading / Body Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-4 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px] text-black text-center font-unageo md:text-left leading-[112%] max-w-[800px]"
        >
          <p>
            A showcase of technically complex projects<br className='md:hidden '/>executed with clarity and control.
          </p>
        </motion.div>
      </div>

      {/* Slider Section */}
      <div className='mt-[20px]'>
        <USHomeslidernew />
      </div>
    </div>
  )
}
