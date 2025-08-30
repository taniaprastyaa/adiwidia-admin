import { create } from "zustand";
import type { Culture, NewCulture, UpdateCulture } from "@/types";
import { supabaseClient } from "@/utils/supabase";
import { generateSlug } from "@/utils/slug";

const supabase = supabaseClient;

interface CultureState {
  cultures: Culture[];
  selectedCulture: Culture | null;
  loading: boolean;
  loadingCrud: boolean;
  fetchCultures: () => Promise<void>;
  createCulture: (newCulture: Omit<NewCulture, "slug">) => Promise<void>;
  getCultureById: (id: number) => Promise<void>;
  updateCulture: (
    updatedCulture: Partial<Omit<UpdateCulture, "slug" | "created_at">> & {
      id: number;
    }
  ) => Promise<void>;
  deleteCulture: (id: number) => Promise<void>;
}

export const useCultureStore = create<CultureState>((set) => ({
  cultures: [],
  selectedCulture: null,
  loading: false,
  loadingCrud: false,

  fetchCultures: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("view_cultures_with_category_province")
      .select("*")
      .order("created_at", { ascending: false });

    set({ loading: false });

    if (error) throw new Error("Gagal mengambil data cultures!");

    set({ cultures: data });
  },

  createCulture: async (newCultureInput) => {
    set({ loadingCrud: true });

    const slug = generateSlug(newCultureInput.name);
    const newCulture = { ...newCultureInput, slug };

    const { data, error } = await supabase
      .from("cultures")
      .insert(newCulture)
      .select()
      .single();

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({ cultures: [data, ...state.cultures] }));
  },

  getCultureById: async (id) => {
    set({ loading: true });

    const { data, error } = await supabase
      .from("view_cultures_with_category_province")
      .select("*")
      .eq("id", id)
      .single();

    set({ loading: false });

    if (error) {
      set({ selectedCulture: null });
      console.error("Error fetching culture:", error);
      return;
    }

    set({ selectedCulture: data });
  },

  updateCulture: async (updateInput) => {
    set({ loadingCrud: true });

    const { id, name, ...rest } = updateInput;
    const slug = name ? generateSlug(name) : undefined;
    const updatePayload = { ...rest, ...(name && { name, slug }) };

    const { data, error } = await supabase
      .from("cultures")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      cultures: state.cultures.map((c) => (c.id === id ? data : c)),
      selectedCulture: data,
    }));
  },

  deleteCulture: async (id) => {
    set({ loadingCrud: true });

    const { error } = await supabase.from("cultures").delete().eq("id", id);

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      cultures: state.cultures.filter((c) => c.id !== id),
      selectedCulture:
        state.selectedCulture?.id === id ? null : state.selectedCulture,
    }));
  },
}));
