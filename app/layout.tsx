import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import "@/app/globals.css";
import { Cormorant } from "next/font/google";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "YAMOPAD Official Store",
  description:
    "Bilingual EN/VI YAMOPAD-inspired storefront",
};

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-savoycaps",
  display: "swap",
});

const optima = localFont({
  src: [
    {
      path: "../public/fonts/Optima-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-optima",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${optima.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
