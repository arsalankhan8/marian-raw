import React, { useState, useRef, useEffect } from "react";
import img1 from "../../../assets/small.png";
import iconimg from "../../../assets/icon1.png";
import iconimg2 from "../../../assets/metha.webp";
import iconimg3 from "../../../assets/innovations.webp";
import iconimg4 from "../../../assets/excellences.webp";
import iconimg5 from "../../../assets/precisions.webp";

const steps = [
  {
    title: "Vision",
    content:
      " We see the finished form before the first cut.",
    icon: iconimg,
  },
  {
    title: "Methodology",
    content: "A quiet rhythm of steps that brings order to metal.",
    icon: iconimg2,
  },
  {
    title: "Innovation",
    content: "New ideas, shaped to serve with purpose.",
    icon: iconimg3,
  },
  {
    title: "Excellence",
    content: "A refined finish that speaks softly and endures.",
    icon: iconimg4,
  },
  {
    title: "Precision",
    content: "Every edge true, every fit exact.",
    icon: iconimg5,
  },
];

export default function Stepssection() {
  const [activeStep, setActiveStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef(null);
  const autoplayRef = useRef(null);

  useEffect(() => {
    // Cleanup timers
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  // --- AUTOPLAY EVERY 6 SECONDS ---
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setVisible(false);
      timeoutRef.current = setTimeout(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
        setVisible(true);
      }, 300);
    }, 6000);

    return () => clearInterval(autoplayRef.current);
  }, []);

  const handleStepClick = (index) => {
    if (index === activeStep) return;
    setVisible(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setActiveStep(index);
      setVisible(true);
    }, 300);
  };

  return (
    <div className="max-w-[90vw] w-full mx-auto pt-[70px]">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="font-unageo text-[18px] md:text-[24px]">Legacy Meets Innovation</p>
          <img src={img1} alt="img" className="w-[35px] h-[56px] md:w-[55px] md:h-[76px] mt-[-15px]" />
        </div>

        <div
          className={`flex flex-col items-center justify-center gap-8 py-[50px] md:py-[120px] transform transition-all duration-300 ease-in-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <img src={steps[activeStep].icon} alt="img" className="h-[70px] w-[70px] md:h-[138px] md:w-[138px]" />
          <p className="uppercase font-unageo-semibold text-[40px] md:text-[80px] 2xl:text-[120px] leading-[120px] 3xl:text-[180px] text-[#00688F]">
            {steps[activeStep].title}
          </p>
          <p className="font-unageo capitalize text-[16px] md:text-[20px] 3xl:text-[24px] leading-[112%] w-[50%] text-center">
            {steps[activeStep].content}
          </p>
        </div>
      </div>

      <div className="relative mt-12">
        <div className="absolute top-[30px] md:top-[40px] left-0 right-0 h-[2px] bg-[#6ba6b4] z-0"></div>

        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <p className="mb-2 font-unageo leading-[110%] text-[12px] md:text-[20px]">
                {step.title}
              </p>

              <div
                onClick={() => handleStepClick(index)}
                className={`relative w-4 h-4 md:w-5 md:h-5 rounded-full mx-auto cursor-pointer transition-all duration-300 ${
                  activeStep === index ? "bg-[#006f8e]" : "bg-[#939598]"
                }`}
              >
                {activeStep === index && (
                  <span
                    className="absolute inset-0 rounded-full border-4 border-[#7dd3fc]"
                    style={{
                      animation: "pulseBorder 1.5s infinite",
                    }}
                  ></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
