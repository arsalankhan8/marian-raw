export default function SingleHeading({ heading, headingcss, divcss, as = "h2" }) {
  const Heading = as;

  return (
    <div className={`flex  pb-[25px] ${divcss}`}>
      <Heading className={`text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F] font-counture uppercase ${headingcss}`}>
        {heading}
      </Heading>
    </div>
  );
}
