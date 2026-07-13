import React from "react";
import Portfolioheading from "../Headings/Portfolioheading/Portfolioheading";
import { motion } from "framer-motion";

export default function Portfoliolisting({ datas }) {
  // For now we’ll just take the first project in the array
  //const project = datas[0]

  return (
    <div className="pt-[20px]">
      <div className="flex flex-wrap md:flex-nowrap gap-12 pt-[30px] border-t-[1px] mt-[30px]">
        {/* LEFT COLUMN (Sticky) */}
        <div className="flex flex-col gap-5 3xl:gap-10 md:w-[40%] md:sticky top-[20px] self-start h-fit">
          <Portfolioheading heading="Location" subtext={datas.location} />
          <Portfolioheading heading="Architect" subtext={datas.architect} />
          <Portfolioheading heading="Contractor" subtext={datas.contractor} />

          <p className="font-unageo-medium text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px] leading-[100%] whitespace-pre-line">
            {datas.description}
          </p>
        </div>

        {/* RIGHT COLUMN (Scrollable Images) */}
        <motion.div
          initial={{ opacity: 0, y: 200 }} // start slightly below + hidden
          whileInView={{ opacity: 1, y: 0 }} // animate upward into place
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }} // trigger once when ~30% is in view
          className="flex flex-col md:w-[60%] md:border-l-[1px] md:pl-[30px] "
        >
          {datas.images.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`portfolio-img-${index}`}
              className="w-full h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] 3xl:h-[800px] mt-[15px]"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
