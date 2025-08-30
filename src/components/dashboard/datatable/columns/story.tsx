"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableActions } from "@/components/dashboard/datatable/datatable-actions"
import type { Story } from "@/types"

type StoryColumnsProps = {
  actions?: (row: Story) => { label: string; onClick: () => void }[]
}

export function getStoryColumns({
  actions,
}: StoryColumnsProps): ColumnDef<Story>[] {
  return [
    {
      accessorKey: "title",
      header: "Judul Cerita",
      cell: ({ row }) => (
        <div className="font-medium line-clamp-1">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">{row.getValue("slug")}</div>
      ),
    },
    {
      accessorKey: "province_name",
      header: "Provinsi",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue("province_name") ?? "-"}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Dibuat Pada",
      cell: ({ row }) => {
        const date = row.getValue("created_at") as string | null
        return (
          <div className="text-sm text-muted-foreground">
            {date ? new Date(date).toLocaleDateString("id-ID") : "-"}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) =>
        actions ? (
          <DataTableActions
            row={row.original}
            actions={actions(row.original)}
          />
        ) : null,
    },
  ]
}
