import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from 'sonner';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "edbn - Your Academic Legacy, Beautifully Showcased",
  description: "Create stunning portfolio pages that highlight your academic journey, research, and achievements. Perfect for educators and professors who want to make their mark in academia.",
  keywords: ["portfolio", "academic", "educator", "professor", "research", "academic journey", "achievements", "educator portfolio", "professor portfolio", "academic portfolio", ],
  authors: [{ name: "edbn.me" }],
  creator: "edbn",
  publisher: "edbn.me",
  openGraph: {
    title: "edbn - Your Academic Legacy, Beautifully Showcased",
    description: "Create stunning portfolio pages that highlight your academic journey, research, and achievements. Perfect for educators and professors who want to make their mark in academia.",
    url: "https://edbn.me/",
    siteName: "edbn - Your Academic Legacy, Beautifully Showcased",
    images: [
      {
        url: "https://res.cloudinary.com/dfyrk32ua/image/upload/v1730137314/edbn/openGraphedbn_bzndgi.webp",
        width: 2205,
        height: 1139,
        alt: "edbn - Your Academic Legacy, Beautifully Showcased",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "edbn - Your Academic Legacy, Beautifully Showcased",
    description: "Create stunning portfolio pages that highlight your academic journey, research, and achievements. Perfect for educators and professors who want to make their mark in academia.",
    images: ["https://res.cloudinary.com/dfyrk32ua/image/upload/v1730137314/edbn/openGraphedbn_bzndgi.webp"],
    creator: "@edbn",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://edbn.me/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
