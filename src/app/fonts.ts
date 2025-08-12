import { Barlow, Herr_Von_Muellerhoff, Aboreto } from "next/font/google";

export const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const herr = Herr_Von_Muellerhoff({
  variable: "--font-herr",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const aboreto = Aboreto({
  variable: "--font-aboreto",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});