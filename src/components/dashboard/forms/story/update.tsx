"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useStoryStore } from "@/stores/storyStore";
import { useProvinceStore } from "@/stores/provinceStore";
import { updateStoryRequest } from "@/requests/story/update";

export default function UpdateStoryForm() {
  const router = useRouter();
  const { id } = useParams();
  const storyId = Number(id);

  const { selectedStory, getStoryById } = useStoryStore();
  const { provinces, fetchProvinces } = useProvinceStore();

  const [title, setTitle] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [contentText, setContentText] = useState("<p></p>");
  const [contentVideoUrl, setContentVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  useEffect(() => {
    if (storyId) getStoryById(storyId);
  }, [storyId, getStoryById]);

  useEffect(() => {
    if (selectedStory) {
      setTitle(selectedStory.title || "");
      setProvinceId(String(selectedStory.province_id) || "");
      setContentText(selectedStory.content_text || "<p></p>");
      setContentVideoUrl(selectedStory.content_video_url || "");
    }
  }, [selectedStory]);

  const handleSubmit = async () => {
    if (!title || !provinceId) {
      toast.error("Judul dan provinsi wajib diisi");
      return;
    }

    setLoading(true);
    const result = await updateStoryRequest({
      id: storyId,
      title,
      province_id: parseInt(provinceId),
      content_text: contentText || null,
      content_video_url: contentVideoUrl || null,
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
        <div>
          <label className="block text-sm font-medium mb-1">Judul Cerita</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul cerita"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Provinsi</label>
          <Select value={provinceId} onValueChange={setProvinceId}>
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

        <div className="space-y-2">
          <label className="block text-sm font-medium">Konten Teks</label>
          <div className="border rounded">
            <SimpleEditor value={contentText} onChange={setContentText} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL Video</label>
          <Input
            value={contentVideoUrl}
            onChange={(e) => setContentVideoUrl(e.target.value)}
            placeholder="https://contoh.com/video.mp4"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </form>
    </div>
  );
}
