"use client";

import { useState, useEffect } from "react";
import { useMuseumSceneStore } from "@/stores/museumSceneStore";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { getMuseumSceneColumns } from "@/components/dashboard/datatable/columns/museum";
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
import { DeleteMuseumSceneDialog } from "@/components/dashboard/forms/museum/delete";

export default function MuseumPage() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { scenes, fetchScenes, loading } = useMuseumSceneStore();
  const router = useRouter();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSceneId, setSelectedSceneId] = useState(0);
  const [selectedSceneName, setSelectedSceneName] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        await fetchScenes();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Gagal memuat data museum scenes"
        );
      }
    };
    load();
  }, [fetchScenes]);

  const table = useReactTable({
    data: scenes,
    columns: getMuseumSceneColumns({
      actions: (row) => [
        {
          label: "Lihat Detail",
          onClick: () => router.push(`/dashboard/museum/${row.id}`),
        },
        {
          label: "Ubah",
          onClick: () => router.push(`/dashboard/museum/${row.id}/update`),
        },
        {
          label: "Hapus",
          onClick: () => {
            setSelectedSceneId(row.id);
            setSelectedSceneName(row.name);
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
          <CardTitle>Museum — Virtual Tour 360</CardTitle>
          <div className="flex gap-5 items-center mt-2">
            <TableSearch value={globalFilter} onChange={setGlobalFilter} />
            <Button asChild>
              <Link href="/dashboard/museum/create">
                <IconPlus className="w-5 h-5 mr-2" />
                Tambah Scene
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
                columnsLength={getMuseumSceneColumns({}).length}
              />
              <DataTablePagination table={table} />
            </>
          )}
        </CardContent>
      </Card>

      <DeleteMuseumSceneDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        sceneId={selectedSceneId}
        sceneName={selectedSceneName}
      />
    </div>
  );
}
