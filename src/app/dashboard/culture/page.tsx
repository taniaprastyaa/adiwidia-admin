"use client";

import { useState, useEffect } from "react";
import { useCultureStore } from "@/stores/cultureStore";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { getCultureColumns } from "@/components/dashboard/datatable/columns/culture";
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
import { DeleteCultureDialog } from "@/components/dashboard/forms/culture/delete";

export default function CulturePage() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { cultures, fetchCultures, loading } = useCultureStore();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCultureId, setSelectedCultureId] = useState(0);
  const [selectedCultureName, setSelectedCultureName] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        await fetchCultures();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Gagal memuat data budaya"
        );
      }
    };
    load();
  }, [fetchCultures]);

  const table = useReactTable({
    data: cultures,
    columns: getCultureColumns({
      actions: (row) => [
        {
          label: "Lihat Detail",
          onClick: () => router.push(`/dashboard/culture/${row.id}`),
        },
        {
          label: "Ubah",
          onClick: () => router.push(`/dashboard/culture/${row.id}/update`),
        },
        {
          label: "Hapus",
          onClick: () => {
            setSelectedCultureId(row.id);
            setSelectedCultureName(row.name);
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
          <CardTitle>Daftar Budaya</CardTitle>
          <div className="flex gap-5 items-center mt-2">
            <TableSearch value={globalFilter} onChange={setGlobalFilter} />
            <Button asChild>
              <Link href="/dashboard/culture/create">
                <IconPlus className="w-5 h-5 mr-2" />
                Tambah Budaya
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
                columnsLength={getCultureColumns({}).length}
              />
              <DataTablePagination table={table} />
            </>
          )}
        </CardContent>
      </Card>

      <DeleteCultureDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        cultureId={selectedCultureId}
        cultureName={selectedCultureName}
      />
    </div>
  );
}
