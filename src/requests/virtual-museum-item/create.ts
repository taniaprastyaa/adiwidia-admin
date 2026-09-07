import { z } from "zod";
import type { NewVirtualMuseumItem } from "@/types";
import { useVirtualMuseumItemStore } from "@/stores/virtualMuseumItemStore";
import {
  CONTENT_LIMITS,
  optionalHtmlContent,
  optionalHttpUrl,
  optionalPlainText,
  requiredName,
} from "@/lib/content-security";

const createVirtualMuseumItemSchema = z.object({
  name: requiredName(2, "Nama item"),
  description: optionalPlainText(CONTENT_LIMITS.descriptionPlain, "Deskripsi"),
  province_id: z.number().int({ message: "Provinsi harus berupa angka bulat" }),
  category_id: z.number().int({ message: "Kategori harus berupa angka bulat" }),
  content: optionalHtmlContent(),
  media_3d_url: optionalHttpUrl("URL media 3D"),
});

export async function createVirtualMuseumItemRequest(
  itemData: Omit<NewVirtualMuseumItem, "slug">
) {
  const result = createVirtualMuseumItemSchema.safeParse(itemData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const cleanedData: Omit<NewVirtualMuseumItem, "slug"> = {
    ...result.data,
    description: result.data.description ?? null,
    content: result.data.content ?? null,
    media_3d_url: result.data.media_3d_url ?? null,
  };

  try {
    await useVirtualMuseumItemStore.getState().createItem(cleanedData);
    return { success: true, message: "Item virtual museum berhasil ditambahkan" };
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return {
        success: false,
        message: "Nama item sudah digunakan, silakan pilih nama lain",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? `Terjadi kesalahan: ${error.message}`
          : "Terjadi kesalahan saat menambahkan item virtual museum",
    };
  }
}
