import Newspage from "../Newspage/Newspage";
import usNewsBanner from "../../assets/UsNewsPageBanner.jpeg";

export default function USNewsPage() {
  return <Newspage bannerImage={usNewsBanner} mobileBanner={usNewsBanner} />;
}
