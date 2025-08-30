import { z } from "zod";
import type { NewStory } from "@/types";
import { useStoryStore } from "@/stores/storyStore";

const createStorySchema = z.object({
  title: z.string().min(3, { message: "Judul minimal 3 karakter" }).trim(),
  province_id: z
    .number()
    .int({ message: "Provinsi harus berupa angka bulat" }),
  content_text: z.string().nullable().optional(),
  content_video_url: z
    .string()
    .url({ message: "URL video tidak valid" })
    .nullable()
    .optional(),
});

export async function createStoryRequest(storyData: Omit<NewStory, "slug">) {
  const result = createStorySchema.safeParse(storyData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const cleanedData: Omit<NewStory, "slug"> = {
    ...result.data,
    content_text: result.data.content_text ?? null,
    content_video_url: result.data.content_video_url ?? null,
  };

  try {
    await useStoryStore.getState().createStory(cleanedData);
    return { success: true, message: "Cerita berhasil ditambahkan" };
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
          : "Terjadi kesalahan saat menambahkan cerita",
    };
  }
}
