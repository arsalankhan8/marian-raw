import React from "react";
import { motion } from "framer-motion";
import logo1 from "../../../../assets/Certificates/C1.png";
import logo2 from "../../../../assets/Certificates/C2.png";
import logo3 from "../../../../assets/Certificates/C3.png";
import logo4 from "../../../../assets/Certificates/C4.png";
import logo5 from "../../../../assets/Certificates/C5.png";
import logo6 from "../../../../assets/Certificates/C6.png";
import logo7 from "../../../../assets/Certificates/C7.png";
import logo8 from "../../../../assets/Certificates/C8.png";



export default function Industrylist() {
  const certifications = [
    {
      image: logo1,
    },
    {
      image: logo2,
    },
    {
      image: logo3,
    },
    {
      image: logo4,
    },
    {
      image: logo5,
    },
    {
      image: logo6,
    },
    {
      image: logo7,
    },
    {
      image: logo8,
    },
    {
      image: logo1,
    },
    {
      image: logo2,
    },
    {
      image: logo3,
    },
    {
      image: logo4,
    },
    {
      image: logo5,
    },
    {
      image: logo6,
    },
    {
      image: logo7,
    },
    {
      image: logo8,
    },
  ];

  const loopingCertifications = [...certifications, ...certifications];

  return (
    <div className="bg-[#00688F] py-[70px]">
      <div className="flex max-w-[90vw] w-full mx-auto justify-center">
        <div className="w-full">
          <h2 className="font-counture text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-center w-full leading-[100%] text-white">
            Industry Certifications
          </h2>
        </div>
      </div>
      <div className="mt-[60px] md:mt-[60px] lg:mt-[70px] 2xl:mt-[120px] overflow-hidden">
        <motion.div
          className="flex w-max gap-6 md:gap-10 lg:gap-14"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 80,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {loopingCertifications.map((item, index) => (
            <div
              key={`${index}-${item.image}`}
              className="flex w-[220px] md:w-[320px] lg:w-[360px] flex-col items-center justify-center shrink-0"
            >
              <div className="h-[100px] md:h-[130px] lg:h-[170px] xl:h-[210px] 2xl:h-[230px] w-full flex items-center justify-center">
                <img
                  src={item.image}
                  alt="certification logo"
                  className="max-h-full max-w-[85%] object-contain"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
