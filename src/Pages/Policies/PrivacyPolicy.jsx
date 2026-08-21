import React from "react";
import Header from "../../Components/Header/Header";
import Footers from "../../Components/Footers/Footers";
import MobileHeader from "../../Components/Header/MobileHeader";
import MobileFooters from "../../Components/Footers/MobileFooters";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <MobileHeader />
      <main id="main-content" tabIndex={-1} className="max-w-[90vw] w-full mx-auto pt-[80px] md:pt-[130px] pb-[100px] min-h-[60vh]">
        <h1 className="font-counture text-[#00688F] text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] mb-8">
          Privacy Policy
        </h1>
        <div className="font-unageo text-[16px] md:text-[18px] space-y-6">
          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Introduction
            </h2>
            <p className="font-unageo-medium text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              <span className="font-unageo-medium">
                MARIANI METAL FABRICATORS LTD
              </span>{" "}
              is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard your information when
              you visit our website.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Information We Collect
            </h2>
            <p className="font-unageo-medium mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              We may collect personal information such as your name, email
              address, phone number, or company details when you:
            </p>
            <ul className="font-unageo-medium list-disc pl-5 space-y-1 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              <li>Fill out a contact form</li>
              <li>Request a quote or information</li>
              <li>Communicate with us via the website</li>
            </ul>
            <p className="font-unageo-medium text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              We may also collect non-personal information such as browser type,
              IP address, and website usage data for analytics purposes.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              How We Use Information
            </h2>
            <p className="font-unageo-medium mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">The information we collect may be used to:</p>
            <ul className="font-unageo-medium list-disc pl-5 space-y-1 mb-2 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              <li>Respond to inquiries and requests</li>
              <li>Provide services or information you request</li>
              <li>Improve our website and user experience</li>
              <li>Communicate regarding our services</li>
            </ul>
            <p className="font-unageo-medium text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">We do not sell or rent personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Data Protection
            </h2>
            <p className="font-unageo-medium text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              We take reasonable technical and organizational measures to
              protect your personal information against unauthorized access,
              disclosure, or misuse. However, no method of online transmission
              is completely secure.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Cookies
            </h2>
            <p className="font-unageo-medium text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              Our website may use cookies to enhance user experience and analyze
              website traffic. You may choose to disable cookies through your
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Third-Party Services
            </h2>
            <p className="font-unageo-medium text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              We may use third-party tools or services (such as analytics
              providers) that collect information in accordance with their own
              privacy policies. We are not responsible for the privacy practices
              of third-party websites.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Your Rights
            </h2>
            <p className="font-unageo-medium text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              You may request access to, correction of, or deletion of your
              personal information by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Changes to This Policy
            </h2>
            <p className="text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px] font-unageo-medium">
              We reserve the right to update this Privacy Policy at any time.
              Any changes will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="font-unageo-medium text-[14px] md:text-[24px] lg:text-[18px] xl:text-[25px]  2xl:text-[28px] 3xl:text-[66px] mb-2 text-[#00688F]">
              Contact Us
            </h2>
            <p className="font-unageo-medium text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
              If you have any questions about this Privacy Policy or how your
              information is handled, please contact{" "}
              <span className="font-unageo-medium">
                MARIANI METAL FABRICATORS LTD
              </span>{" "}
              through the contact details provided on our website.
            </p>
          </section>
        </div>
      </main>
      <ScrollToTop/>
      <Footers />
      <MobileFooters />
    </>
  );
}
