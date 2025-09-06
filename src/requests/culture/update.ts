import { z } from "zod";
import { useCultureStore } from "@/stores/cultureStore";
import type { UpdateCulture } from "@/types";

const updateCultureSchema = z.object({
  id: z.number().int({ message: "ID budaya harus berupa angka bulat" }),
  name: z
    .string()
    .min(2, { message: "Nama budaya minimal 2 karakter" })
    .trim(),
  province_id: z
    .number()
    .int({ message: "Provinsi harus berupa angka bulat" }),
  category_id: z
    .number()
    .int({ message: "Kategori harus berupa angka bulat" }),
  content: z.string().nullable().optional(),
  media_url: z.string().url({ message: "URL media tidak valid" }).nullable().optional(),
  location: z.string().nullable().optional(),
  maps_url: z.string().url({ message: "URL peta tidak valid" }).nullable().optional(),
});

export async function updateCultureRequest(cultureData: UpdateCulture) {
  const result = updateCultureSchema.safeParse(cultureData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const cleanedData: UpdateCulture = {
    ...result.data,
    content: result.data.content ?? null,
    media_url: result.data.media_url ?? null,
    location: result.data.location ?? null,
  };

  try {
    await useCultureStore.getState().updateCulture(cleanedData);
    return { success: true, message: "Budaya berhasil diperbarui" };
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return {
        success: false,
        message: "Nama budaya sudah digunakan, silakan pilih nama lain",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? `Terjadi kesalahan: ${error.message}`
          : "Terjadi kesalahan saat memperbarui culture",
    };
  }
}
