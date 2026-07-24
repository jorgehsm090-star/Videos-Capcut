import { loadFont as loadBaloo } from "@remotion/google-fonts/Baloo2";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

export const { fontFamily: titleFontFamily } = loadBaloo("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
});

export const { fontFamily: bodyFontFamily } = loadPoppins("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
