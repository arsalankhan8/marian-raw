import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import img1 from '../../../assets/sus4.webp'
import img2 from '../../../assets/sus5.webp'
import img3 from '../../../assets/sus1.webp'

export default function Lastsection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  return (
    <div ref={ref} className="max-w-[90vw] w-full mx-auto mt-[70px]">
      {/* Heading Animation */}
      <motion.p
        className="font-counture text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-center md:text-left leading-[89%] uppercase text-[#00688F]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        CSR & Sustainability
      </motion.p>

      {/* Outer clip so animation doesn't overflow the viewport */}
      <div className="overflow-hidden pt-[50px] ">
        {/* Animate this single container (all three cards move together) */}
        <motion.div
          className="flex flex-wrap justify-center md:flex-nowrap gap-8 2xl:gap-14"
          initial={{ x: 150, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Card 1 */}
          <motion.div
            className="relative w-[480px] h-[350px] md:w-[270px] md:h-[262px] lg:w-[350px] lg:h-[342px] xl:w-[410px] xl:h-[402px] 2xl:w-[480px] 2xl:h-[472px] 3xl:w-[530px]  3xl:h-[522px] rounded-2xl overflow-hidden"
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{ rest: {}, hover: {} }}
          >
            {/* background layer (absolute) — ONLY this scales on hover */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${img1})` }}
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.08 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              aria-hidden
            />

            {/* Foreground content (gradient + text) — stays fixed size */}
            <div className="relative z-10 flex items-end w-full h-full bg-gradient-to-t from-black/50 to-black/0">
              <p className="font-unageo-semibold text-[16px]  md:text-[20px] lg:text-[24px] 3xl:text-[35px] leading-[112%] text-white px-[30px] py-[20px] capitalize">
                Education & Scholarships
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="relative w-[480px] h-[350px] md:w-[270px] md:h-[262px] lg:w-[350px] lg:h-[342px] xl:w-[410px] xl:h-[402px] 2xl:w-[480px] 2xl:h-[472px] 3xl:w-[530px]  3xl:h-[522px] rounded-2xl overflow-hidden"
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{ rest: {}, hover: {} }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${img2})` }}
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.08 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              aria-hidden
            />
            <div className="relative z-10 flex items-end w-full h-full bg-gradient-to-t from-black/50 to-black/0">
              <p className="font-unageo-semibold text-[16px]  md:text-[20px] lg:text-[24px] 3xl:text-[35px] leading-[112%] text-white px-[30px] py-[20px] capitalize">
                Community Engagement
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="relative w-[480px] h-[350px] md:w-[270px] md:h-[262px] lg:w-[350px] lg:h-[342px] xl:w-[410px] xl:h-[402px] 2xl:w-[480px] 2xl:h-[472px] 3xl:w-[530px]  3xl:h-[522px] rounded-2xl overflow-hidden"
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{ rest: {}, hover: {} }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${img3})` }}
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.08 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              aria-hidden
            />
            <div className="relative z-10 flex items-end w-full h-full bg-gradient-to-t from-black/50 to-black/0">
              <p className="font-unageo-semibold text-[16px]  md:text-[20px] lg:text-[24px] 3xl:text-[35px] leading-[112%] text-white px-[30px] py-[20px] capitalize">
                Commitment to Sustainability
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
