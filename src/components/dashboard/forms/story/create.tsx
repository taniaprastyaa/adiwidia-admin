"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { createStoryRequest } from "@/requests/story/create";
import { useProvinceStore } from "@/stores/provinceStore";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CreateStoryForm() {
  const router = useRouter();
  const { provinces, fetchProvinces } = useProvinceStore();

  const [provinceId, setProvinceId] = useState("");
  const [title, setTitle] = useState("");
  const [contentText, setContentText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  const handleSubmit = async () => {
    setLoading(true);

    const result = await createStoryRequest({
      title,
      province_id: parseInt(provinceId),
      content_text: contentText || null,
      content_video_url: videoUrl || null,
    });

    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      router.push("/dashboard/story");
    } else {
      toast.error(result.message);
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
        {/* Pilih Provinsi */}
        <div>
          <label className="block text-sm font-medium mb-1">Pilih Provinsi</label>
          <Select value={provinceId} onValueChange={(val) => setProvinceId(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Provinsi" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((prov) => (
                <SelectItem key={prov.id} value={String(prov.id)}>
                  {prov.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Judul Story */}
        <div>
          <label className="block text-sm font-medium mb-1">Judul Cerita</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul cerita"
          />
        </div>

        {/* Konten (SimpleEditor) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Konten Cerita</label>
          <div className="border rounded">
            <SimpleEditor value={contentText} onChange={setContentText} />
          </div>
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Video URL</label>
          <Input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://example.com/video.mp4"
          />
        </div>

        {/* Submit */}
        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Cerita"}
        </Button>
      </form>
    </div>
  );
}
