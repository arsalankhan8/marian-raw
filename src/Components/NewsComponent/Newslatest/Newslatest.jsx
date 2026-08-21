import React from "react";

export default function Newslatest({ img, title, description, slug }) {
  return (
    <div>
      <div className="flex gap-2">
        <div className="w-fit overflow-hidden">
          <img
            src={img}
            alt="img"
            className="w-[172px] h-[120px] xl:h-[120px] 3xl:w-[195px] 3xl:h-[163px] object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <h4 className="font-unageo-bold leading-[94%] text-[14px] md:text-[16px] lg:text-[18px] xl:text-[23px] 3xl:text-[31px] capitalize">
            {title}
          </h4>
          <p className="font-unageo text-[12px] lg:text-[14px] 3xl:text-[17px] leading-[132%] capitalize">
            {description}
          </p>
          <button className="font-unageo-bold text-[14px] 3xl:text-[21px] capitalize underline w-fit">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
