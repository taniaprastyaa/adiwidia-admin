import { create } from "zustand";
import type {
  VirtualMuseumItem,
  NewVirtualMuseumItem,
  UpdateVirtualMuseumItem,
} from "@/types";
import { supabaseClient } from "@/utils/supabase";
import { generateSlug } from "@/utils/slug";

const supabase = supabaseClient;

interface VirtualMuseumItemState {
  items: VirtualMuseumItem[];
  selectedItem: VirtualMuseumItem | null;
  loading: boolean;
  loadingCrud: boolean;
  fetchItems: () => Promise<void>;
  createItem: (
    newItem: Omit<NewVirtualMuseumItem, "slug">
  ) => Promise<void>;
  getItemById: (id: number) => Promise<void>;
  updateItem: (
    updatedItem: Partial<Omit<UpdateVirtualMuseumItem, "slug" | "created_at">> & {
      id: number;
    }
  ) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}

export const useVirtualMuseumItemStore = create<VirtualMuseumItemState>(
  (set) => ({
    items: [],
    selectedItem: null,
    loading: false,
    loadingCrud: false,

    fetchItems: async () => {
      set({ loading: true });
      const { data, error } = await supabase
        .from("view_virtual_museum_items_with_category_province")
        .select("*")
        .order("created_at", { ascending: false });

      set({ loading: false });

      if (error) throw new Error("Gagal mengambil data virtual museum items!");

      set({ items: data });
    },

    createItem: async (newItemInput) => {
      set({ loadingCrud: true });

      const slug = generateSlug(newItemInput.name);
      const newItem = { ...newItemInput, slug };

      const { data, error } = await supabase
        .from("virtual_museum_items")
        .insert(newItem)
        .select()
        .single();

      set({ loadingCrud: false });

      if (error) throw new Error(error.message);

      set((state) => ({ items: [data, ...state.items] }));
    },

    getItemById: async (id) => {
      set({ loading: true });

      const { data, error } = await supabase
        .from("view_virtual_museum_items_with_category_province")
        .select("*")
        .eq("id", id)
        .single();

      set({ loading: false });

      if (error) {
        set({ selectedItem: null });
        console.error("Error fetching virtual museum item:", error);
        return;
      }

      set({ selectedItem: data });
    },

    updateItem: async (updateInput) => {
      set({ loadingCrud: true });

      const { id, name, ...rest } = updateInput;
      const slug = name ? generateSlug(name) : undefined;
      const updatePayload = { ...rest, ...(name && { name, slug }) };

      const { data, error } = await supabase
        .from("virtual_museum_items")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();

      set({ loadingCrud: false });

      if (error) throw new Error(error.message);

      set((state) => ({
        items: state.items.map((i) => (i.id === id ? data : i)),
        selectedItem: data,
      }));
    },

    deleteItem: async (id) => {
      set({ loadingCrud: true });

      const { error } = await supabase
        .from("virtual_museum_items")
        .delete()
        .eq("id", id);

      set({ loadingCrud: false });

      if (error) throw new Error(error.message);

      set((state) => ({
        items: state.items.filter((i) => i.id !== id),
        selectedItem:
          state.selectedItem?.id === id ? null : state.selectedItem,
      }));
    },
  })
);
