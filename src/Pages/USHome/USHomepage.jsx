import React from "react";

import HeaderSticky from "../../Components/Header/HeaderSticky";
import MobileHeader from "../../Components/Header/MobileHeader";
import USHerosection1 from "../../Components/Homecomponents/Herosection1/USHerosection1";
import Stepsectionnew from "../../Components/Homecomponents/Stepssection/Stepsectionnew";
import FlipCard from "../../Components/Homecomponents/FlipCard/FlipCard";
import ExpertiseSection from "../../Components/Homecomponents/SectorsWeBuildFor/ExpertiseSection";
import Herosection3 from "../../Components/Homecomponents/Herosection2/Herosection3";
import Contactsection from "../../Components/Homecomponents/Contactsection/Contactsection";
import Footers from "../../Components/Footers/Footers";
import MobileFooters from "../../Components/Footers/MobileFooters";
import ScrollToTop from "../../Components/ScrollToTop/ScrollTop";

const USHomepage = () => {
  return (
    <div>
      <HeaderSticky />
      <MobileHeader />

      <USHerosection1 />
      <Stepsectionnew />
      <FlipCard />
      <ExpertiseSection />
      <Herosection3 />

      <Contactsection region="us" />

      <Footers />
      <MobileFooters />
      <ScrollToTop />
    </div>
  );
};

export default USHomepage;