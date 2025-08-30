"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/category": "Halaman Kategori",
  "/dashboard/province": "Halaman Provinsi",
  "/dashboard/culture": "Halaman Budaya",
  "/dashboard/culture/create": "Halaman Tambah Budaya",
  "/dashboard/culture/[id]": "Halaman Detail Budaya",
  "/dashboard/culture/[id]/update": "Halaman Update Budaya",
  "/dashboard/story": "Halaman Cerita",
  "/dashboard/story/create": "Halaman Tambah Cerita",
  "/dashboard/story/[id]": "Halaman Detail Cerita",
  "/dashboard/story/[id]/update": "Halaman Update Cerita",
  "/dashboard/virtual-museum-item": "Halaman Virtual Museum Item",
  "/dashboard/virtual-museum-item/create": "Halaman Tambah Virtual Museum Item",
  "/dashboard/virtual-museum-item/[id]": "Halaman Detail Virtual Museum Item",
  "/dashboard/virtual-museum-item/[id]/update": "Halaman Update Virtual Museum Item",
}

function getDynamicTitle(pathname: string): string {
  // Culture
  if (/^\/dashboard\/culture\/[^\/]+$/.test(pathname)) {
    return pageTitles["/dashboard/culture/create"]
  }

  if (/^\/dashboard\/culture\/[^\/]+$/.test(pathname)) {
    return pageTitles["/dashboard/culture/[id]"]
  }

  if (/^\/dashboard\/culture\/[^\/]+\/update$/.test(pathname)) {
    return pageTitles["/dashboard/culture/[id]/update"]
  }

  // Story
  if (/^\/dashboard\/story\/[^\/]+$/.test(pathname)) {
    return pageTitles["/dashboard/story/create"]
  }

  if (/^\/dashboard\/story\/[^\/]+$/.test(pathname)) {
    return pageTitles["/dashboard/story/[id]"]
  }

  if (/^\/dashboard\/story\/[^\/]+\/update$/.test(pathname)) {
    return pageTitles["/dashboard/story/[id]/update"]
  }

  // Virtual Museum Item
  if (/^\/dashboard\/virtual-museum-item\/[^\/]+$/.test(pathname)) {
    return pageTitles["/dashboard/virtual-museum-item/create"]
  } 

  if (/^\/dashboard\/virtual-museum-item\/[^\/]+$/.test(pathname)) {
    return pageTitles["/dashboard/virtual-museum-item/[id]"]
  }

  if (/^\/dashboard\/virtual-museum-item\/[^\/]+\/update$/.test(pathname)) {
    return pageTitles["/dashboard/virtual-museum-item/[id]/update"]
  }

  return pageTitles[pathname] ?? "Dashboard"
}

export function SiteHeader() {
  const pathname = usePathname()
  const title = getDynamicTitle(pathname)

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  )
}
