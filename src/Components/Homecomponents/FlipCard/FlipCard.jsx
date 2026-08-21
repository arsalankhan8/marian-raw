import { useState } from 'react';
import { motion } from 'framer-motion';
import StructuralMetal from "../../../assets/Expertise/StructuralMetal.webp";
import ArchitecturalGlass from "../../../assets/Expertise/ArchitecturalGlass.webp";
import IntegratedDesign from "../../../assets/Expertise/IntegratedDesign.webp";

import StructuralMetalUS from "../../../assets/Expertise/StructuralMetal-US.jpg";
import ArchitecturalGlassUS from "../../../assets/Expertise/ArchitecturalGlass-US.jpg";
import IntegratedDesignUS from "../../../assets/Expertise/IntegratedDesign-US.jpg";

import { getSelectedRegion } from '../../../utils/regionPaths';
import { REGIONS } from '../../../constants/regions';

// Shatter Overlay Component
const ShatterOverlay = ({ isHovered }) => {
  const shards = Array.from({ length: 16 });
  return (
    <div className="absolute inset-0 z-30 grid grid-cols-4 grid-rows-4 pointer-events-none">
      {shards.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 1, rotate: 0 }}
          animate={isHovered ? {
            opacity: 0,
            scale: 2,
            rotate: i % 2 === 0 ? 30 : -30,
            y: i < 8 ? -150 : 150,
            transition: { delay: i * 0.07, duration: 0.8, ease: "easeOut" }
          } : { opacity: 1, scale: 1, rotate: 0, y: 0 }}
          className="bg-gray-600/90 border-[0.5px] border-white/10 backdrop-blur-sm"
        />
      ))}
    </div>
  );
};

const FlipCard = () => {
  const region = getSelectedRegion();
  const cardData = [
    {
      id: 1,
      heading: "Structural Metal Fabrication",
      bodyCopy: "Custom steel and aluminum systems fabricated to exact tolerances.",
      bullets: [
        "Structural steel assemblies",
        "Railings, stairs, and guard systems",
        "Feature architectural metal",
        "Custom brackets & connection systems",
        "Stainless & specialty metals"
      ],
      image: region === REGIONS.US ? StructuralMetalUS : StructuralMetal
    },
    {
      id: 2,
      heading: "Architectural Glass Systems",
      bodyCopy: "Integrated glazing solutions engineered for safety and visual clarity.",
      bullets: [
        "Glass railings & partitions",
        "Structural glazing supports",
        "Custom glass assemblies",
        "Exterior façade integrations",
        "Interior architectural glazing"
      ],
      image: region === REGIONS.US ? ArchitecturalGlassUS : ArchitecturalGlass
    },
    {
      id: 3,
      heading: "Integrated Design & Installation",
      bodyCopy: "We don’t just fabricate - we deliver complete build-ready solutions.",
      bullets: [
        "Shop drawings & engineering coordination",
        "CNC & precision fabrication",
        "Field measurement & site coordination",
        "Turnkey installation"
      ],
      image: region === REGIONS.US ? IntegratedDesignUS : IntegratedDesign
    }
  ];

  // Track which card is currently active/shattered
  const [activeCardId, setActiveCardId] = useState(null);
  const handleCardClick = (id) => {
    // If clicking the already active card, close it. Otherwise, open the new one.
    setActiveCardId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-20 px-6 flex flex-col items-center overflow-hidden bg-[#00688F1A] rounded-4xl ">

      {/* HEADING SECTION */}
      <div className="flex flex-col pb-[60px] w-full md:w-[75%] lg:w-[65%] gap-2 items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F] font-counture text-center md:text-left leading-[84%] uppercase"
        >
          CORE EXPERTISE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px] 2xl:text-[28px] 3xl:text-[66px] text-[#00688F] font-unageo-medium capitalize text-center"
        >
          Engineered systems built for performance, longevity, and architectural integrity.
        </motion.p>
      </div>

      {/* CARDS GRID */}
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
        {cardData.map((card) => {
          // Determine if this specific card is active
          const isActive = activeCardId === card.id;

          return (
            <div
              key={card.id}
              // Switch to onClick for mobile reliability
              onClick={() => handleCardClick(card.id)}
              // Keep hover for desktop users
              onMouseEnter={() => setActiveCardId(card.id)}
              onMouseLeave={() => setActiveCardId(null)}
              className="group h-[420px] w-full max-w-[350px] cursor-pointer relative overflow-hidden rounded-xl"
            >
              <div className="relative h-full w-full">

                {/* FRONT SIDE (Base Layer) */}
                <div className="absolute inset-0 flex flex-col justify-end overflow-hidden bg-slate-900 shadow-xl">
                  <div className="absolute inset-0 z-0">
                    <img
                      src={card.image}
                      alt={card.heading}
                      className={`h-full w-full object-cover opacity-50 transition-transform duration-700 ${isActive ? 'scale-110' : ''}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </div>
                  <div className="relative z-10 p-8 text-white font-counture">
                    <h3 className="text-xl md:text-2xl font-counture mb-3 uppercase tracking-tight">{card.heading}</h3>
                    <p className="text-sm font-unageo-medium text-slate-300 italic leading-4.5">{card.bodyCopy}</p>
                    <div className="mt-5 h-1.5 w-16 bg-[#00688F]" />
                  </div>
                </div>

                {/* BACK SIDE (Overlay Layer) */}
                <div className={`absolute inset-0 h-full w-full bg-[#2D3748] border-t-8 border-[#00688F] font-counture overflow-hidden transition-opacity duration-500 z-20 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

                  {/* Background Image for Back Side */}
                  <div className="absolute inset-0 z-0">
                    <img src={card.image} alt={`${card.heading} back`} className="h-full w-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-[#1a202c]/40" />
                  </div>

                  {/* Shatter Overlay */}
                  <ShatterOverlay isHovered={isActive} />

                  {/* Content Layer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative z-20 p-8 flex h-full flex-col justify-end leading-4.5"
                  >
                    <ul className="space-y-4">
                      {card.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start text-[14px] font-unageo-medium text-gray-100 uppercase tracking-wide drop-shadow-sm">
                          <span className="mr-3 text-[#00688F] font-black text-lg leading-none">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FlipCard;
