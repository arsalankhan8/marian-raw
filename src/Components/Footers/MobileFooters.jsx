import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import insta from "../../assets/instab.png";
import linkedin from "../../assets/linkedinb.png";

import {
  getRegionHomePath,
  getRegionPortfolioPath,
  getRegionPagePath,
  getRegionContact,
} from "../../utils/regionPaths";

export default function MobileFooters() {
  const homePath = getRegionHomePath();
  const portfolioPath = getRegionPortfolioPath();

  const legacyPath =
    getRegionPagePath("legacy");

  const newsPath =
    getRegionPagePath("news");

  const careersPath =
    getRegionPagePath("careers");

  const contactPath =
    getRegionPagePath("contact");

  const termsPath =
    getRegionPagePath("terms-and-conditions");

  const privacyPath =
    getRegionPagePath("privacy-policy");

  const policiesPath =
    getRegionPagePath("policies");

  const aodaPath =
    getRegionPagePath("aoda-compliance");

  const contact = getRegionContact();

  const usefulLinks = [
    {
      label: "Home",
      path: homePath,
    },
    {
      label: "Legacy",
      path: legacyPath,
    },
    {
      label: "Portfolio",
      path: portfolioPath,
    },
    {
      label: "News",
      path: newsPath,
    },
    {
      label: "Careers",
      path: careersPath,
    },
    {
      label: "Contact Us",
      path: contactPath,
    },
  ];

  return (
    <footer className="block w-full bg-white sm:hidden">
      {/* Main footer */}
      <div className="mx-auto w-full px-5 pb-8 pt-9">
        {/* Logo and social links */}
        <div className="flex items-center justify-between border-b border-[#D9DEE0] pb-6">
          <Link
            to={homePath}
            aria-label="Mariani Metal home"
          >
            <img
              src={logo}
              alt="Mariani Metal"
              className="h-[82px] w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/marianimetal?igsh=MWg3Nm9lMjRzNHdqZA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mariani Metal on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5DCDF] transition-all duration-300 hover:border-[#00688F] hover:bg-[#00688F]"
            >
              <img
                src={insta}
                alt=""
                aria-hidden="true"
                className="h-[17px] w-[17px] object-contain"
              />
            </a>

            <a
              href="https://www.linkedin.com/company/mariani-metal-group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mariani Metal on LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5DCDF] transition-all duration-300 hover:border-[#00688F] hover:bg-[#00688F]"
            >
              <img
                src={linkedin}
                alt=""
                aria-hidden="true"
                className="h-[17px] w-[17px] object-contain"
              />
            </a>
          </div>
        </div>

        {/* Two-column footer grid */}
        <div className="mt-7 grid grid-cols-2 gap-x-7 gap-y-8">
          {/* Useful links */}
          <div>
            <h3 className="font-counture text-[19px] leading-none text-[#00688F]">
              Useful Links
            </h3>

            <nav
              aria-label="Footer navigation"
              className="mt-4 grid gap-2.5"
            >
              {usefulLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="w-fit font-unageo text-[14px] leading-5 text-[#343A3D] transition-colors duration-300 hover:text-[#00688F]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact details */}
          <div>
            <h3 className="font-counture text-[19px] leading-none text-[#00688F]">
              Contact
            </h3>

            <div className="mt-4 grid gap-4">
              <div>
                <span className="block font-unageo-medium text-[12px] uppercase tracking-[0.12em] text-[#777F83]">
                  Email
                </span>

                <a
                  href="mailto:info@mariani.com"
                  className="mt-1 block break-words font-unageo text-[14px] leading-5 text-[#22282B] transition-colors duration-300 hover:text-[#00688F]"
                >
                  info@mariani.com
                </a>
              </div>

              <div>
                <span className="block font-unageo-medium text-[12px] uppercase tracking-[0.12em] text-[#777F83]">
                  Call
                </span>

                <a
                  href="tel:+14167982969"
                  className="mt-1 block font-unageo text-[14px] leading-5 text-[#22282B] transition-colors duration-300 hover:text-[#00688F]"
                >
                  (416) 798-2969
                </a>
              </div>

              <div>
                <span className="block font-unageo-medium text-[12px] uppercase tracking-[0.12em] text-[#777F83]">
                  Location
                </span>

                <address className="mt-1 font-unageo text-[13px] not-italic leading-5 text-[#4F575B]">
                  {contact.addressLines.map(
                    (line) => (
                      <span
                        key={line}
                        className="block"
                      >
                        {line}
                      </span>
                    ),
                  )}
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-[#D9DEE0] px-5 py-5">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          <Link
            to={termsPath}
            className="font-unageo-medium text-[11px] text-[#4F575B] transition-colors duration-300 hover:text-[#00688F]"
          >
            Terms &amp; Conditions
          </Link>

          <Link
            to={privacyPath}
            className="font-unageo-medium text-[11px] text-[#4F575B] transition-colors duration-300 hover:text-[#00688F]"
          >
            Privacy Policy
          </Link>

          <Link
            to={policiesPath}
            className="font-unageo-medium text-[11px] text-[#4F575B] transition-colors duration-300 hover:text-[#00688F]"
          >
            Other Policies
          </Link>

          <Link
            to={aodaPath}
            className="font-unageo-medium text-[11px] text-[#4F575B] transition-colors duration-300 hover:text-[#00688F]"
          >
            AODA Compliance
          </Link>
        </div>

        <p className="mt-4 text-center font-unageo text-[11px] leading-5 text-[#777F83]">
          © 2026 Mariani. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}