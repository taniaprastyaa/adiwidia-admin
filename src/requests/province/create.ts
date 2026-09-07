import { z } from "zod";
import type { NewProvince } from "@/types";
import { useProvinceStore } from "@/stores/provinceStore";
import {
  CONTENT_LIMITS,
  optionalPlainText,
  requiredName,
} from "@/lib/content-security";

const createProvinceSchema = z.object({
  name: requiredName(2, "Nama provinsi"),
  description: optionalPlainText(CONTENT_LIMITS.descriptionPlain, "Deskripsi"),
});

export async function createProvinceRequest(
  provinceData: Omit<NewProvince, "slug">
) {
  const result = createProvinceSchema.safeParse(provinceData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const cleanedData: Omit<NewProvince, "slug"> = {
    ...result.data,
    description: result.data.description ?? null,
  };

  try {
    await useProvinceStore.getState().createProvince(cleanedData);
    return { success: true, message: "Provinsi berhasil ditambahkan" };
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
          : "Terjadi kesalahan saat menambahkan provinsi",
    };
  }
}
