import { z } from "zod";
import { useStoryStore } from "@/stores/storyStore";

const idSchema = z.number().int({ message: "ID cerita tidak valid" });

export async function deleteStoryRequest(storyId: number) {
  const result = idSchema.safeParse(storyId);

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  try {
    await useStoryStore.getState().deleteStory(result.data);
    return { success: true, message: "Cerita berhasil dihapus" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? `Terjadi kesalahan: ${error.message}`
          : "Terjadi kesalahan saat menghapus cerita",
    };
  }
}
