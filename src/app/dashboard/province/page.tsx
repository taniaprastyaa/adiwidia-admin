"use client";

import { useState, useEffect } from "react";
import { useProvinceStore } from "@/stores/provinceStore";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { getProvinceColumns } from "@/components/dashboard/datatable/columns/province";
import { DataTable } from "@/components/dashboard/datatable/datatable";
import { DataTablePagination } from "@/components/dashboard/datatable/datatable-pagination";
import { TableSearch } from "@/components/dashboard/datatable/table-search";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Province } from "@/types";
import CreateProvinceModal from "@/components/dashboard/forms/province/create";
import UpdateProvinceModal from "@/components/dashboard/forms/province/update";
import { DeleteProvinceDialog } from "@/components/dashboard/forms/province/delete";


export default function ProvincePage() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { provinces, fetchProvinces, loading} = useProvinceStore();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState(0);
  const [selectedProvinceName, setSelectedProvinceName] = useState("");

  useEffect(() => {
    const getProvinces = async () => {
      try {
        await fetchProvinces();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An error occurred while retrieving province data");
        }
      }
    };
    getProvinces();
  }, [fetchProvinces]);

  const table = useReactTable({
    data: provinces,
    columns: getProvinceColumns({
      actions: (row) => [
        {
          label: "Ubah",
          onClick: () => {
            setSelectedProvince(row);
            setOpenUpdateModal(true);
          },
        },
        {
          label: "Hapus",
          onClick: async () => {
            setSelectedProvinceId(row.id);
            setSelectedProvinceName(row.name);
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
          <CardTitle>Daftar Kategori</CardTitle>
          <div className="flex gap-5 items-center mt-2">
            <TableSearch value={globalFilter} onChange={setGlobalFilter} />
            <Button onClick={() => setOpenCreateModal(true)}>
              <IconPlus className="w-5 h-5 mr-2" /> Tambah Kategori
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Memproses...</p>
          ) : (
            <>
              <DataTable table={table} columnsLength={getProvinceColumns({}).length} />
              <DataTablePagination table={table} />
            </>
          )}
        </CardContent>
      </Card>
      <CreateProvinceModal open={openCreateModal} onClose={() => setOpenCreateModal(false)} />
      <UpdateProvinceModal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)} province={selectedProvince} />
      <DeleteProvinceDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} provinceId={selectedProvinceId} provinceName={selectedProvinceName} />
    </div>
  );
}