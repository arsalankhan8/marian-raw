import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import "./App.css";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Lenis from "@studio-freight/lenis";

import CareerDetailpage from "./Pages/Careerpage/CareerDetailpage";
import Careerpage from "./Pages/Careerpage/Careerpage";

import Homepage from "./Pages/Homepage/Homepage";
import USHomepage from "./Pages/USHome/USHomepage";
import StaticPage from "./Pages/StaticPage/StaticPage";

import Portfoliopage from "./Pages/Portfoliopage/Portfoliopage";
import USPortfoliopage from "./Pages/Portfoliopage/USPortfoliopage";
import Portfoliodetails from "./Pages/Portfoliodetails/Portfoliodetails";
import Referencepage from "./Pages/Portfoliopage/Referencepage/Referencepage";

import PortfolioRedirect from "./Components/PortfolioRedirect/PortfolioRedirect";
import RegionModal from "./Components/RegionSelector/RegionModal";
import SkipLink from "./Components/SkipLink/SkipLink";

/*
  These component names can remain unchanged.
  They are now displayed through the About URLs.
*/
import USLegacyPage from "./Pages/US/LegacyPage";
import CanadaLegacyPage from "./Pages/Canada/LegacyPage";

import USCsrPage from "./Pages/US/Csrpage";
import CanadaCsrPage from "./Pages/Canada/Csrpage";

import Awardspage from "./Pages/Awardspage/Awardspage";
import Newspage from "./Pages/Newspage/Newspage";
import Contactpage from "./Pages/Contactpage/Contactpage";

import PrivacyPolicy from "./Pages/Policies/PrivacyPolicy";
import TermsConditions from "./Pages/Policies/TermsConditions";
import PoliciesPage from "./Pages/Policies/PoliciesPage";
import AodaCompliance from "./Pages/Policies/AodaCompliance";

import {
  CA_PORTFOLIO_PATH,
  US_PORTFOLIO_PATH,
  getRegionPagePath,
} from "./utils/regionPaths";

function ScrollToTop({ lenisRef }) {
  const location = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let firstFrame;
    let secondFrame;

    const resetScroll = () => {
      lenisRef.current?.scrollTo(0, {
        immediate: true,
        force: true,
      });

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();

    firstFrame = requestAnimationFrame(() => {
      resetScroll();

      secondFrame = requestAnimationFrame(() => {
        resetScroll();
      });
    });

    return () => {
      if (firstFrame) {
        cancelAnimationFrame(firstFrame);
      }

      if (secondFrame) {
        cancelAnimationFrame(secondFrame);
      }
    };
  }, [location.pathname, lenisRef]);

  return null;
}

function RegionalRedirect({ page }) {
  const redirectPath = getRegionPagePath(page);

  return <Navigate to={redirectPath} replace />;
}

const STATIC_PAGE_TITLES = {
  "/": "Choose Your Region | Mariani Metal",
  "/white": "Choose Your Region | Mariani Metal",
  "/canada": "Architectural Metal & Glass Fabrication | Mariani Metal Canada",
  "/us": "Architectural Metal & Glass Fabrication | Mariani Metal United States",
  "/c.a.-portfolio": "Landmark Projects | Mariani Metal Canada",
  "/u.s.-portfolio": "Landmark Projects | Mariani Metal United States",
  "/canada/about": "About | Mariani Metal Canada",
  "/us/about": "About | Mariani Metal United States",
  "/canada/awards": "Awards & Recognitions | Mariani Metal Canada",
  "/canada/csr": "CSR & Sustainability | Mariani Metal Canada",
  "/us/csr": "CSR & Sustainability | Mariani Metal United States",
  "/canada/news": "News & Insights | Mariani Metal Canada",
  "/us/news": "News & Insights | Mariani Metal United States",
  "/canada/contact": "Contact | Mariani Metal Canada",
  "/us/contact": "Contact | Mariani Metal United States",
  "/canada/reference": "Project Reference List | Mariani Metal Canada",
  "/us/reference": "Project Reference List | Mariani Metal United States",
  "/canada/careers": "Careers | Mariani Metal Canada",
  "/us/careers": "Careers | Mariani Metal United States",
  "/canada/privacy-policy": "Privacy Policy | Mariani Metal Canada",
  "/us/privacy-policy": "Privacy Policy | Mariani Metal United States",
  "/canada/terms-and-conditions": "Terms & Conditions | Mariani Metal Canada",
  "/us/terms-and-conditions": "Terms & Conditions | Mariani Metal United States",
  "/canada/policies": "Policies | Mariani Metal Canada",
  "/us/policies": "Policies | Mariani Metal United States",
  "/canada/aoda-compliance": "AODA Accessibility | Mariani Metal Canada",
  "/static": "Capabilities & Projects | Mariani Metal",
};

