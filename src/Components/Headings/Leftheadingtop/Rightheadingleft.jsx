import React from "react";

export default function Rightheadingleft({ heading, subtext }) {
  return (
    <div className="max-w-[90vw] w-full mx-auto pt-[70px] 3xl:pt-[180px]">
      <div className="flex pb-[25px] jus md:w-[87%]">
        <span className=" text-center md:text-left text-[30px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F] font-counture leading-[100%] md:leading-[84%] uppercase">
          {heading}
        </span>
      </div>
      <div className="flex pb-[25px] md:w-[60%] md:pt-[10px] xl:pt-[15px] 2xl:pt-[25px]">
        <span className="text-[14px] lg:text-[15px] 3xl:text-[24px] text-black font-unageo text-left leading-[112%]">
          {subtext}
        </span>
      </div>
    </div>
  );
}
