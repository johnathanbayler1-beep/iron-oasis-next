import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight:   "400",
  subsets:  ["latin"],
  variable: "--font-display",
  display:  "swap",
});

const spaceMono = Space_Mono({
  weight:   ["400", "700"],
  subsets:  ["latin"],
  variable: "--font-mono",
  display:  "swap",
});

export const metadata: Metadata = {
  title:       "Iron Oasis — Private Access. East Windsor.",
  description: "The space is entirely yours. Private access. Open 24/7. East Windsor, Ontario.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${spaceMono.variable}`}>
      <body className="antialiased overflow-x-clip bg-black text-white">
        {children}
      </body>
    </html>
  );
}
