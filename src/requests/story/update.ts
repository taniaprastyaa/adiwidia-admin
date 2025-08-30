import { z } from "zod";
import { useStoryStore } from "@/stores/storyStore";
import type { UpdateStory } from "@/types";

const updateStorySchema = z.object({
  id: z.number().int({ message: "ID cerita harus berupa angka bulat" }),
  title: z.string().min(2, { message: "Judul cerita minimal 2 karakter" }).trim(),
  province_id: z.number().int({ message: "Provinsi harus berupa angka bulat" }),
  content_text: z.string().nullable().optional(),
  content_video_url: z
    .string()
    .url({ message: "URL video tidak valid" })
    .nullable()
    .optional(),
});

export async function updateStoryRequest(storyData: UpdateStory) {
  const result = updateStorySchema.safeParse(storyData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const cleanedData: UpdateStory = {
    ...result.data,
    content_text: result.data.content_text ?? null,
    content_video_url: result.data.content_video_url ?? null,
  };

  try {
    await useStoryStore.getState().updateStory(cleanedData);
    return { success: true, message: "Cerita berhasil diperbarui" };
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return {
        success: false,
        message: "Judul cerita sudah digunakan, silakan pilih judul lain",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? `Terjadi kesalahan: ${error.message}`
          : "Terjadi kesalahan saat memperbarui cerita",
    };
  }
}
