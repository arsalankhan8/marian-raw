import React from "react";

import HeaderSticky from "../../Components/Header/HeaderSticky";
import MobileHeader from "../../Components/Header/MobileHeader";
import Herosection1 from "../../Components/Homecomponents/Herosection1/Herosection1";
import Stepsectionnew from "../../Components/Homecomponents/Stepssection/Stepsectionnew";
import FlipCard from "../../Components/Homecomponents/FlipCard/FlipCard";
import ExpertiseSection from "../../Components/Homecomponents/SectorsWeBuildFor/ExpertiseSection";
import Herosection2 from "../../Components/Homecomponents/Herosection2/Herosection2";
import Contactsection from "../../Components/Homecomponents/Contactsection/Contactsection";
import Footers from "../../Components/Footers/Footers";
import MobileFooters from "../../Components/Footers/MobileFooters";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

export default function Homepage() {
  return (
    <div>
      <HeaderSticky />
      <MobileHeader />

      <Herosection1 />
      <Stepsectionnew />
      <FlipCard />
      <ExpertiseSection />
      <Herosection2 />

      <Contactsection region="canada" />

      <Footers />
      <MobileFooters />
      <ScrollToTop />
    </div>
  );
}