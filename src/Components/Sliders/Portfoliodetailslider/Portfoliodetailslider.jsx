import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";

export default function Portfoliodetailslider({ datas }) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2 }, // 2 slides on laptop/desktop
          1024: { slidesPerView: 3 }, // 2 slides on laptop/desktop
          1440: { slidesPerView: 3 }, // 3 slides on large screens
        }}
        className="portfolio-slider"
      >
        {datas.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/portfoliodetails/${item.slug}`}>
            <div className="flex flex-col gap-4 ">
              <img
                src={item.detailimage}
                alt={item.title}
                className="w-[428px] xl:w-[370px] 2xl:w-[428px]  3xl:w-[528px] h-[370px] md:h-[379px] xl:h-[419px] 2xl:h-[559px] 3xl:h-[729px]"
              />
              <p className="font-unageo-medium text-[16px] md:text-[18px] lg:text-[22px] xl:text-[27px] 3xl:text-[48px] leading-[100%]">
                {item.title}
              </p>
            </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
