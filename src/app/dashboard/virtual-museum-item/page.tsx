"use client";

import { useState, useEffect } from "react";
import { useVirtualMuseumItemStore } from "@/stores/virtualMuseumItemStore";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { getVirtualMuseumItemColumns } from "@/components/dashboard/datatable/columns/virtual-museum-item";
import { DataTable } from "@/components/dashboard/datatable/datatable";
import { DataTablePagination } from "@/components/dashboard/datatable/datatable-pagination";
import { TableSearch } from "@/components/dashboard/datatable/table-search";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DeleteVirtualMuseumItemDialog } from "@/components/dashboard/forms/virtual-museum-item/delete";

export default function VirtualMuseumItemPage() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { items, fetchItems, loading } = useVirtualMuseumItemStore();
  const router = useRouter();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        await fetchItems();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Gagal memuat data virtual museum items"
        );
      }
    };
    load();
  }, [fetchItems]);

  const table = useReactTable({
    data: items,
    columns: getVirtualMuseumItemColumns({
      actions: (row) => [
        {
          label: "Lihat Detail",
          onClick: () => router.push(`/dashboard/virtual-museum-item/${row.id}`),
        },
        {
          label: "Ubah",
          onClick: () =>
            router.push(`/dashboard/virtual-museum-item/${row.id}/update`),
        },
        {
          label: "Hapus",
          onClick: () => {
            setSelectedItemId(row.id);
            setSelectedItemName(row.name);
            setDeleteDialogOpen(true);
          },
        },
      ],
    }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Virtual Museum Item</CardTitle>
          <div className="flex gap-5 items-center mt-2">
            <TableSearch value={globalFilter} onChange={setGlobalFilter} />
            <Button asChild>
              <Link href="/dashboard/virtual-museum-item/create">
                <IconPlus className="w-5 h-5 mr-2" />
                Tambah Item
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Memproses...</p>
          ) : (
            <>
              <DataTable
                table={table}
                columnsLength={getVirtualMuseumItemColumns({}).length}
              />
              <DataTablePagination table={table} />
            </>
          )}
        </CardContent>
      </Card>

      <DeleteVirtualMuseumItemDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        itemId={selectedItemId}
        itemName={selectedItemName}
      />
    </div>
  );
}
