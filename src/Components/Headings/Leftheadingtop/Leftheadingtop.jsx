export default function Leftheadingtop({
  heading,
  subtext,
  as = "h2",
  centered = false,
}) {
  const Heading = as;

  return (
    <div className="max-w-[90vw] w-full mx-auto pt-[70px]">
      <div
        className={`flex pb-[10px] md:pb-[25px] md:w-[65%] ${
          centered ? "mx-auto justify-center" : "md:justify-start"
        }`}
      >
        <Heading
          className={`text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 4k:text-[111px] text-[#00688F] font-unageo-semibold leading-[84%] ${
            centered ? "text-center" : "text-left"
          }`}
        >
          {heading}
        </Heading>
      </div>
      <div
        className={`flex pb-[25px] md:w-[70%] pt-[20px] ${
          centered ? "mx-auto justify-center" : "justify-self-end"
        }`}
      >
        <p
          className={`text-[12px] md:text-[14px] lg:text-[15px] 4k:text-[24px] text-black font-unageo leading-[112%] ${
            centered ? "text-center" : "text-left"
          }`}
        >
          {subtext}
        </p>
      </div>
    </div>
  );
}
