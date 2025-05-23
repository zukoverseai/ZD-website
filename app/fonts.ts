import { Inter, Audiowide } from "next/font/google";

// Clear system font for body and readable text
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// Headings font for neon/cyber effect
export const audiowide = Audiowide({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
