import { z } from "zod";
import { useProvinceStore } from "@/stores/provinceStore";
import type { UpdateProvince } from "@/types";
import {
  CONTENT_LIMITS,
  optionalPlainText,
  requiredName,
} from "@/lib/content-security";

const updateProvinceSchema = z.object({
  id: z.number().int({ message: "ID provinsi harus berupa angka bulat" }),
  name: requiredName(2, "Nama provinsi").optional(),
  description: optionalPlainText(CONTENT_LIMITS.descriptionPlain, "Deskripsi"),
});

export async function updateProvinceRequest(
  provinceData: Partial<Omit<UpdateProvince, "slug">> & { id: number }
) {
  const result = updateProvinceSchema.safeParse(provinceData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const cleanedData: Partial<Omit<UpdateProvince, "slug">> & { id: number } = {
    id: result.data.id,
    ...(result.data.name && { name: result.data.name }),
    description: result.data.description ?? null,
  };

  try {
    await useProvinceStore.getState().updateProvince(cleanedData);
    return { success: true, message: "Provinsi berhasil diubah" };
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return {
        success: false,
        message: "Nama provinsi sudah digunakan, silakan pilih nama lain",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? `Terjadi kesalahan: ${error.message}`
          : "Terjadi kesalahan saat mengubah provinsi",
    };
  }
}
