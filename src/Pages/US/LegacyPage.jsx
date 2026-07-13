import Legacypage from "../Legacypage/Legacypage";
import legacyBanner from "../../assets/sliderbanner/LegacyOfMarianiBanner.webp";

export default function USLegacyPage() {
  return (
    <Legacypage
      bannerImage={legacyBanner}
      showFaqSection={false}
    />
  );
}