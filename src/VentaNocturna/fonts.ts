import { loadFont as loadCinzel } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

export const { fontFamily: titleFontFamily } = loadCinzel("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});

export const { fontFamily: bodyFontFamily } = loadPoppins("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
