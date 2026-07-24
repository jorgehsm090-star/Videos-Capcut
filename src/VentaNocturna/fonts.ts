import { loadFont as loadCinzelDecorative } from "@remotion/google-fonts/CinzelDecorative";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

export const { fontFamily: titleFontFamily } = loadCinzelDecorative("normal", {
  weights: ["700", "900"],
  subsets: ["latin"],
});

export const { fontFamily: bodyFontFamily } = loadPoppins("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
