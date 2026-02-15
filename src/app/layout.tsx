import type { Metadata } from "next";
import { Geist, Geist_Mono, Playwrite_BE_VLG } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playwrite = Playwrite_BE_VLG({
  weight: ["100", "200", "300", "400"], 
  style: ["normal"], 
  display: "swap",  
  variable: "--font-playwrite", // tambahin biar bisa dipakai di className
});

export const metadata: Metadata = {
  title: "Dashboard Admin Adiwidia - Budaya Inovasi Digital",
  description: "Adiwidia: Platform digital interaktif untuk melestarikan budaya Indonesia melalui inovasi dan eksplorasi virtual.",
  openGraph: {
    title: "Dashboard Admin Adiwidia - Budaya Inovasi Digital",
    description: "Adiwidia: Platform digital interaktif untuk melestarikan budaya Indonesia melalui inovasi dan eksplorasi virtual.",
    url: "https://adiwidia-admin.vercel.app/",
    siteName: "Adiwidia",
    images: [
      {
        url: "/favicon/android-chrome-512x512.png",
        width: 1200,
        height: 1200,
        alt: "Adiwidia Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon/favicon.ico",
  },
  other: {
    "apple-mobile-web-app-title": "Adiwidia",
  },
  manifest: "/favicon/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playwrite.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
