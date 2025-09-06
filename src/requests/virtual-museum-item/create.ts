import { z } from "zod";
import type { NewVirtualMuseumItem } from "@/types";
import { useVirtualMuseumItemStore } from "@/stores/virtualMuseumItemStore";

const createVirtualMuseumItemSchema = z.object({
  name: z.string().min(2, { message: "Nama item minimal 2 karakter" }).trim(),
  province_id: z.number().int({ message: "Provinsi harus berupa angka bulat" }),
  category_id: z.number().int({ message: "Kategori harus berupa angka bulat" }),
  content: z.string().nullable().optional(),
  media_3d_url: z
    .string()
    .nullable()
    .optional(),
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
