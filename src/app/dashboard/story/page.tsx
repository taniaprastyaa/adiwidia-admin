"use client";

import { useState, useEffect } from "react";
import { useStoryStore } from "@/stores/storyStore";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { getStoryColumns } from "@/components/dashboard/datatable/columns/story";
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
import { DeleteStoryDialog } from "@/components/dashboard/forms/story/delete";

export default function StoryPage() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { stories, fetchStories, loading } = useStoryStore();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState(0);
  const [selectedStoryTitle, setSelectedStoryTitle] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        await fetchStories();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Gagal memuat data story"
        );
      }
    };
    load();
  }, [fetchStories]);

  const table = useReactTable({
    data: stories,
    columns: getStoryColumns({
      actions: (row) => [
        {
          label: "Lihat Detail",
          onClick: () => router.push(`/dashboard/story/${row.id}`),
        },
        {
          label: "Ubah",
          onClick: () => router.push(`/dashboard/story/${row.id}/update`),
        },
        {
          label: "Hapus",
          onClick: () => {
            setSelectedStoryId(row.id);
            setSelectedStoryTitle(row.title);
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
          <CardTitle>Daftar Cerita</CardTitle>
          <div className="flex gap-5 items-center mt-2">
            <TableSearch value={globalFilter} onChange={setGlobalFilter} />
            <Button asChild>
              <Link href="/dashboard/story/create">
                <IconPlus className="w-5 h-5 mr-2" />
                Tambah Cerita
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
                columnsLength={getStoryColumns({}).length}
              />
              <DataTablePagination table={table} />
            </>
          )}
        </CardContent>
      </Card>

      <DeleteStoryDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        storyId={selectedStoryId}
        storyTitle={selectedStoryTitle}
      />
    </div>
  );
}
