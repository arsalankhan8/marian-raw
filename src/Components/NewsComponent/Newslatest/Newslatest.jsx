import React from "react";

export default function Newslatest({ img, title, description }) {
  return (
    <article className="w-full min-w-0">
      <div className="grid w-full min-w-0 grid-cols-[112px_minmax(0,1fr)] items-stretch gap-3 sm:grid-cols-[172px_minmax(0,1fr)] lg:grid-cols-[120px_minmax(0,1fr)] xl:grid-cols-[150px_minmax(0,1fr)] 2xl:grid-cols-[172px_minmax(0,1fr)] 3xl:grid-cols-[195px_minmax(0,1fr)]">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={img}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="flex min-w-0 flex-col items-start justify-between gap-2 text-left">
          <h4 className="break-words font-unageo-bold text-[14px] leading-[1.08] capitalize md:text-[16px] lg:text-[18px] xl:text-[23px] 4k:text-[31px]">
            {title}
          </h4>
          <p className="break-words font-unageo text-[12px] leading-[132%] capitalize lg:text-[14px] 4k:text-[17px]">
            {description}
          </p>
          <button className="w-fit font-unageo-bold text-[14px] capitalize underline 4k:text-[21px]">
            Read More
          </button>
        </div>
      </div>
    </article>
  );
}
