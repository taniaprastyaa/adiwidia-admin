import { z } from "zod";
import { useMuseumSceneStore } from "@/stores/museumSceneStore";

const idSchema = z.number().int({ message: "ID museum scene tidak valid" });

export async function deleteMuseumSceneRequest(sceneId: number) {
  const result = idSchema.safeParse(sceneId);

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  try {
    await useMuseumSceneStore.getState().deleteScene(result.data);
    return { success: true, message: "Scene museum berhasil dihapus" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? `Terjadi kesalahan: ${error.message}`
          : "Terjadi kesalahan saat menghapus scene museum",
    };
  }
}