function DocumentTitle({ hasAccess }) {
  const location = useLocation();

  useEffect(() => {
    if (!hasAccess) {
      document.title = "Choose Your Region | Mariani Metal";
      return;
    }

    const pathname = location.pathname.toLowerCase();

    // Detail pages set a content-specific title after loading their own data.
    const isDetailPage =
      /^\/(canada|us)\/careers\/[^/]+$/.test(pathname) ||
      /^\/(canada|us)\/portfolio\/[^/]+$/.test(pathname) ||
      /^\/portfoliodetails\/[^/]+$/.test(pathname);

    if (isDetailPage) return;

    document.title =
      STATIC_PAGE_TITLES[pathname] ||
      "Mariani Metal | Architectural Metal & Glass Fabrication";
  }, [hasAccess, location.pathname]);

  return null;
}

function getRegionFromCurrentPath() {
  const pathname =
    window.location.pathname.toLowerCase();

  if (
    pathname === "/canada" ||
    pathname.startsWith("/canada/")
  ) {
    return "canada";
  }

  if (
    pathname === "/us" ||
    pathname.startsWith("/us/")
  ) {
    return "US";
  }

  return null;
}

function App() {
  const [hasAccess, setHasAccess] = useState(() => {
    const regionFromUrl = getRegionFromCurrentPath();

    const savedRegion =
      sessionStorage.getItem("regionSelected");

    return Boolean(regionFromUrl || savedRegion);
  });

  const lenisRef = useRef(null);

  useEffect(() => {
    const savedRegion =
      sessionStorage.getItem("regionSelected");

    if (savedRegion) {
      setHasAccess(true);
    }
  }, []);

  const handleRegionSelect = (region) => {
    sessionStorage.setItem(
      "regionSelected",
      region,
    );

    setHasAccess(true);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,

      easing: (t) =>
        Math.min(
          1,
          1.001 - Math.pow(2, -10 * t),
        ),

      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    let animationFrameId;

    const raf = (time) => {
      lenis.raf(time);

      animationFrameId =
        requestAnimationFrame(raf);
    };

    animationFrameId =
      requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);

      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <DocumentTitle hasAccess={hasAccess} />
      <SkipLink />
      {!hasAccess ? (
        <RegionModal
          onSelect={handleRegionSelect}
          variant={
            window.location.pathname.toLowerCase() ===
            "/white"
              ? "white"
              : "dark"
          }
        />
      ) : (
        <>
          <ScrollToTop lenisRef={lenisRef} />

          <Routes>
            {/* Region selector */}
            <Route
              path="/"
              element={
                <RegionModal
                  onSelect={handleRegionSelect}
                  variant="dark"
                />
              }
            />

            <Route
              path="/white"
              element={
                <RegionModal
                  onSelect={handleRegionSelect}
                  variant="white"
                />
              }
            />

            {/* Home */}
            <Route
              path="/canada"
              element={<Homepage />}
            />

            <Route
              path="/US"
              element={<USHomepage />}
            />

            {/* Careers */}
            <Route
              path="/US/careers"
              element={<Careerpage />}
            />

            <Route
              path="/canada/careers"
              element={<Careerpage />}
            />

            <Route
              path="/US/careers/:slug"
              element={<CareerDetailpage />}
            />

            <Route
              path="/canada/careers/:slug"
              element={<CareerDetailpage />}
            />

            <Route
              path="/careers"
              element={
                <RegionalRedirect page="careers" />
              }
            />

            {/* Static page */}
            <Route
              path="/Static"
              element={<StaticPage />}
            />

            {/* Portfolio listing */}
            <Route
              path="/portfolio"
              element={<PortfolioRedirect />}
            />

            <Route
              path={CA_PORTFOLIO_PATH}
              element={<Portfoliopage />}
            />

            <Route
              path={US_PORTFOLIO_PATH}
              element={<USPortfoliopage />}
            />

            {/* Portfolio details */}
            <Route
              path="/canada/portfolio/:slug"
              element={<Portfoliodetails />}
            />

            <Route
              path="/US/portfolio/:slug"
              element={<Portfoliodetails />}
            />

            {/* About */}
            <Route
              path="/US/about"
              element={<USLegacyPage />}
            />

            <Route
              path="/canada/about"
              element={<CanadaLegacyPage />}
            />

            <Route
              path="/about"
              element={
                <RegionalRedirect page="about" />
              }
            />

            {/* Redirect previous Legacy URLs */}
            <Route
              path="/legacy"
              element={
                <RegionalRedirect page="about" />
              }
            />

            <Route
              path="/US/legacy"
              element={
                <Navigate
                  to="/US/about"
                  replace
                />
              }
            />

            <Route
              path="/canada/legacy"
              element={
                <Navigate
                  to="/canada/about"
                  replace
                />
              }
            />

            {/* Canada-only Awards */}
            <Route
              path="/canada/awards"
              element={<Awardspage />}
            />

            <Route
              path="/awards"
              element={
                <Navigate
                  to="/canada/awards"
                  replace
                />
              }
            />

            {/* CSR */}
            <Route
              path="/US/csr"
              element={<USCsrPage />}
            />

            <Route
              path="/canada/csr"
              element={<CanadaCsrPage />}
            />

            <Route
              path="/csr"
              element={
                <RegionalRedirect page="csr" />
              }
            />

            {/* News */}
            <Route
              path="/US/news"
              element={
                <Newspage region="us" />
              }
            />

            <Route
              path="/canada/news"
              element={
                <Newspage region="canada" />
              }
            />

            <Route
              path="/news"
              element={
                <RegionalRedirect page="news" />
              }
            />

            {/* Contact */}
            <Route
              path="/US/contact"
              element={<Contactpage />}
            />

            <Route
              path="/canada/contact"
              element={<Contactpage />}
            />

            <Route
              path="/contact"
              element={
                <RegionalRedirect page="contact" />
              }
            />

            {/* Reference */}
            <Route
              path="/US/reference"
              element={<Referencepage />}
            />

            <Route
              path="/canada/reference"
              element={<Referencepage />}
            />

            <Route
              path="/reference"
              element={
                <RegionalRedirect page="reference" />
              }
            />

            {/* Privacy Policy */}
            <Route
              path="/US/privacy-policy"
              element={<PrivacyPolicy />}
            />

            <Route
              path="/canada/privacy-policy"
              element={<PrivacyPolicy />}
            />

            <Route
              path="/privacy-policy"
              element={
                <RegionalRedirect page="privacy-policy" />
              }
            />

            {/* Terms and Conditions */}
            <Route
              path="/US/terms-and-conditions"
              element={<TermsConditions />}
            />

            <Route
              path="/canada/terms-and-conditions"
              element={<TermsConditions />}
            />

            <Route
              path="/terms-and-conditions"
              element={
                <RegionalRedirect page="terms-and-conditions" />
              }
            />

            {/* Policies */}
            <Route
              path="/US/policies"
              element={<PoliciesPage />}
            />

            <Route
              path="/canada/policies"
              element={<PoliciesPage />}
            />

            <Route
              path="/policies"
              element={
                <RegionalRedirect page="policies" />
              }
            />

            {/* Canada-only AODA */}
            <Route
              path="/canada/aoda-compliance"
              element={<AodaCompliance />}
            />

            <Route
              path="/aoda-compliance"
              element={
                <Navigate
                  to="/canada/aoda-compliance"
                  replace
                />
              }
            />

            {/* Old portfolio detail URL */}
            <Route
              path="/portfoliodetails/:slug"
              element={<Portfoliodetails />}
            />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
