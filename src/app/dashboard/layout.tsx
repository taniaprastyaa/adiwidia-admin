import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import React from "react";
import type {Metadata} from "next";

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

export default async function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
