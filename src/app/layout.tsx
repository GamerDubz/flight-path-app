import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Flight Path — Your Journey, Visualized",
  description:
    "Track your flights, visualize travel on a 3D globe, and earn gamified rewards with Flight Path.",
  keywords: ["flights", "travel", "tracker", "3D globe", "passport"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-(--color-primary) selection:text-white">
        {children}
      </body>
    </html>
  );
}
