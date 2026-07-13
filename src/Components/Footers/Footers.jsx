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

export default function Footers() {
  const homePath = getRegionHomePath();
  const portfolioPath = getRegionPortfolioPath();
  const contact = getRegionContact();

  return (
    <>
      <div className="max-w-[90vw] mx-auto hidden sm:flex justify-between pt-[70px] pb-[20px]">
        <div className="flex justify-start items-center">
          <Link to={homePath}>
            {" "}
            <img
              src={logo}
              alt="logo"
              className="h-[196px] w-[206px] 3xl:w-[250px] 3xl:h-[230px]"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-8">
          <span className="font-medium text-[22px] text-[#00688F] font-unageo-medium">
            {" "}
            Useful Links
          </span>
          <div className="flex flex-col gap-3">
            <Link to={homePath}>
              {" "}
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
        <div className="flex flex-col gap-8">
          <span className="font-medium text-[22px] text-[#00688F] font-unageo-medium">
            {" "}
            Contact Us
          </span>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="text-[18px] font-unageo-medium">Email</span>
              <span className="font-unageo">info@mariani.com</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-unageo-medium">Call</span>
              <span className="font-unageo">(416) 798-2969</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-unageo-medium">Location</span>
              <span className="font-unageo">
                {contact.addressLines.map((line, index) => (
                  <React.Fragment key={line}>
                    {index > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <span className="font-medium text-[22px] text-[#00688F] font-unageo-medium">
            {" "}
            Social Media
          </span>
          <div className="flex flex-col gap-3">
            {/*
    <a href="https://facebook.com/your-profile" target="_blank" rel="noopener noreferrer" className='flex gap-4 cursor-pointer hover:opacity-80 transition-opacity'>
      <img src={facebook} alt="facebook" className='h-[15px] w-[12px]' />
      <span className='mt-[-5px] font-unageo'>Facebook</span>
    </a>
    */}

            <a
              href="https://www.instagram.com/marianimetal?igsh=MWg3Nm9lMjRzNHdqZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img src={insta} alt="instagram" className="h-[15px] w-[15px]" />
              <span className="mt-[-5px] font-unageo">Instagram</span>
            </a>

            <a
              href="https://www.linkedin.com/company/mariani-metal-group"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={linkedin}
                alt="linkedin"
                className="h-[15px] w-[15px]"
              />
              <span className="mt-[-4px] font-unageo">Linkedin</span>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[90vw] w-full mx-auto hidden sm:flex justify-between border-t-[1px] pt-[20px] pb-[20px]">
        <p className="font-unageo-medium text-[14px] 3xl:text-[18px] capitalize">
          © Copyright 2026. mariani. All Rights Reserved.
        </p>
        <div className="flex gap-4 items-center">
          <Link
            to="/terms-and-conditions"
            className="font-unageo-medium text-[14px] 3xl:text-[18px] capitalize pr-[20px] border-r-[2px] leading-none text-black"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/privacy-policy"
            className="font-unageo-medium text-[14px] 3xl:text-[18px] capitalize pr-[20px] border-r-[2px] leading-none text-black"
          >
            Privacy Policy
          </Link>
          <Link
            to="/policies"
            className="font-unageo-medium text-[14px] 3xl:text-[18px] capitalize pr-[20px] border-r-[2px] leading-none text-black"
          >
            Other Policies
          </Link>
          <Link
            to="/aoda-compliance"
            className="font-unageo-medium text-[14px] 3xl:text-[18px] capitalize leading-none text-black"
          >
            AODA Compliance
          </Link>
        </div>
      </div>
    </>
  );
}
