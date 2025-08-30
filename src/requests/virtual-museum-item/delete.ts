import { z } from "zod";
import { useVirtualMuseumItemStore } from "@/stores/virtualMuseumItemStore";

const idSchema = z.number().int({ message: "ID virtual museum item tidak valid" });

export async function deleteVirtualMuseumItemRequest(itemId: number) {
  const result = idSchema.safeParse(itemId);

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  try {
    await useVirtualMuseumItemStore.getState().deleteItem(result.data);
    return { success: true, message: "Item virtual museum berhasil dihapus" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? `Terjadi kesalahan: ${error.message}`
          : "Terjadi kesalahan saat menghapus item virtual museum",
    };
  }
}
