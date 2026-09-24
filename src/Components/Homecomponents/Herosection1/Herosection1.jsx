import CanadaVideo from "../../../assets/home/new-videos/canada-video.mp4";
import CanadaVideoPoster from "@optimized/home/new-videos/canada-video-poster.webp";
import AccessibleHeroVideo from "./AccessibleHeroVideo";

export default function Herosection1() {
  return <AccessibleHeroVideo src={CanadaVideo} poster={CanadaVideoPoster} regionLabel="Canada" />;
}
