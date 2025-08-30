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
      accessorKey: "media_3d_url",
      header: "Media 3D",
      cell: ({ row }) => {
        const url = row.getValue("media_3d_url") as string | null | undefined;

        return url ? (
          <a
            href={url} // pastikan TypeScript tahu ini string
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Lihat 3D
          </a>
        ) : (
          <span className="text-sm text-muted-foreground italic">Tidak ada</span>
        );
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
  ];
}
