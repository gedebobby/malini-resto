import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/layout/Navbar";
import ReservationFooter from "@/src/components/layout/ReservationFooter";
import SmoothScrollProvider from "@/src/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "malini uluwatu — Seafood, Indonesian Restaurant & Sunset Cliff Bar",
  description:
    "Wood-fired ocean catch, authentic Indonesian archipelago cuisine, and handcrafted sunset cocktails on the limestone cliffs of Uluwatu, Bali.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} h-full antialiased overflow-x-clip max-w-full`}
    >
      <body className="min-h-full flex flex-col bg-[#f4f3e7] text-[#0e150e] overflow-x-clip max-w-full">
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <ReservationFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
