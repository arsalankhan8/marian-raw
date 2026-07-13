import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import sliderimg1 from "../../../assets/sliderimg1.webp";
import sliderimg2 from "../../../assets/sliderimg2.webp";
import sliderimg3 from "../../../assets/sliderimg3.webp";
import sliderimg4 from "../../../assets/sliderimg4.webp";
import sliderimg5 from "../../../assets/sliderimg5.webp";
import sliderimg6 from "../../../assets/sliderimg6.webp";


export default function HomeSlider1() {
  const slides = [
    { id: 1, img: sliderimg1, text: "Methodology" },
    { id: 2, img: sliderimg2, text: "Vision" },
    { id: 3, img: sliderimg3, text: "Innovation" },
    { id: 4, img: sliderimg5, text: "Excellence" },
    { id: 5, img: sliderimg6, text: "Precision" },


  ];

  return (
    <div className="w-full mt-[50px]">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000} // controls smoothness of continuous scroll
        slidesPerView={1} // default for mobile
        breakpoints={{
          768: { slidesPerView: 2 }, // tablets
          1024: { slidesPerView: 3 }, // desktop
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className=" h-[490px] flex items-end rounded-[20px] bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="w-[1px] h-[40px] bg-white ml-[25px] mb-4 mr-1"></div>
              <p className="font-medium text-[47px] text-white px-1 font-unageo-medium tracking-[-0.03%]">
  {slide.text}
</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
