import Legacypage from "../Legacypage/Legacypage";
import legacyBanner from "../../assets/legacy-canada.webp";

export default function CanadaLegacyPage() {
  return (
    <Legacypage
      bannerImage={legacyBanner}
      showFaqSection={true}
    />
  );
}