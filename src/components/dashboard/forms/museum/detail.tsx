"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useMuseumSceneStore } from "@/stores/museumSceneStore";
import { safeHtmlForRender } from "@/lib/content-security";

export default function MuseumSceneDetailForm() {
  const { id } = useParams();
  const { selectedScene, getSceneById, loading } = useMuseumSceneStore();

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      getSceneById(Number(id));
    }
  }, [id, getSceneById]);

  useEffect(() => {
    if (selectedScene) {
      setDescription(selectedScene.description || "");
    }
  }, [selectedScene]);

  if (loading || !selectedScene) {
    return <p>Memuat data...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Nama Bagian</label>
        <Input value={selectedScene.name || "-"} readOnly />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <Input value={selectedScene.slug || "-"} readOnly />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Urutan</label>
        <Input value={String(selectedScene.sort_order ?? 0)} readOnly />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <Input
          value={selectedScene.is_published ? "Published" : "Draft"}
          readOnly
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Panorama 360</label>
        {selectedScene.panorama_url ? (
          <a
            href={selectedScene.panorama_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Buka URL panorama
          </a>
        ) : (
          <p className="text-sm text-muted-foreground italic">Tidak ada URL</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Deskripsi</label>
        <div
          className="border rounded-md p-3 min-h-[150px] bg-white text-sm prose max-h-96 overflow-y-auto"
          dangerouslySetInnerHTML={{
            __html: safeHtmlForRender(
              description,
              "<p><em>Tidak ada deskripsi</em></p>"
            ),
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Konteks AI ChatBot</label>
        <div className="border rounded-md p-3 min-h-[100px] bg-white text-sm whitespace-pre-wrap">
          {selectedScene.ai_context || (
            <p className="text-muted-foreground italic">Tidak ada konteks AI</p>
          )}
        </div>
      </div>
    </div>
  );
}
