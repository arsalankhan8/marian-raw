import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Leftheadingright from "../../Components/Headings/Leftheadingtop/Leftheadingright";
import Header from "../../Components/Header/Header";
import imgs from "../../assets/sliderbanner/be.webp";
import imgs2 from "../../assets/sliderbanner/legacy-banner.png";
import Centerheading from "../../Components/Headings/Centerheading/Centerheading";
import Stickysection from "../../Components/Legacycomponents/Stickysection/Stickysection";
import sectioimg1 from "../../assets/philosophy.webp";
import sectioimg2 from "../../assets/methodology.webp";
import sectioimg3 from "../../assets/vision.webp";
import sectioimg4 from "../../assets/innovation.webp";
import sectioimg5 from "../../assets/excellance.webp";
import sectioimg6 from "../../assets/precision.webp";
import Legacyslider from "../../Components/Sliders/Legacyslider/Legacyslider";
import Faqsection from "../../Components/Legacycomponents/Faqsection/Faqsection";
import Lastsection from "../../Components/Legacycomponents/Lastsection/Lastsection";
import Footers from "../../Components/Footers/Footers";
import Legacysliderv2 from "../../Components/Sliders/Legacyslider/Legacysliderv2";
import MobileHeader from "../../Components/Header/MobileHeader";
import MobileFooters from "../../Components/Footers/MobileFooters";
import Legacysliderv3 from "../../Components/Sliders/Legacyslider/LegacySliderv3";
import Pillar from "../../assets/home/Pillar.jpg";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";
import Leftheadingtop from "../../Components/Headings/Leftheadingtop/Leftheadingtop";
import {
  getSelectedRegion,
} from "../../utils/regionPaths";
import { REGIONS } from "../../constants/regions";

