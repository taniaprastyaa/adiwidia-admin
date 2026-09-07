import { z } from "zod";
import { useStoryStore } from "@/stores/storyStore";
import type { UpdateStory } from "@/types";
import {
  optionalHtmlContent,
  optionalYouTubeUrl,
  requiredTitle,
} from "@/lib/content-security";

const updateStorySchema = z.object({
  id: z.number().int({ message: "ID cerita harus berupa angka bulat" }),
  title: requiredTitle(2, "Judul cerita"),
  province_id: z.number().int({ message: "Provinsi harus berupa angka bulat" }),
  content_text: optionalHtmlContent(),
  content_video_url: optionalYouTubeUrl,
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
