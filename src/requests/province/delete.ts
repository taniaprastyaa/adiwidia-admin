import { z } from "zod";
import { useProvinceStore } from "@/stores/provinceStore";

const idSchema = z.number().int({ message: "ID provinsi tidak valid" });

export async function deleteProvinceRequest(provinceId: number) {
  const result = idSchema.safeParse(provinceId);

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  try {
    await useProvinceStore.getState().deleteProvince(result.data);
    return { success: true, message: "Provinsi berhasil dihapus" };
  } catch (error) {
    if (error instanceof Error && error.message === "PROVINCE_USED_IN_EXPENSES") {
      return {
        success: false,
        message: "Provinsi tidak dapat dihapus karena sudah digunakan dalam produksi",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? `Terjadi kesalahan: ${error.message}`
          : "Terjadi kesalahan saat menghapus provinsi",
    };
  }
}
