import React from "react";
import StaticCarousel from "../../Components/Homecomponents/StaticPageBanner/StaticCarousel";
import Header from "../../Components/Header/Header";
import Herosection1 from "../../Components/Homecomponents/Herosection1/Herosection1";
import Herosection2 from "../../Components/Homecomponents/Herosection2/Herosection2";
import Mapsection from "../../Components/Homecomponents/Mapsection/Mapsection";
import Contactsection from "../../Components/Homecomponents/Contactsection/Contactsection";
import Footers from "../../Components/Footers/Footers";
import MobileHeader from "../../Components/Header/MobileHeader";
import MobileFooters from "../../Components/Footers/MobileFooters";
import DynamicMaps from "../../Components/Homecomponents/Map/Dynamicmaps/Dynamicmaps";
import Stepssection from "../../Components/Homecomponents/Stepssection/Stepssection";
import HeaderSticky from "../../Components/Header/HeaderSticky";
import Stepsectionnew from "../../Components/Homecomponents/Stepssection/Stepsectionnew";
import FlipCard from "../../Components/Homecomponents/FlipCard/FlipCard";
import ExpertiseSection from "../../Components/Homecomponents/SectorsWeBuildFor/ExpertiseSection";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

const StaticPage = () => {
  return (
    <div>
      <HeaderSticky />
      <MobileHeader />
      <StaticCarousel />
      {/* <Herosection1 /> */}
      <Stepsectionnew />
      <FlipCard />
      <ExpertiseSection />
      <Herosection2 />
      {/* <Mapsection/> */}
      <Contactsection />
      <Footers />
      <MobileFooters />
      <ScrollToTop/>
    </div>
  );
};

export default StaticPage;
