import React, { useEffect, useState, useRef } from "react";
import Centerheading from "../../Headings/Centerheading/Centerheading";
import Maps from "../Map/Map";
import DynamicMaps from "../Map/Dynamicmaps/Dynamicmaps";
import Newmap from "../Map/Newmap/Newmap";

function Counter({ end, duration = 2000, trigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return; // only run when triggered

    let start = 0;
    const increment = end / (duration / 16);
    let frame;

    const updateCounter = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    frame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, trigger]);

  return <span>{count}</span>;
}

export default function Mapsection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // trigger only once
        }
      },
      { threshold: 0.3 } // 30% of section visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-[70px] hidden md:block">
          <Centerheading heading="OUR PRESENCE" subtext="Shaping architectural visions across the US, North America, and Europe." headingcss="font-unageo-semibold mt-[-25px] text-[30px] md:text-[70px] xl:text-[84px] leading-[91px]" subtextcss="font-unageo text-[16px]"/>
{/*<Maps/> 
<DynamicMaps/>*/}
<Newmap/>
  {/*}  <div ref={sectionRef}>



      <div className="bg-transparent flex justify-center mt-[70px]">
        <div className="max-w-[90vw] w-full flex justify-evenly gap-[50px]">
          <div className="flex flex-col justify-center items-center">
            <p className="text-[25px] md:text-[75px] xl:text-[130px] text-[#00688F] font-unageo-extrabold">
              <Counter end={40} trigger={visible} />+
            </p>
            <p className=" text-[20px] md:text-[25px] xl:text-[30px] xl:mt-[-30px] font-unageo">Years</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-[25px] md:text-[75px] xl:text-[130px] text-[#00688F] font-unageo-extrabold">
              <Counter end={25} trigger={visible} />+
            </p>
            <p className=" text-[20px] md:text-[25px] xl:text-[30px] xl:mt-[-30px] font-unageo">Countries</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-[25px] md:text-[75px] xl:text-[130px] text-[#00688F] font-unageo-extrabold">
              <Counter end={1000} trigger={visible} />+
            </p>
            <p className=" text-[20px] md:text-[25px] xl:text-[30px] xl:mt-[-30px] font-unageo">Projects</p>
          </div>
        </div>
      </div>
    </div>
    */}
    </div>
  );
}
