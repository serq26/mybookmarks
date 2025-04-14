import { Timestamp } from "firebase/firestore";
import { BsBrowserChrome } from "react-icons/bs";
import { FaLinkedin, FaMedium, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export const firebaseTimestampToDate = (timestamp: Timestamp) => {
  return new Date(timestamp.seconds * 1000);
};

export const getWebsiteIcon = (websiteName: string) => {
  switch (websiteName) {
    case "website_x":
      return FaSquareXTwitter;
      break;
    case "website_youtube":
      return FaYoutube;
      break;
    case "website_linkedin":
      return FaLinkedin;
      break;
    case "website_medium":
      return FaMedium;
      break;
    case "website_other":
      return BsBrowserChrome;
      break;
    default:
      return BsBrowserChrome;
      break;
  }
};
