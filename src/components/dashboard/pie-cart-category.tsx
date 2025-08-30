"use client"

import { useEffect, useState } from "react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useStatisticStore } from "@/stores/statisticStore"

function getColorVariants(baseHex: string, alphaLevels: number[]) {
  const rgb = hexToRgb(baseHex)
  if (!rgb) return []
  return alphaLevels.map((alpha) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`)
}

function hexToRgb(hex: string) {
  let sanitizedHex = hex.replace('#', '')
  if (sanitizedHex.length === 3) {
    sanitizedHex = sanitizedHex.split('').map((c) => c + c).join('')
  }

  const bigint = parseInt(sanitizedHex, 16)
  if (isNaN(bigint)) return null

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}

export function ChartPieCulturePerCategory() {
  const { culturesPerCategory, fetchCulturesPerCategory } = useStatisticStore()

  const [colors, setColors] = useState<string[]>([])

  useEffect(() => {
    fetchCulturesPerCategory()

    // gunakan variasi alpha untuk #C79023
    const alphaVariants = [1, 0.85, 0.7, 0.55, 0.4, 0.25]
    const newColors = getColorVariants("#C79023", alphaVariants)
    setColors(newColors)
  }, [fetchCulturesPerCategory])

  const chartData = culturesPerCategory.map((item, idx) => ({
    category: item.category_name,
    count: item.culture_count,
    fill: colors[idx % colors.length],
  }))

  const chartConfig = Object.fromEntries(
    chartData.map((d) => [
      d.category,
      {
        label: d.category,
        color: d.fill,
      },
    ])
  ) as ChartConfig

  chartConfig["count"] = { label: "Jumlah Budaya" }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Budaya per Kategori</CardTitle>
        <CardDescription>Distribusi budaya berdasarkan kategori</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              label
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
