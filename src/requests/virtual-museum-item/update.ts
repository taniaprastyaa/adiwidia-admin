import { z } from "zod";
import { useVirtualMuseumItemStore } from "@/stores/virtualMuseumItemStore";
import type { UpdateVirtualMuseumItem } from "@/types";

const updateVirtualMuseumItemSchema = z.object({
  id: z.number().int({ message: "ID item harus berupa angka bulat" }),
  name: z
    .string()
    .min(2, { message: "Nama item minimal 2 karakter" })
    .trim(),
  province_id: z.number().int({ message: "Provinsi harus berupa angka bulat" }),
  category_id: z.number().int({ message: "Kategori harus berupa angka bulat" }),
  content: z.string().nullable().optional(),
  media_3d_url: z
    .string()
    .nullable()
    .optional(),
});

export async function updateVirtualMuseumItemRequest(
  itemData: UpdateVirtualMuseumItem
) {
  const result = updateVirtualMuseumItemSchema.safeParse(itemData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const cleanedData: UpdateVirtualMuseumItem = {
    ...result.data,
    content: result.data.content ?? null,
    media_3d_url: result.data.media_3d_url ?? null,
  };

  try {
    await useVirtualMuseumItemStore.getState().updateItem(cleanedData);
    return { success: true, message: "Item virtual museum berhasil diperbarui" };
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
          : "Terjadi kesalahan saat memperbarui item",
    };
  }
}
