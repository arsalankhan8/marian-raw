import { useEffect, useState } from "react";
import "./App.css";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Lenis from "@studio-freight/lenis";

import Homepage from "./Pages/Homepage/Homepage";
import USHomepage from "./Pages/USHome/USHomepage";
import StaticPage from "./Pages/StaticPage/StaticPage";

import Portfoliopage from "./Pages/Portfoliopage/Portfoliopage";
import USPortfoliopage from "./Pages/Portfoliopage/USPortfoliopage";
import PortfolioRedirect from "./Components/PortfolioRedirect/PortfolioRedirect";

import USLegacyPage from "./Pages/US/LegacyPage";
import CanadaLegacyPage from "./Pages/Canada/LegacyPage";

import USCsrPage from "./Pages/US/Csrpage";
import CanadaCsrPage from "./Pages/Canada/Csrpage";

import Awardspage from "./Pages/Awardspage/Awardspage";
import Newspage from "./Pages/Newspage/Newspage";
import Portfoliodetails from "./Pages/Portfoliodetails/Portfoliodetails";
import Contactpage from "./Pages/Contactpage/Contactpage";
import Referencepage from "./Pages/Portfoliopage/Referencepage/Referencepage";

import PrivacyPolicy from "./Pages/Policies/PrivacyPolicy";
import TermsConditions from "./Pages/Policies/TermsConditions";
import PoliciesPage from "./Pages/Policies/PoliciesPage";
import AodaCompliance from "./Pages/Policies/AodaCompliance";

import RegionModal from "./Components/RegionSelector/RegionModal";

import Careerpage from "./Pages/Careerpage/Careerpage";

import {
  CA_PORTFOLIO_PATH,
  US_PORTFOLIO_PATH,
  getRegionPagePath,
} from "./utils/regionPaths";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function RegionalRedirect({ page }) {
  const redirectPath = getRegionPagePath(page);

  return <Navigate to={redirectPath} replace />;
}

function App() {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const savedRegion = sessionStorage.getItem("regionSelected");

    if (savedRegion) {
      setHasAccess(true);
    }
  }, []);

  const handleRegionSelect = (region) => {
    sessionStorage.setItem("regionSelected", region);
    setHasAccess(true);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    let animationFrameId;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      {!hasAccess ? (
        <RegionModal
          onSelect={handleRegionSelect}
          variant={
            window.location.pathname.toLowerCase() === "/white"
              ? "white"
              : "dark"
          }
        />
      ) : (
        <>
          <ScrollToTop />

          <Routes>

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
              path="/careers"
              element={
                <RegionalRedirect page="careers" />
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
              path={US_PORTFOLIO_PATH}
              element={<USPortfoliopage />}
            />

            <Route
              path={CA_PORTFOLIO_PATH}
              element={<Portfoliopage />}
            />

            {/* Legacy */}
            <Route
              path="/US/legacy"
              element={<USLegacyPage />}
            />

            <Route
              path="/canada/legacy"
              element={<CanadaLegacyPage />}
            />

            {/* Canada-only Awards */}
            <Route
              path="/canada/awards"
              element={<Awardspage />}
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

            {/* News */}
            <Route
              path="/US/news"
              element={<Newspage region="us" />}
            />

            <Route
              path="/canada/news"
              element={<Newspage region="canada" />}
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

            {/* Portfolio details */}
            <Route
              path="/US/portfolio/:slug"
              element={<Portfoliodetails />}
            />

            <Route
              path="/canada/portfolio/:slug"
              element={<Portfoliodetails />}
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

            {/* Privacy Policy */}
            <Route
              path="/US/privacy-policy"
              element={<PrivacyPolicy />}
            />

            <Route
              path="/canada/privacy-policy"
              element={<PrivacyPolicy />}
            />

            {/* Terms */}
            <Route
              path="/US/terms-and-conditions"
              element={<TermsConditions />}
            />

            <Route
              path="/canada/terms-and-conditions"
              element={<TermsConditions />}
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

            {/* Canada-only AODA */}
            <Route
              path="/canada/aoda-compliance"
              element={<AodaCompliance />}
            />

            {/* Legacy URL redirects */}
            <Route
              path="/legacy"
              element={
                <RegionalRedirect page="legacy" />
              }
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

            <Route
              path="/csr"
              element={
                <RegionalRedirect page="csr" />
              }
            />

            <Route
              path="/news"
              element={
                <RegionalRedirect page="news" />
              }
            />

            <Route
              path="/contact"
              element={
                <RegionalRedirect page="contact" />
              }
            />

            <Route
              path="/reference"
              element={
                <RegionalRedirect page="reference" />
              }
            />

            <Route
              path="/privacy-policy"
              element={
                <RegionalRedirect page="privacy-policy" />
              }
            />

            <Route
              path="/terms-and-conditions"
              element={
                <RegionalRedirect page="terms-and-conditions" />
              }
            />

            <Route
              path="/policies"
              element={
                <RegionalRedirect page="policies" />
              }
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

            {/* Old portfolio detail URLs */}
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