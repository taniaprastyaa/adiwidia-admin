"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useMuseumSceneStore } from "@/stores/museumSceneStore";
import { updateMuseumSceneRequest } from "@/requests/museum-scene/update";
import { uploadMuseumPanorama } from "@/utils/museum-storage";

export default function UpdateMuseumSceneForm() {
  const router = useRouter();
  const { id } = useParams();
  const sceneId = Number(id);

  const { selectedScene, getSceneById } = useMuseumSceneStore();

  const [name, setName] = useState("");
  const [panoramaUrl, setPanoramaUrl] = useState("");
  const [panoramaFile, setPanoramaFile] = useState<File | null>(null);
  const [description, setDescription] = useState("<p></p>");
  const [aiContext, setAiContext] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sceneId) getSceneById(sceneId);
  }, [sceneId, getSceneById]);

  useEffect(() => {
    if (selectedScene) {
      setName(selectedScene.name || "");
      setPanoramaUrl(selectedScene.panorama_url || "");
      setDescription(selectedScene.description || "<p></p>");
      setAiContext(selectedScene.ai_context || "");
      setSortOrder(String(selectedScene.sort_order ?? 0));
      setIsPublished(selectedScene.is_published ?? true);
    }
  }, [selectedScene]);

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Nama wajib diisi");
      return;
    }

    setLoading(true);

    try {
      let nextPanoramaUrl = panoramaUrl;

      if (panoramaFile) {
        nextPanoramaUrl = await uploadMuseumPanorama(panoramaFile);
      }

      if (!nextPanoramaUrl) {
        toast.error("Panorama wajib ada (unggah file atau pastikan URL lama tersedia)");
        setLoading(false);
        return;
      }

      const result = await updateMuseumSceneRequest({
        id: sceneId,
        name,
        panorama_url: nextPanoramaUrl,
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
          {panoramaUrl && (
            <p className="text-xs mb-2">
              Saat ini:{" "}
              <a
                href={panoramaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {panoramaUrl}
              </a>
            </p>
          )}
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setPanoramaFile(e.target.files?.[0] ?? null)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Kosongkan jika tidak ingin mengganti gambar. File baru akan diunggah ke
            bucket <code>museum-panoramas</code>.
          </p>
          {panoramaFile && (
            <p className="text-xs mt-1">File baru: {panoramaFile.name}</p>
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
            id="is_published_update"
            checked={isPublished}
            onCheckedChange={(checked) => setIsPublished(checked === true)}
          />
          <label htmlFor="is_published_update" className="text-sm font-medium">
            Published (tampil di landing)
          </label>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </form>
    </div>
  );
}
