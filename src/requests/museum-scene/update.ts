import { z } from "zod";
import type { UpdateMuseumScene } from "@/types";
import { useMuseumSceneStore } from "@/stores/museumSceneStore";
import {
  CONTENT_LIMITS,
  optionalHtmlContent,
  optionalPlainText,
  requiredHttpUrl,
  requiredName,
} from "@/lib/content-security";

const updateMuseumSceneSchema = z.object({
  id: z.number().int({ message: "ID scene harus berupa angka bulat" }),
  name: requiredName(2, "Nama bagian"),
  panorama_url: requiredHttpUrl("URL panorama Storage"),
  description: optionalHtmlContent(),
  ai_context: optionalPlainText(CONTENT_LIMITS.aiContext, "Konteks AI"),
  sort_order: z.number().int({ message: "Urutan harus angka bulat" }),
  is_published: z.boolean(),
});

export async function updateMuseumSceneRequest(sceneData: UpdateMuseumScene) {
  const result = updateMuseumSceneSchema.safeParse(sceneData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const cleanedData: UpdateMuseumScene = {
    ...result.data,
    description: result.data.description ?? null,
    ai_context: result.data.ai_context ?? null,
  };

  try {
    await useMuseumSceneStore.getState().updateScene(cleanedData);
    return { success: true, message: "Scene museum berhasil diperbarui" };
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return {
        success: false,
        message: "Nama scene sudah digunakan, silakan pilih nama lain",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? `Terjadi kesalahan: ${error.message}`
          : "Terjadi kesalahan saat memperbarui scene museum",
    };
  }
}
