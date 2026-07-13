import React from "react";
import Header from "../../Components/Header/Header";
import Footers from "../../Components/Footers/Footers";
import MobileHeader from "../../Components/Header/MobileHeader";
import MobileFooters from "../../Components/Footers/MobileFooters";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

export default function TermsConditions() {
  return (
    <>
      <Header />
      <MobileHeader />
      <div className="max-w-[90vw] w-full mx-auto pt-[80px] md:pt-[130px] pb-[100px] min-h-[60vh]">
        <h1 className="font-counture text-[#00688F] text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] mb-8">
          Terms and Conditions
        </h1>
        <div className="font-unageo-medium text-[14px] lg:text-[15px] 3xl:text-[24px] space-y-6">
          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Introduction
            </h2>
            <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              Welcome to the website of{" "}
              <span className="font-unageo-medium">
                MARIANI METAL FABRICATORS LTD
              </span>
              . By accessing or using this website, you agree to comply with and
              be bound by the following Terms & Conditions. If you do not agree
              with any part of these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Use of Website
            </h2>
            <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              This website is provided for general informational purposes only.
              You agree to use the website in a lawful manner and not to engage
              in any activity that could damage, disable, or impair the website
              or interfere with other users’ access.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Intellectual Property
            </h2>
            <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              All content on this website, including text, images, graphics,
              logos, and designs, is the property of{" "}
              <span className="font-unageo-medium">
                MARIANI METAL FABRICATORS LTD
              </span>{" "}
              unless otherwise stated. Unauthorized use, reproduction, or
              distribution of any material from this website is prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Accuracy of Information
            </h2>
            <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              While we make reasonable efforts to ensure the information on this
              website is accurate and up to date, we do not guarantee the
              completeness, accuracy, or reliability of any content. Information
              may be changed or updated at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Limitation of Liability
            </h2>
            <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              <span className="font-unageo-medium">
                MARIANI METAL FABRICATORS LTD
              </span>{" "}
              shall not be liable for any direct, indirect, incidental, or
              consequential damages arising from the use or inability to use
              this website, including but not limited to errors, omissions, or
              interruptions.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Third-Party Links
            </h2>
            <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              This website may contain links to third-party websites for
              convenience. We do not control or endorse the content of these
              websites and are not responsible for their practices or policies.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Changes to Terms
            </h2>
            <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              We reserve the right to update or modify these Terms & Conditions
              at any time. Continued use of the website after changes are posted
              constitutes acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Governing Law
            </h2>
            <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              These Terms & Conditions are governed by and interpreted in
              accordance with applicable laws. Any disputes shall be subject to
              the jurisdiction of the relevant courts.
            </p>
          </section>
        </div>
      </div>
      <ScrollToTop/>
      <Footers />
      <MobileFooters />
    </>
  );
}
