import USVideo from "../../../assets/home/new-videos/usa-video.mp4";
import USVideoPoster from "@optimized/home/new-videos/usa-video-poster.webp";
import AccessibleHeroVideo from "./AccessibleHeroVideo";

export default function USHerosection1() {
  return <AccessibleHeroVideo src={USVideo} poster={USVideoPoster} regionLabel="United States" />;
}
