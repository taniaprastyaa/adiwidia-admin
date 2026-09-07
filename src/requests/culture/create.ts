import { z } from "zod";
import type { NewCulture } from "@/types";
import { useCultureStore } from "@/stores/cultureStore";
import {
  CONTENT_LIMITS,
  optionalHtmlContent,
  optionalHttpUrl,
  optionalPlainText,
  requiredName,
} from "@/lib/content-security";

const createCultureSchema = z.object({
  name: requiredName(2, "Nama budaya"),
  province_id: z.number().int({ message: "Provinsi harus berupa angka bulat" }),
  category_id: z.number().int({ message: "Kategori harus berupa angka bulat" }),
  content: optionalHtmlContent(),
  media_url: optionalHttpUrl("URL media"),
  location: optionalPlainText(CONTENT_LIMITS.location, "Lokasi"),
  maps_url: optionalHttpUrl("URL peta"),
});

export async function createCultureRequest(
  cultureData: Omit<NewCulture, "slug">
) {
  const result = createCultureSchema.safeParse(cultureData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const cleanedData: Omit<NewCulture, "slug"> = {
    ...result.data,
    content: result.data.content ?? null,
    media_url: result.data.media_url ?? null,
    location: result.data.location ?? null,
    maps_url: result.data.maps_url ?? null,
  };

  try {
    await useCultureStore.getState().createCulture(cleanedData);
    return { success: true, message: "Budaya berhasil ditambahkan" };
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
          : "Terjadi kesalahan saat menambahkan culture",
    };
  }
}
