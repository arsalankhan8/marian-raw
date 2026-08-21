export default function Leftheadingtop({ heading, subtext, as = "h2" }) {
  const Heading = as;

  return (
    <div className="max-w-[90vw] w-full mx-auto pt-[70px]">
      <div className="flex  md:justify-start pb-[10px] md:pb-[25px] md:w-[65%]">
        <Heading className="text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F] font-unageo-semibold md:text-left leading-[84%]">
          {heading}
        </Heading>
      </div>
      <div className="flex justify-self-end pb-[25px] md:w-[70%] pt-[20px]">
        <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px] text-black font-unageo text-left leading-[112%]">
          {subtext}
        </p>
      </div>
    </div>
  );
}
