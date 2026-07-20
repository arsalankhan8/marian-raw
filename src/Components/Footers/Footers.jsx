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
  getSelectedRegion,
} from "../../utils/regionPaths";

import { REGIONS } from "../../constants/regions";

export default function Footers() {
  const region = getSelectedRegion();

  const homePath = getRegionHomePath();
  const portfolioPath =
    getRegionPortfolioPath();

  const legacyPath =
    getRegionPagePath("legacy");

  const newsPath =
    getRegionPagePath("news");

  const careersPath =
    getRegionPagePath("careers");

  const contactPath =
    getRegionPagePath("contact");

  const termsPath =
    getRegionPagePath(
      "terms-and-conditions",
    );

  const privacyPath =
    getRegionPagePath("privacy-policy");

  const policiesPath =
    getRegionPagePath("policies");

  const aodaPath = getRegionPagePath(
    "aoda-compliance",
    REGIONS.CANADA,
  );

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
    <footer className="hidden w-full bg-white sm:block">
      {/* Main footer */}
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-8 lg:py-14">
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 lg:grid-cols-[1.15fr_0.8fr_1.1fr_0.8fr] lg:gap-x-14 xl:gap-x-20">
          {/* Brand */}
          <div className="col-span-2 flex flex-col items-start lg:col-span-1">
            <Link
              to={homePath}
              aria-label="Mariani Metal home"
              className="inline-block"
            >
              <img
                src={logo}
                alt="Mariani Metal"
                className="h-[110px] w-auto object-contain lg:h-[135px] xl:h-[150px]"
              />
            </Link>

            <p className="mt-5 max-w-[300px] font-unageo text-[14px] leading-6 text-[#626A6E] lg:text-[15px]">
              Architectural metalwork built
              through precision, discipline,
              and craftsmanship across Canada
              and the United States.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/marianimetal?igsh=MWg3Nm9lMjRzNHdqZA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mariani Metal on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D2D8DB] transition-all duration-300 hover:border-[#00688F] hover:bg-[#00688F]"
              >
                <img
                  src={insta}
                  alt=""
                  aria-hidden="true"
                  className="h-[16px] w-[16px] object-contain"
                />
              </a>

              <a
                href="https://www.linkedin.com/company/mariani-metal-group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mariani Metal on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D2D8DB] transition-all duration-300 hover:border-[#00688F] hover:bg-[#00688F]"
              >
                <img
                  src={linkedin}
                  alt=""
                  aria-hidden="true"
                  className="h-[16px] w-[16px] object-contain"
                />
              </a>
            </div>
          </div>

          {/* Useful links */}
          <div>
            <h3 className="font-counture text-[22px] leading-none text-[#00688F] lg:text-[24px]">
              Useful Links
            </h3>

            <nav
              aria-label="Footer navigation"
              className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1"
            >
              {usefulLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="group flex w-fit items-center gap-2 font-unageo text-[15px] text-[#343A3D] transition-colors duration-300 hover:text-[#00688F]"
                >
                  <span className="h-[1px] w-0 bg-[#00688F] transition-all duration-300 group-hover:w-4" />

                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-counture text-[22px] leading-none text-[#00688F] lg:text-[24px]">
              Contact
            </h3>

            <div className="mt-6 grid gap-5">
              <div>
                <span className="font-unageo-medium text-[12px] uppercase tracking-[0.14em] text-[#7B8387]">
                  Email
                </span>

                <a
                  href="mailto:info@mariani.com"
                  className="mt-1 block font-unageo text-[15px] text-[#252B2E] transition-colors duration-300 hover:text-[#00688F]"
                >
                  info@mariani.com
                </a>
              </div>

              <div>
                <span className="font-unageo-medium text-[12px] uppercase tracking-[0.14em] text-[#7B8387]">
                  Call
                </span>

                <a
                  href="tel:+14167982969"
                  className="mt-1 block font-unageo text-[15px] text-[#252B2E] transition-colors duration-300 hover:text-[#00688F]"
                >
                  (416) 798-2969
                </a>
              </div>

              <div>
                <span className="font-unageo-medium text-[12px] uppercase tracking-[0.14em] text-[#7B8387]">
                  Location
                </span>

                <address className="mt-1 font-unageo text-[14px] not-italic leading-6 text-[#50585C]">
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

          {/* Social */}
          <div>
            <h3 className="font-counture text-[22px] leading-none text-[#00688F] lg:text-[24px]">
              Follow Us
            </h3>

            <div className="mt-6 grid gap-4">
              <a
                href="https://www.instagram.com/marianimetal?igsh=MWg3Nm9lMjRzNHdqZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-3 font-unageo text-[15px] text-[#343A3D] transition-colors duration-300 hover:text-[#00688F]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D5DCDF] transition-all duration-300 group-hover:border-[#00688F] group-hover:bg-[#00688F]">
                  <img
                    src={insta}
                    alt=""
                    aria-hidden="true"
                    className="h-[14px] w-[14px]"
                  />
                </span>

                Instagram
              </a>

              <a
                href="https://www.linkedin.com/company/mariani-metal-group"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-3 font-unageo text-[15px] text-[#343A3D] transition-colors duration-300 hover:text-[#00688F]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D5DCDF] transition-all duration-300 group-hover:border-[#00688F] group-hover:bg-[#00688F]">
                  <img
                    src={linkedin}
                    alt=""
                    aria-hidden="true"
                    className="h-[14px] w-[14px]"
                  />
                </span>

                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#D9DEE0]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="font-unageo text-[12px] text-[#687074] lg:text-[13px]">
            © 2026 Mariani. All Rights
            Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              to={termsPath}
              className="font-unageo-medium text-[12px] text-[#4F575B] transition-colors duration-300 hover:text-[#00688F] lg:text-[13px]"
            >
              Terms &amp; Conditions
            </Link>

            <Link
              to={privacyPath}
              className="font-unageo-medium text-[12px] text-[#4F575B] transition-colors duration-300 hover:text-[#00688F] lg:text-[13px]"
            >
              Privacy Policy
            </Link>

            <Link
              to={policiesPath}
              className="font-unageo-medium text-[12px] text-[#4F575B] transition-colors duration-300 hover:text-[#00688F] lg:text-[13px]"
            >
              Other Policies
            </Link>

            {region === REGIONS.CANADA && (
              <Link
                to={aodaPath}
                className="font-unageo-medium text-[12px] text-[#4F575B] transition-colors duration-300 hover:text-[#00688F] lg:text-[13px]"
              >
                AODA Compliance
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}