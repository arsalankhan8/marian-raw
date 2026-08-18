import { REGIONS } from "../constants/regions";

export const US_BASE_PATH = "/US";
export const CA_BASE_PATH = "/canada";

export const US_PORTFOLIO_PATH = "/U.S.-Portfolio";
export const CA_PORTFOLIO_PATH = "/C.A.-Portfolio";

export const getSelectedRegion = () => {
  if (typeof window === "undefined") {
    return REGIONS.CANADA;
  }

  const pathname = window.location.pathname.toLowerCase();

  const usPortfolioPath = US_PORTFOLIO_PATH.toLowerCase();
  const canadaPortfolioPath = CA_PORTFOLIO_PATH.toLowerCase();

  const isUSPath =
    pathname === "/us" ||
    pathname.startsWith("/us/") ||
    pathname === usPortfolioPath ||
    pathname.startsWith(`${usPortfolioPath}/`);

  const isCanadaPath =
    pathname === "/canada" ||
    pathname.startsWith("/canada/") ||
    pathname === canadaPortfolioPath ||
    pathname.startsWith(`${canadaPortfolioPath}/`);

  if (isUSPath) {
    sessionStorage.setItem("regionSelected", REGIONS.US);
    return REGIONS.US;
  }

  if (isCanadaPath) {
    sessionStorage.setItem("regionSelected", REGIONS.CANADA);
    return REGIONS.CANADA;
  }

  return sessionStorage.getItem("regionSelected") === REGIONS.US
    ? REGIONS.US
    : REGIONS.CANADA;
};

export const getRegionBasePath = (region = getSelectedRegion()) => {
  return region === REGIONS.US
    ? US_BASE_PATH
    : CA_BASE_PATH;
};

export const getRegionPagePath = (
  page = "",
  region = getSelectedRegion(),
) => {
  const basePath = getRegionBasePath(region);

  const cleanPage = String(page)
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

  if (!cleanPage) {
    return basePath;
  }

  return `${basePath}/${cleanPage}`;
};

export const getRegionHomePath = () => {
  return getRegionBasePath();
};

export const getRegionPortfolioPath = () => {
  const region = getSelectedRegion();

  return region === REGIONS.US
    ? US_PORTFOLIO_PATH
    : CA_PORTFOLIO_PATH;
};

// Kept so your existing Legacy header code continues working
export const getRegionLegacyPath = () => {
  return getRegionPagePath("legacy");
};

const REGION_CONTACT = {
  [REGIONS.CANADA]: {
    addressLines: [
      "263 Carrier Dr, Etobicoke,",
      "ON M9W 5Y8",
    ],
    phone: "(416) 798-2969",
    email: "info@marianimetal.com",
  },

  [REGIONS.US]: {
    addressLines: [
      "48 Limestone Blvd",
      "Washington, NJ 07882",
    ],
    phone: "(416) 798-2969",
    email: "info@marianimetal.com",
  },
};

export const getRegionContact = () => {
  const region = getSelectedRegion();

  return REGION_CONTACT[region];
};
