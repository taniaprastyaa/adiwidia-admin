"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useStoryStore } from "@/stores/storyStore";
import {
  safeHtmlForRender,
  toYouTubeEmbedUrl,
} from "@/lib/content-security";

export default function StoryDetailForm() {
  const { id } = useParams();
  const { selectedStory, getStoryById, loading } = useStoryStore();

  const [contentText, setContentText] = useState("");

  useEffect(() => {
    if (id) {
      getStoryById(Number(id));
    }
  }, [id, getStoryById]);

  useEffect(() => {
    if (selectedStory) {
      setContentText(selectedStory.content_text || "");
    }
  }, [selectedStory]);

  if (loading || !selectedStory) {
    return <p>Memuat data...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Judul Story */}
      <div>
        <label className="block text-sm font-medium mb-1">Judul Story</label>
        <Input value={selectedStory.title || "-"} readOnly />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <Input value={selectedStory.slug || "-"} readOnly />
      </div>

      {/* Provinsi */}
      <div>
        <label className="block text-sm font-medium mb-1">Provinsi</label>
        <Input value={selectedStory.province_name || "-"} readOnly />
      </div>

      {/* Konten Teks */}
      <div>
        <label className="block text-sm font-medium mb-1">Konten Teks</label>
        <div
          className="border rounded-md p-3 min-h-[150px] bg-white text-sm prose max-h-96 overflow-y-auto"
          dangerouslySetInnerHTML={{
            __html: safeHtmlForRender(contentText),
          }}
        />
      </div>

      {/* Konten Video */}
      <div>
        <label className="block text-sm font-medium mb-1">Konten Video</label>
        {selectedStory.content_video_url ? (
          <div className="aspect-video rounded-md shadow-md overflow-hidden">
            <iframe
              src={toYouTubeEmbedUrl(selectedStory.content_video_url)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full"
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">Tidak ada video</p>
        )}
      </div>

    </div>
  );
}
