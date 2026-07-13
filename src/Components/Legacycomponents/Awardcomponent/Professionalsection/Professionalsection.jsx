import React from "react";

export default function Professionalsection() {
  return (
    <div>
      <div className="flex flex-col max-w-[90vw] w-full mx-auto justify-between">
        <div className="flex justify-between flex-wrap pt-[70px] pb-[50px]">
          <p className="font-counture text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-center md:text-left w-full  md:w-[70%] leading-[100%] text-[#00688F]">
            Professional Affiliations
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-4 lg:gap-6 xl:gap-7 2xl:gap-8">
          <div className="flex flex-col gap-6 md:w-[70%] pb-[25px] border-b-[1px] border-b-black">
            <div className="flex flex-col w-full gap-4">
              <p className="text-[16px] md:text-[20px] lg:text-[21px] xl:text-[24px] 2xl:text-[27px] 3xl:text-[46px] font-unageo-bold leading-[112%] capitalize">
                Canadian Institute of Steel Construction (CISC)
              </p>
              <p className="font-unageo text-[13px] md:text-[14px] lg:text-[15px] xl:text-[18px] 2xl:text-[19px] 3xl:text-[36px] leading-[112%] capitalize">
                Member of Canada’s leading structural steel association,
                contributing to the development of industry standards and
                practices.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:w-[70%] pb-[25px] border-b-[1px] border-b-black">
            <div className="flex flex-col w-full gap-4">
              <p className="text-[16px] md:text-[20px] lg:text-[21px] xl:text-[24px] 2xl:text-[27px] 3xl:text-[46px] font-unageo-bold leading-[112%] capitalize">
                Ontario Glass & Metal Association (OGMA)
              </p>
              <p className="font-unageo text-[13px] md:text-[14px] lg:text-[15px] xl:text-[18px] 2xl:text-[19px] 3xl:text-[36px] leading-[112%] capitalize">
                Affiliated with Ontario’s network of architectural glass and
                metal professionals, strengthening knowledge in façades and
                building envelopes.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:w-[70%] pb-[25px] border-b-[1px] border-b-black">
            <div className="flex flex-col w-full gap-4">
              <p className="text-[16px] md:text-[20px] lg:text-[21px] xl:text-[24px] 2xl:text-[27px] 3xl:text-[46px] font-unageo-bold leading-[112%] capitalize">
                Toronto Construction Association (TCA)
              </p>
              <p className="font-unageo text-[13px] md:text-[14px] lg:text-[15px] xl:text-[18px] 2xl:text-[19px] 3xl:text-[36px] leading-[112%] capitalize">
                Member of Toronto’s largest construction community, fostering
                collaboration across disciplines and sectors.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:w-[70%] pb-[15px] ">
            <div className="flex flex-col w-full gap-4">
              <p className="text-[16px] md:text-[20px] lg:text-[21px] xl:text-[24px] 2xl:text-[27px] 3xl:text-[46px] font-unageo-bold leading-[112%] capitalize">
                Canadian Welding Bureau (CWB)
              </p>
              <p className="font-unageo text-[13px] md:text-[14px] lg:text-[15px] xl:text-[18px] 2xl:text-[19px] 3xl:text-[36px] leading-[112%] capitalize">
                Active participant in Canada’s national certification body,
                reinforcing credibility and professional standing in
                fabrication.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 pb-[30px]">
            <p className="font-unageo-semibold-italic text-center md:text-left italic leading-[100%] text-[12px] md:text-[14px] lg:text-[15px] 2xl:text-[20px] 3xl:text-[28px] text-[#00688F] md:w-[50%] font-semibold">
              Affiliations keep Mariani Metal connected to the organizations
              that shape standards, drive progress, and strengthen the future of
              the industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
