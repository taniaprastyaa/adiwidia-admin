
import ChartAreaCulture from "@/components/dashboard/chart-area-culture"
import { ChartPieCulturePerCategory } from "@/components/dashboard/pie-cart-category"
import { SectionCards } from "@/components/dashboard/section-cards"

export default function DashboardPage() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chart Area di kiri - lebih luas */}
          <div className="flex-1">
            <ChartAreaCulture />
          </div>

          {/* Pie Chart di kanan - lebih kecil */}
          <div className="w-full lg:w-[300px]">
            <ChartPieCulturePerCategory />
          </div>
        </div>
      </div>
    </>
  )
}
