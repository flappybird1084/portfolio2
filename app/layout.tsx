import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import KnotBackground from "./components/KnotBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { profile } from "./lib/data";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  display: "swap",
  variable: "--font-archivo",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
});

const url = "https://rianbutala.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: profile.title,
    template: "%s · Rian Butala",
  },
  description: profile.shortBio,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url,
    title: profile.title,
    description: profile.shortBio,
    images: [{ url: "/img/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.title,
    description: profile.shortBio,
    images: ["/img/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`}>
      <body className="font-mono text-paper min-h-screen overflow-x-hidden">
        {/* Spinning torus-knot backdrop sits behind everything */}
        <KnotBackground />

        {/* Content floats over the knot */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