export default function Legacypage({
  bannerImage,
  showFaqSection = true,
}) {
  const region = getSelectedRegion();

  const items = [
    {
      id: 0,
      image: Pillar,
      Heading: <>The Pillars of <br /> Our Legacy</>,
      Subtext: `Our legacy is guided by six defining pillars:\n Philosophy, Methodology, Vision, Innovation, Excellence, and Precision. Together, they shape how we think, build, collaborate, and deliver. These principles influence every stage of our work - from early coordination and fabrication to the final execution of complex architectural and structural projects.`,
    },
    {
      id: 1,
      image: sectioimg1,
      Heading: `Philosophy`,
      Subtext: `The task of turning inspired design into a reality usually involves tackling numerous practical and theoretical challenges. At Mariani, our philosophy is drawn from a deep well of knowledge gained from years of success in overcoming each unique challenge. Every project is an opportunity to refine our approach, ensuring that no detail is overlooked, and that innovation thrives through each obstacle we face. This philosophy has led architects and designers to choose Mariani as a trusted partner for their most ambitious visions, knowing we will turn their ideas into reality with passion and precision.`,
    },
    {
      id: 2,
      image: sectioimg2,
      Heading: `Methodology`,
      Subtext: `Our methodology is a blend of comprehension and action. Aspiring to integrate function with aesthetics, we approach every project with a multi-dimensional mindset, ensuring that the design is not only beautiful but also practical and sustainable. At the heart of this methodology is our commitment to precision, innovation, and excellence. By embracing this methodology, we apply leadership and collaboration to ensure that the design vision is executed flawlessly. We believe that making a design real requires a shared commitment to making it happen, driven by the meticulous application of every detail.`,
    },
    {
      id: 3,
      image: sectioimg3,
      Heading: `Vision`,
      Subtext: `Our vision is to transform ordinary buildings into iconic structures that stand the test of time. Every building we create is not just a structure, but a statement—one that embodies creativity, functionality, and inspiration. As design evolves into reality, Mariani brings vision to life, ensuring that every challenge is met with creative solutions. We navigate every phase of a project, from conceptual design to final construction, ensuring that it meets the highest standards while keeping within budget and schedule. Our vision allows us to tackle complex challenges while providing our clients with unwavering support and expertise throughout the life cycle of a project.`,
    },
    {
      id: 4,
      image: sectioimg4,
      Heading: `Innovation`,
      Subtext: `At Mariani, innovation is the foundation of our work. Our dedication to fulfilling the vision of architects and designers is backed by continuous research and development (R&D). This ensures that each design concept stays true to the architect’s intentions while pushing boundaries with new techniques and materials. We continuously refine our processes, embracing new technologies to stay ahead of industry trends and maintain our reputation for high-quality design and production standards. By pioneering new methods and staying at the forefront of technology, we have established Mariani as a trusted leader in architectural innovation, setting new benchmarks in the industry.`,
    },
    {
      id: 5,
      image: sectioimg5,
      Heading: `Excellence`,
      Subtext: `Excellence is at the core of everything we do. Mariani's commitment to excellence goes beyond meeting industry standards; it’s about delivering exceptional solutions that exceed expectations. Every project is an opportunity for us to find creative solutions, balancing cost, functionality, aesthetics, and sustainability. We go beyond the exceptional by delivering results that reflect our passion and dedication to design. Customized planning and precise execution ensure that our projects are completed on time and within budget. Our reputation for excellence is built on years of successful projects that have consistently pushed the limits of architectural design.`,
    },
    {
      id: 6,
      image: sectioimg6,
      Heading: `Precision`,
      Subtext: `Precision is essential in every aspect of Mariani’s work. We rely on advanced technologies, such as CATIA imaging, to achieve meticulous accuracy in every project. This commitment to precision ensures that every detail is executed with the highest quality standards. We understand that complex geometry and intricate designs require advanced tools and a keen eye for detail, and we use cutting-edge engineering technologies to bring these designs to life. Whether it’s a monumental structure or a small design detail, our pursuit of precision ensures that the final result is a perfect reflection of the architect's vision and Mariani’s commitment to excellence.`,
    },
  ];

  // Animation trigger
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentImg, setCurrentImg] = useState(
    window.innerWidth >= 1920 ? imgs2 : imgs2,
  );

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth >= 1920) {
        setCurrentImg(imgs2);
      } else {
        setCurrentImg(imgs2);
      }
    };

    // Run once on mount
    updateImage();

    // Listen to window resize
    window.addEventListener("resize", updateImage);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateImage);
  }, [imgs2, imgs2]);

  return (
    <div>
      <Header />
      <MobileHeader />
      <>
        <div className="max-w-[90vw] w-full mx-auto pt-[30px] md:pt-[40px] 2xl:pt-[50px] 3xl:pt-[70px]">
          <motion.p
            initial={{ opacity: 0, y: 100 }} // start slightly below + hidden
            whileInView={{ opacity: 1, y: 0 }} // animate upward into place
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="flex pb-[10px] w-[87%]">
              <span className="text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F] font-counture text-left leading-[84%] uppercase">
                The Legacy of Mariani
              </span>
            </div>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 100 }} // start slightly below + hidden
            whileInView={{ opacity: 1, y: 0 }} // animate upward into place
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p className="text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] pl-[4px] md:pl-0 text-[#00688F] font-unageo-medium capitalize text-left ">
              Defined by Detail, Led by Innovation
            </p>
            <div className="flex pb-[25px] md:w-[70%] pt-[10px] ">
              <span className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px] text-black font-unageo text-left pl-[6px] md:pl-0 leading-[112%]">
                <>
                  For over four decades, Mariani Metal has been at the forefront
                  of architectural innovation. Our legacy is built on a
                  commitment to excellence in craftsmanship and a passion for
                  pushing boundaries in design. From the very first project to
                  the iconic structures we build today, every element is crafted
                  with meticulous attention to detail, using the latest in
                  cutting-edge technology and sustainable practices.
                </>
              </span>
            </div>
          </motion.p>
        </div>
      </>

      {/* Animated Section */}
      <div ref={ref}>

<motion.img
  src={bannerImage}
  alt="The Legacy of Mariani"
  initial={{ opacity: 0, y: 100, scale: 0.95 }}
  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
  transition={{ duration: 1, ease: "easeOut" }}
  className="w-full h-[55vh] 3xl:h-[55vh] mt-[10px] object-cover px-5"
/>
      </div>

      <div className="mt-[10px] md:mt-[70px] mb-[50px] flex justify-start items-start px-6 lg:px-20">

        <Leftheadingtop
          heading={
            <>
              A Tradition of <br className="hidden md:block" /> Craftsmanship and Innovation
            </>
          }
          subtext={
            <>
              At Mariani, our legacy is not just defined by the buildings we
              create, but by the values that guide us. Over the years, we have
              built a reputation for pushing the limits of design and technology
              in metal and glass fabrication. From pioneering new techniques to
              crafting monumental works, Mariani’s work reflects our commitment
              to both craftsmanship and sustainability. Our journey has been one
              of continuous evolution, and we remain committed to staying at the
              cutting edge of architectural design, engineering, and
              fabrication.
            </>
          }
        />
      </div>


      <div className="relative">
        {items.map((value, index) => (
          <Stickysection
            key={index}
            Backgroundimg={value.image}
            Heading={value.Heading}
            Subtext={value.Subtext}
            isLast={index === items.length - 1}
            index={index}
            totalItems={items.length}
          />
        ))}
      </div>

      <div>
     
{showFaqSection && <Faqsection />}
        <Lastsection />
        <ScrollToTop />
        <Footers />
        <MobileFooters />
      </div>
    </div>
  );
}
