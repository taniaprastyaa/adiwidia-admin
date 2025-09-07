"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableActions } from "@/components/dashboard/datatable/datatable-actions";
import type { VirtualMuseumItem } from "@/types";

type VirtualMuseumItemColumnsProps = {
  actions?: (row: VirtualMuseumItem) => { label: string; onClick: () => void }[];
};

export function getVirtualMuseumItemColumns({
  actions,
}: VirtualMuseumItemColumnsProps): ColumnDef<VirtualMuseumItem>[] {
  return [
    {
      accessorKey: "name",
      header: "Nama Item",
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
      accessorKey: "category_name",
      header: "Kategori",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue("category_name") ?? "-"}
        </div>
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
