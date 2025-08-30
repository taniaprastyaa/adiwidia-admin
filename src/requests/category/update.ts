import { z } from "zod";
import { useCategoryStore } from "@/stores/categoryStore";
import type { UpdateCategory } from "@/types";

const updateCategorySchema = z.object({
  id: z.number().int({ message: "ID kategori harus berupa angka bulat" }),
  category_name: z
    .string()
    .min(2, { message: "Nama kategori minimal 2 karakter" })
    .trim()
    .optional(),
  description: z.string().nullable().optional(),
});

export async function updateCategoryRequest(
  categoryData: Partial<Omit<UpdateCategory, "slug">> & { id: number }
) {
  const result = updateCategorySchema.safeParse(categoryData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  const cleanedData: Partial<Omit<UpdateCategory, "slug">> & { id: number } = {
    id: result.data.id,
    ...(result.data.category_name && { category_name: result.data.category_name }),
    description: result.data.description ?? null,
  };

  try {
    await useCategoryStore.getState().updateCategory(cleanedData);
    return { success: true, message: "Kategori berhasil diubah" };
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return {
        success: false,
        message: "Nama kategori sudah digunakan, silakan pilih nama lain",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? `Terjadi kesalahan: ${error.message}`
          : "Terjadi kesalahan saat mengubah kategori",
    };
  }
}
