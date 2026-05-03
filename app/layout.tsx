import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import "@/app/globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "MANITO Official Store",
  description:
    "Bilingual EN/VI MANITO-inspired storefront",
};

const savoyCaps = localFont({
  src: [
    {
      path: "../public/fonts/SavoyCaps.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SavoyCaps.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-savoycaps",
  display: "swap",
});

const optima = localFont({
  src: [
    {
      path: "../public/fonts/Optima-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Optima-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Optima-600.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Optima-900.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-optima",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${savoyCaps.variable} ${optima.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
