import { z } from "zod";
import type { NewMuseumScene } from "@/types";
import { useMuseumSceneStore } from "@/stores/museumSceneStore";
import {
  CONTENT_LIMITS,
  optionalHtmlContent,
  optionalPlainText,
  requiredHttpUrl,
  requiredName,
} from "@/lib/content-security";

const createMuseumSceneSchema = z.object({
  name: requiredName(2, "Nama bagian"),
  panorama_url: requiredHttpUrl("URL panorama Storage"),
  description: optionalHtmlContent(),
  ai_context: optionalPlainText(CONTENT_LIMITS.aiContext, "Konteks AI"),
  sort_order: z.number().int({ message: "Urutan harus angka bulat" }),
  is_published: z.boolean(),
});

export async function createMuseumSceneRequest(
  sceneData: Omit<NewMuseumScene, "slug">
) {
  const result = createMuseumSceneSchema.safeParse(sceneData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const cleanedData: Omit<NewMuseumScene, "slug"> = {
    ...result.data,
    description: result.data.description ?? null,
    ai_context: result.data.ai_context ?? null,
  };

  try {
    await useMuseumSceneStore.getState().createScene(cleanedData);
    return { success: true, message: "Scene museum berhasil ditambahkan" };
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
          : "Terjadi kesalahan saat menambahkan scene museum",
    };
  }
}
