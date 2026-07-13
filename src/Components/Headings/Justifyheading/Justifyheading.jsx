import React from 'react'
import { motion } from 'framer-motion'

export default function Justifyheading({ heading, subtext }) {
  return (
    <motion.div
      className='flex justify-center '
      initial={{ opacity: 0, y: 50 }}    // hidden at first
      whileInView={{ opacity: 1, y: 0 }} // animate when in view
      viewport={{ once: true, amount: 0.3 }} // only once, trigger when 30% visible
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className='max-w-[90vw] w-full'>
        <div className='flex flex-wrap justify-between gap-[90px]'>
          <div className='flex w-[47%]'>
            <p className='font-bold text-[40px] xl:text-[80px] leading-[40px] md:leading-[50px] xl:leading-[84px] text-[#00688F] uppercase font-counture'>
              {heading}
            </p>
          </div>
          <div className='flex items-end w-[99%] xl:w-[43%]'>
            <p className='text-[16px] font-bold font-unageo-bold'>
              {subtext}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
