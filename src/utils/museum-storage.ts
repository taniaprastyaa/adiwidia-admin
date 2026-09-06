import { supabaseClient } from "@/utils/supabase";

const BUCKET = "museum-panoramas";

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Upload panorama image to Supabase Storage and return its public URL.
 */
export async function uploadMuseumPanorama(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${sanitizeFileName(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;

  const { error } = await supabaseClient.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "image/jpeg",
    });

  if (error) {
    throw new Error(error.message || "Gagal mengunggah panorama ke Storage");
  }

  const { data } = supabaseClient.storage.from(BUCKET).getPublicUrl(path);

  if (!data?.publicUrl) {
    throw new Error("Gagal mendapatkan URL publik panorama");
  }

  return data.publicUrl;
}
