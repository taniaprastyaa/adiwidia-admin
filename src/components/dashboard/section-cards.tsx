"use client";

import { useEffect } from "react";
import { useStatisticStore } from "@/stores/statisticStore";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  const {
    totalCategories,
    totalCultures,
    totalStories,
    totalVirtualMuseumItems,
    fetchTotals,
    loading,
  } = useStatisticStore();

  useEffect(() => {
    fetchTotals();
  }, [fetchTotals]);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Categories */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Kategori</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : totalCategories}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Jumlah kategori budaya yang tersedia
        </CardFooter>
      </Card>

      {/* Total Cultures */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Budaya</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : totalCultures}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Data budaya yang terdaftar di sistem
        </CardFooter>
      </Card>

      {/* Total Stories */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Cerita</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : totalStories}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Cerita rakyat yang sudah dikumpulkan
        </CardFooter>
      </Card>

      {/* Total Virtual Museum Items */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Koleksi Museum Virtual</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : totalVirtualMuseumItems}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Koleksi benda budaya dalam museum virtual
        </CardFooter>
      </Card>
    </div>
  );
}
