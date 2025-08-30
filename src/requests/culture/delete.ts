import { z } from "zod";
import { useCultureStore } from "@/stores/cultureStore";

const idSchema = z.number().int({ message: "ID budaya tidak valid" });

export async function deleteCultureRequest(cultureId: number) {
  const result = idSchema.safeParse(cultureId);

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  try {
    await useCultureStore.getState().deleteCulture(result.data);
    return { success: true, message: "Budaya berhasil dihapus" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? `Terjadi kesalahan: ${error.message}`
          : "Terjadi kesalahan saat menghapus culture",
    };
  }
}
