import { loadFont as loadArchivoBlack } from "@remotion/google-fonts/ArchivoBlack";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

export const { fontFamily: titleFontFamily } = loadArchivoBlack("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const { fontFamily: bodyFontFamily } = loadPoppins("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
