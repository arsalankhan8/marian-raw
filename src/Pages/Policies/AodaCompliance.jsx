import React from "react";
import Header from "../../Components/Header/Header";
import Footers from "../../Components/Footers/Footers";
import MobileHeader from "../../Components/Header/MobileHeader";
import MobileFooters from "../../Components/Footers/MobileFooters";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

export default function AodaCompliance() {
  return (
    <>
      <Header />
      <MobileHeader />
      <main id="main-content" tabIndex={-1} className="max-w-[90vw] w-full mx-auto pt-[80px] md:pt-[130px] pb-[100px] min-h-[60vh]">
        <h1 className="font-counture text-[#00688F] text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] mb-8">
          AODA Compliance
        </h1>
        <div className="font-unageo-medium text-[16px] md:text-[18px] space-y-6">
          <section>
            <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              The AODA (Accessibility for Ontarians with Disabilities Act)
              requires Ontario organizations, including businesses with 50+
              employees and public sector bodies, to make their websites
              accessible, conforming to{" "}
              <a
                href="https://www.google.com/search?q=Web+Content+Accessibility+Guidelines+%28WCAG%29+2.0+Level+AA&oq=Accessibility+for+Ontarians+with+Disabilities+Act+%28AODA%29%2C+for+websites&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDQ4NTZqMGo5qAIEsAIB8QUPd0znAVZihg&sourceid=chrome&ie=UTF-8&mstk=AUtExfDEf864ZsaNww_KWJmLDZ9EOxa68q8S3HGozur31bHpK02XjjtDAmVQsC-hyenkFVT39BMIcygMcb0-BQiiv1Psv-bxh9SUwK_FP8Jilg5QOWPaDDLcoDU-PRYT8eZwQLl3_RMOq1WaHexnJ9VkKyqBpnjFP14wceWz6zUMMbbK8R_f_oN6MfvoDesgYnFNLfnkRHHoCxCcstkl_FoeCYMdVQ&csui=3&ved=2ahUKEwjc6J77_K6RAxWwOjQIHRpxEdQQgK4QegQIARAB"
                className="text-[#00688F] underline hover:text-black transition-colors"
              >
                Web Content Accessibility Guidelines (WCAG) 2.0 Level AA
              </a>{" "}
              (with minor exceptions for live captions/audio descriptions) by
              January 1, 2021, for public sites, ensuring digital barriers are
              removed for people with disabilities. Compliance involves
              accessible coding, testing with assistive tech, and training
              staff, with penalties for non-compliance, aiming for inclusive
              digital access.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Key Requirements & Deadlines
            </h2>
            <ul className="list-disc pl-5 space-y-1 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              <li>
                <strong>Target Audience:</strong> Designated public sector
                organizations and businesses/non-profits with 50+ employees.
              </li>
              <li>
                <strong>Standard:</strong> WCAG 2.0 Level AA (except live
                captions/audio descriptions).
              </li>
            </ul>
            <p className="font-bold mt-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              Deadlines:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              <li>
                <strong>Jan 1, 2014:</strong> New public sites/refreshes must
                meet WCAG 2.0 Level A.
              </li>
              <li>
                <strong>Jan 1, 2021:</strong> All public websites & web content
                (posted after Jan 1, 2012) must meet WCAG 2.0 Level AA.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              How to Achieve Compliance
            </h2>
            <ul className="font-unageo-medium list-disc pl-5 space-y-1 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              <li>
                <strong>Use WCAG Guidelines:</strong> Follow WCAG 2.0 Level AA,
                focusing on making content perceivable, operable,
                understandable, and robust.
              </li>
              <li>
                <strong>Accessible Design:</strong> Implement accessible coding
                practices and use accessible software.
              </li>
              <li>
                <strong>Testing:</strong> Conduct automated and manual tests,
                including with assistive technologies (like screen readers).
              </li>
              <li>
                <strong>Training:</strong> Train staff on creating accessible
                content.
              </li>
              <li>
                <strong>Maintenance:</strong> Have a plan for ongoing
                accessibility updates.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Why It Matters
            </h2>
            <ul className="list-disc pl-5 space-y-1 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              <li>
                <strong>Legal Obligation:</strong> It's provincial law, with
                significant fines for non-compliance (up to $100,000/day for
                corporations).
              </li>
              <li>
                <strong>Inclusivity:</strong> It ensures digital platforms are
                usable by everyone, fostering a barrier-free environment.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Resources & Guidance
            </h2>
            <ul className="list-disc pl-5 space-y-1 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              <li>
                <a
                  href="https://www.ontario.ca/page/when-public-websites-are-not-accessible"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00688F] underline hover:text-black transition-colors"
                >
                  ontario.ca/page/when-public-websites-are-not-accessible
                </a>
              </li>
              <li>
                <a
                  href="https://www.accessibilitychecker.org/blog/aoda-website-compliance-checklist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00688F] underline hover:text-black transition-colors"
                >
                  www.accessibilitychecker.org/aoda-website-compliance-checklist/
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <ScrollToTop/>
      <Footers />
      <MobileFooters />
    </>
  );
}
