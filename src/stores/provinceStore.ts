import { create } from "zustand";
import type { Province, NewProvince, UpdateProvince } from "@/types";
import { supabaseClient } from "@/utils/supabase";
import { generateSlug } from "@/utils/slug";

const supabase = supabaseClient;

interface ProvinceState {
  provinces: Province[];
  selectedProvince: Province | null;
  loading: boolean;
  loadingCrud: boolean;
  fetchProvinces: () => Promise<void>;
  createProvince: (newProvince: Omit<NewProvince, "slug">) => Promise<void>;
  getProvinceById: (id: number) => Promise<void>;
  updateProvince: (
    updatedProvince: Partial<Omit<UpdateProvince, "slug">> & { id: number }
  ) => Promise<void>;
  deleteProvince: (id: number) => Promise<void>;
}

export const useProvinceStore = create<ProvinceState>((set) => ({
  provinces: [],
  selectedProvince: null,
  loading: false,
  loadingCrud: false,

  // get all provinces
  fetchProvinces: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("provinces")
      .select("*")
      .order("created_at", { ascending: false });

    set({ loading: false });

    if (error) throw new Error("Gagal mengambil data kategori!");

    set({ provinces: data });
  },

  // create province (slug otomatis dari name)
  createProvince: async (newProvinceInput) => {
    set({ loadingCrud: true });

    const slug = generateSlug(newProvinceInput.name);
    const newProvince = { ...newProvinceInput, slug };

    const { data, error } = await supabase
      .from("provinces")
      .insert(newProvince)
      .select()
      .single();

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      provinces: [data, ...state.provinces],
    }));
  },

  // get province by id
  getProvinceById: async (id) => {
    set({ loading: true });

    const { data, error } = await supabase
      .from("provinces")
      .select("*")
      .eq("id", id)
      .single();

    set({ loading: false });

    if (error) {
      set({ selectedProvince: null });
      console.error("Error fetching province:", error);
      return;
    }

    set({ selectedProvince: data });
  },

  // update province (slug update kalau name diubah)
  updateProvince: async (updateInput) => {
    set({ loadingCrud: true });

    const { id, name, ...rest } = updateInput;
    const slug = name ? generateSlug(name) : undefined;
    const updatePayload = { ...rest, ...(name && { name, slug }) };

    const { data, error } = await supabase
      .from("provinces")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      provinces: state.provinces.map((c) => (c.id === id ? data : c)),
      selectedProvince: data,
    }));
  },

  // delete province (cek kalau dipakai di expenses)
  deleteProvince: async (id) => {
    set({ loadingCrud: true });

    const { count, error: countError } = await supabase
      .from("expenses")
      .select("id", { count: "exact", head: true })
      .eq("province_id", id);

    if (countError) {
      set({ loadingCrud: false });
      throw new Error(countError.message);
    }

    if (count && count > 0) {
      set({ loadingCrud: false });
      throw new Error("PROVINCE_USED_IN_EXPENSES");
    }

    const { error } = await supabase
      .from("provinces")
      .delete()
      .eq("id", id);

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      provinces: state.provinces.filter((c) => c.id !== id),
      selectedProvince: state.selectedProvince?.id === id ? null : state.selectedProvince,
    }));
  },
}));
