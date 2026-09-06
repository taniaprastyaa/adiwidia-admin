"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableActions } from "@/components/dashboard/datatable/datatable-actions";
import type { MuseumScene } from "@/types";

type MuseumSceneColumnsProps = {
  actions?: (row: MuseumScene) => { label: string; onClick: () => void }[];
};

export function getMuseumSceneColumns({
  actions,
}: MuseumSceneColumnsProps): ColumnDef<MuseumScene>[] {
  return [
    {
      accessorKey: "sort_order",
      header: "Urutan",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("sort_order")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Nama Bagian",
      cell: ({ row }) => (
        <div className="font-medium line-clamp-1">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <div className="font-medium line-clamp-1">{row.getValue("slug")}</div>
      ),
    },
    {
      accessorKey: "is_published",
      header: "Status",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue("is_published") ? "Published" : "Draft"}
        </div>
      ),
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
  ];
}
