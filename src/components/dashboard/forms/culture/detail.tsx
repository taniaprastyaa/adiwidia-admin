"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useCultureStore } from "@/stores/cultureStore";

export default function CultureDetailForm() {
  const { id } = useParams();
  const { selectedCulture, getCultureById, loading } = useCultureStore();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      getCultureById(Number(id));
    }
  }, [id, getCultureById]);

  useEffect(() => {
    if (selectedCulture) {
      setContent(selectedCulture.content || "");
    }
  }, [selectedCulture]);

  if (loading || !selectedCulture) {
    return <p>Memuat data...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Nama Culture */}
      <div>
        <label className="block text-sm font-medium mb-1">Nama Budaya</label>
        <Input value={selectedCulture.name || "-"} readOnly />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <Input value={selectedCulture.slug || "-"} readOnly />
      </div>

      {/* Kategori */}
      <div>
        <label className="block text-sm font-medium mb-1">Kategori</label>
        <Input value={selectedCulture.category_name || "-"} readOnly />
      </div>

      {/* Provinsi */}
      <div>
        <label className="block text-sm font-medium mb-1">Provinsi</label>
        <Input value={selectedCulture.province_name || "-"} readOnly />
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

      {/* Media */}
      <div>
        <label className="block text-sm font-medium mb-1">Media</label>
        {selectedCulture.media_url ? (
          <img
            src={selectedCulture.media_url}
            alt={selectedCulture.name}
            className="rounded-md shadow-md max-h-64 object-contain"
          />
        ) : (
          <p className="text-sm text-muted-foreground italic">Tidak ada media</p>
        )}
      </div>

      {/* Location Culture */}
      <div>
        <label className="block text-sm font-medium mb-1">Lokasi (Jika Destinasi Budaya)</label>
        <Input value={selectedCulture.location || "-"} readOnly />
      </div>

      {/* Maps URL */}
      <div>
        <label className="block text-sm font-medium mb-1">Maps URL</label>
        {selectedCulture.maps_url ? (
          <a
            href={selectedCulture.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            {selectedCulture.maps_url}
          </a>
        ) : (
          <p className="text-sm text-muted-foreground italic">Tidak ada Maps URL</p>
        )}
      </div>

    </div>
  );
}
