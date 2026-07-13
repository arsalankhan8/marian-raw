import React from "react";
import logo from "../../assets/logo.png";
import facebook from "../../assets/facebookb.png";
import insta from "../../assets/instab.png";
import linkedin from "../../assets/linkedinb.png";
import { Link } from "react-router";
import {
  getRegionHomePath,
  getRegionPortfolioPath,
  getRegionContact,
} from "../../utils/regionPaths";

export default function MobileFooters() {
  const homePath = getRegionHomePath();
  const portfolioPath = getRegionPortfolioPath();
  const contact = getRegionContact();

  return (
    <>
      <div className="w-full flex sm:hidden flex-col items-center gap-10 pt-10 pb-6 px-5">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to={homePath}>
            <img src={logo} alt="logo" className="h-[130px] w-[140px]" />
          </Link>
        </div>

        {/* Useful Links */}
        <div className="flex  flex-col items-center gap-3">
          <span className="font-unageo-medium text-[20px] text-[#00688F]">
            Useful Links
          </span>
          <div className="flex flex-col items-center gap-2">
            <Link to={homePath}>
              <span className="font-unageo">Home</span>
            </Link>
            <Link to={`/legacy`}>
              <span className="font-unageo">Legacy</span>
            </Link>
            <Link to={portfolioPath}>
              <span className="font-unageo">Portfolio</span>
            </Link>
            <Link to={`/news`}>
              <span className="font-unageo">News</span>
            </Link>
            <Link to={`/contact`}>
              <span className="font-unageo">Contact Us</span>
            </Link>
          </div>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col items-center gap-3">
          <span className="font-unageo-medium text-[20px] text-[#00688F]">
            Contact Us
          </span>
          <div className="flex flex-col items-center gap-2 text-center">
            <div>
              <span className="text-[16px] font-unageo-medium">Email</span>
              <p className="font-unageo">info@mariani.com</p>
            </div>
            <div>
              <span className="text-[16px] font-unageo-medium">Call</span>
              <p className="font-unageo">(416) 798-2969</p>
            </div>
            <div>
              <span className="text-[16px] font-unageo-medium">Location</span>
              <p className="font-unageo">
                {contact.addressLines.map((line, index) => (
                  <React.Fragment key={line}>
                    {index > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center gap-3">
          <span className="font-unageo-medium text-[20px] text-[#00688F]">
            Social Media
          </span>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.instagram.com/marianimetal?igsh=MWg3Nm9lMjRzNHdqZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity text-inherit no-underline"
            >
              <img src={insta} alt="instagram" className="h-[15px] w-[15px]" />
              <span className="font-unageo">Instagram</span>
            </a>

            <a
              href="https://www.linkedin.com/company/mariani-metal-group"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity text-inherit no-underline"
            >
              <img
                src={linkedin}
                alt="linkedin"
                className="h-[15px] w-[15px]"
              />
              <span className="font-unageo">Linkedin</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full border-t-[1px] pt-4 pb-6 px-5 flex sm:hidden flex-col items-center gap-3">
        <p className="font-unageo-medium text-[13px] text-center">
          © Copyright 2026. mariani. All Rights Reserved.
        </p>
        <div className="flex flex-col items-center gap-2">
          <Link
            to="/terms-and-conditions"
            className="font-unageo-medium text-[13px] capitalize text-black"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/privacy-policy"
            className="font-unageo-medium text-[13px] capitalize text-black"
          >
            Privacy Policy
          </Link>
          <Link
            to="/policies"
            className="font-unageo-medium text-[13px] capitalize text-black"
          >
            Other Policies
          </Link>
          <Link
            to="/aoda-compliance"
            className="font-unageo-medium text-[13px] capitalize text-black"
          >
            AODA Compliance
          </Link>
        </div>
      </div>
    </>
  );
}
