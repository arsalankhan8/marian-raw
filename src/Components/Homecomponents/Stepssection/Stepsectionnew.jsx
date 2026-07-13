import { motion } from "framer-motion";

// Professional Tip: Use an object for variants to keep the JSX clean
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay },
  }),
};

export default function StepSectionNew() {
  return (
    <section className="w-full bg-white py-12 md:py-20 lg:py-32">
      <div className="max-w-[1440px] px-6 lg:px-12 mx-auto">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Branding & Headings */}
          <div className="flex flex-col justify-center gap-3 h-full">
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={0}
              viewport={{ once: true }}
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-[#00688F] font-counture leading-[1.1] uppercase tracking-tight"
            >
              Comprehensive Fabrication
              <br className="hidden md:block" /> & Architectural Solutions
            </motion.h1>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={0.2}
              viewport={{ once: true }}
              className="text-sm md:text-xl xl:text-2xl text-[#00688F] font-unageo-medium leading-[112%] opacity-90"
            >
              From concept detailing to final installation, Mariani is your
              full-service partner in precision metal and glass systems.
            </motion.h2>
          </div>

          {/* RIGHT COLUMN: Narrative Body Text */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            custom={0.4}
            viewport={{ once: true }}
            className="flex flex-col gap-6 text-base md:text-lg text-gray-800 font-unageo-medium leading-[112%]"
          >
            <p className="border-l-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px] border-[#00688F] pl-6 py-2">
              At Mariani, we design, engineer, fabricate, and install
              high-quality custom metal and glass systems for complex
              architectural and civil projects. From public infrastructure and
              institutional developments to commercial buildings and specialty
              amenities, we deliver solutions that are structurally sound and 
              built for long-term performance.<br/><br/>
              Our work stands at the intersection of craftsmanship and
              engineering — translating detailed drawings into durable,
              code-compliant environments.
            </p>
            {/* <p className="border-l-2 border-[#00688F] pl-6 py-2">
              Our work stands at the intersection of craftsmanship and
              engineering — translating detailed drawings into durable,
              code-compliant environments.
            </p> */}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}