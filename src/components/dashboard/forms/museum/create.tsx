"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { createMuseumSceneRequest } from "@/requests/museum-scene/create";
import { uploadMuseumPanorama } from "@/utils/museum-storage";

export default function CreateMuseumSceneForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [panoramaFile, setPanoramaFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [aiContext, setAiContext] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!panoramaFile) {
      toast.error("Pilih file panorama 360 terlebih dahulu");
      return;
    }

    setLoading(true);

    try {
      const panoramaUrl = await uploadMuseumPanorama(panoramaFile);

      const result = await createMuseumSceneRequest({
        name,
        panorama_url: panoramaUrl,
        description: description || null,
        ai_context: aiContext || null,
        sort_order: parseInt(sortOrder, 10) || 0,
        is_published: isPublished,
      });

      if (result.success) {
        toast.success(result.message);
        router.push("/dashboard/museum");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal mengunggah panorama"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label className="block text-sm font-medium mb-1">Nama Bagian (selector 360)</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Lobby, Ruang Batik, Galeri Keris"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Panorama 360 (Supabase Storage)</label>
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setPanoramaFile(e.target.files?.[0] ?? null)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            File diunggah ke bucket <code>museum-panoramas</code>, lalu URL publik
            disimpan ke database.
          </p>
          {panoramaFile && (
            <p className="text-xs mt-1">Dipilih: {panoramaFile.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Deskripsi</label>
          <div className="border rounded">
            <SimpleEditor value={description} onChange={setDescription} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Konteks AI ChatBot</label>
          <Textarea
            value={aiContext}
            onChange={(e) => setAiContext(e.target.value)}
            placeholder="Pengetahuan/prompt yang dipakai chatbot untuk scene ini"
            className="min-h-[120px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Urutan tampil</label>
          <Input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="is_published"
            checked={isPublished}
            onCheckedChange={(checked) => setIsPublished(checked === true)}
          />
          <label htmlFor="is_published" className="text-sm font-medium">
            Published (tampil di landing)
          </label>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Mengunggah & menyimpan..." : "Simpan Scene"}
        </Button>
      </form>
    </div>
  );
}
