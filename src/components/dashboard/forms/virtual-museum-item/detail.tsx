"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useVirtualMuseumItemStore } from "@/stores/virtualMuseumItemStore";

export default function VirtualMuseumItemDetailForm() {
  const { id } = useParams();
  const { selectedItem, getItemById, loading } = useVirtualMuseumItemStore();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      getItemById(Number(id));
    }
  }, [id, getItemById]);

  useEffect(() => {
    if (selectedItem) {
      setContent(selectedItem.content || "");
    }
  }, [selectedItem]);

  if (loading || !selectedItem) {
    return <p>Memuat data...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Nama Item */}
      <div>
        <label className="block text-sm font-medium mb-1">Nama Item</label>
        <Input value={selectedItem.name || "-"} readOnly />
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block text-sm font-medium mb-1">Deskripsi</label>
        <div className="border rounded-md p-3 min-h-[80px] bg-white text-sm">
          {selectedItem.description || (
            <p className="text-muted-foreground italic">Tidak ada deskripsi</p>
          )}
        </div>
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <Input value={selectedItem.slug || "-"} readOnly />
      </div>

      {/* Kategori */}
      <div>
        <label className="block text-sm font-medium mb-1">Kategori</label>
        <Input value={selectedItem.category_name || "-"} readOnly />
      </div>

      {/* Provinsi */}
      <div>
        <label className="block text-sm font-medium mb-1">Provinsi</label>
        <Input value={selectedItem.province_name || "-"} readOnly />
      </div>

      {/* Konten */}
      <div>
        <label className="block text-sm font-medium mb-1">Konten</label>
        <div
          className="border rounded-md p-3 min-h-[150px] bg-white text-sm prose max-h-96 overflow-y-auto"
          dangerouslySetInnerHTML={{
            __html: content || "<p><em>Tidak ada konten</em></p>",
          }}
        />
      </div>

      {/* Media 3D */}
      <div>
        <label className="block text-sm font-medium mb-1">Media 3D</label>
        {selectedItem.media_3d_url ? (
          <a
            href={selectedItem.media_3d_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Lihat Media 3D
          </a>
        ) : (
          <p className="text-sm text-muted-foreground italic">Tidak ada media 3D</p>
        )}
      </div>

    </div>
  );
}
