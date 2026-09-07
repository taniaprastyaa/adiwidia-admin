import { supabaseClient } from "@/utils/supabase";
import { assertValidPanoramaFile } from "@/lib/content-security";

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
  assertValidPanoramaFile(file);

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg";
  const path = `${Date.now()}-${sanitizeFileName(file.name.replace(/\.[^.]+$/, ""))}.${safeExt}`;

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
