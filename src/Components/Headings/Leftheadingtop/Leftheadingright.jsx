import React from "react";

export default function Leftheadingright({ heading, subtext }) {
  return (
    <div className="max-w-[90vw] w-full mx-auto ">
      <div className="flex justify-center md:justify-start pb-[15px] w-full md:w-[87%]">
        <span className="text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F] font-counture leading-[84%] uppercase">
          {heading}
        </span>
      </div>
      <div className="flex justify-center md:justify-start pb-[25px] w-full md:w-[70%] pt-[20px] md:pt-[10px]">
        <span className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px] text-center text-black font-unageo md:text-left leading-[112%]">
          {subtext}
        </span>
      </div>
    </div>
  );
}
