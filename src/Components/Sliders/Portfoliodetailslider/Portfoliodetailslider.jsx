import React from "react";
import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";

import {
  Link,
  useLocation,
} from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Portfoliodetailslider({
  datas = [],
}) {
  const location = useLocation();

  const regionPath = location.pathname
    .toLowerCase()
    .startsWith("/us")
    ? "/US"
    : "/canada";

  if (!Array.isArray(datas) || datas.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-[1320px]">
      <Swiper
        modules={[
          Pagination,
          Autoplay,
          Navigation,
        ]}
        spaceBetween={16}
        slidesPerView={1.08}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={700}
        watchOverflow
        breakpoints={{
          640: {
            slidesPerView: 1.5,
            spaceBetween: 18,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1100: {
            slidesPerView: 3,
            spaceBetween: 24,
          },

          1440: {
            slidesPerView: 3,
            spaceBetween: 28,
          },
        }}
        className="portfolio-details-slider !pb-12"
      >
        {datas.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              to={`${regionPath}/portfolio/${item.slug}`}
              className="group block"
            >
              <article className="overflow-hidden rounded-[18px] border border-[#E0E4E6] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#00688F]/40 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
                {/* Controlled image size */}
                <div className="relative h-[260px] overflow-hidden bg-[#ECEFF0] sm:h-[290px] md:h-[320px] lg:h-[340px] xl:h-[360px]">
                  <img
                    src={item.detailimage}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Card content */}
                <div className="flex min-h-[88px] items-center justify-between gap-5 px-5 py-5">
                  <h3 className="font-unageo-medium text-[17px] leading-[1.25] text-[#111315] transition-colors duration-300 group-hover:text-[#00688F] md:text-[19px] xl:text-[21px]">
                    {item.title}
                  </h3>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CDD3D6] text-[#00688F] transition-all duration-300 group-hover:border-[#00688F] group-hover:bg-[#00688F] group-hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m14 7 5 5-5 5" />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}