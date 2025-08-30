"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableActions } from "@/components/dashboard/datatable/datatable-actions"
import type { Province } from "@/types";


type ProvinceColumnsProps = {
  actions?: (row: Province) => { label: string; onClick: () => void }[]
}

export function getProvinceColumns({ actions }: ProvinceColumnsProps): ColumnDef<Province>[] {
  return [
    {
      accessorKey: "name",
      header: "Nama Provinsi",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "description",
      header: "Deskripsi",
    },
    {
      id: "actions",
      cell: ({ row }) =>
        actions ? <DataTableActions row={row.original} actions={actions(row.original)} /> : null,
    },
  ]
}