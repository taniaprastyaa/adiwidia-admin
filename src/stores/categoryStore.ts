import { create } from "zustand";
import type { Category, NewCategory, UpdateCategory } from "@/types";
import { supabaseClient } from "@/utils/supabase";
import { generateSlug } from "@/utils/slug";

const supabase = supabaseClient;

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  loadingCrud: boolean;
  fetchCategories: () => Promise<void>;
  createCategory: (newCategory: Omit<NewCategory, "slug">) => Promise<void>;
  getCategoryById: (id: number) => Promise<void>;
  updateCategory: (
    updatedCategory: Partial<Omit<UpdateCategory, "slug">> & { id: number }
  ) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  selectedCategory: null,
  loading: false,
  loadingCrud: false,

  // get all categories
  fetchCategories: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    set({ loading: false });

    if (error) throw new Error("Gagal mengambil data kategori!");

    set({ categories: data });
  },

  // create category (slug otomatis dari category_name)
  createCategory: async (newCategoryInput) => {
    set({ loadingCrud: true });

    const slug = generateSlug(newCategoryInput.category_name);
    const newCategory = { ...newCategoryInput, slug };

    const { data, error } = await supabase
      .from("categories")
      .insert(newCategory)
      .select()
      .single();

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      categories: [data, ...state.categories],
    }));
  },

  // get category by id
  getCategoryById: async (id) => {
    set({ loading: true });

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    set({ loading: false });

    if (error) {
      set({ selectedCategory: null });
      console.error("Error fetching category:", error);
      return;
    }

    set({ selectedCategory: data });
  },

  // update category (slug update kalau category_name diubah)
  updateCategory: async (updateInput) => {
    set({ loadingCrud: true });

    const { id, category_name, ...rest } = updateInput;
    const slug = category_name ? generateSlug(category_name) : undefined;
    const updatePayload = { ...rest, ...(category_name && { category_name, slug }) };

    const { data, error } = await supabase
      .from("categories")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      categories: state.categories.map((c) => (c.id === id ? data : c)),
      selectedCategory: data,
    }));
  },

  // delete category (cek kalau dipakai di expenses)
  deleteCategory: async (id) => {
    set({ loadingCrud: true });

    const { count, error: countError } = await supabase
      .from("expenses")
      .select("id", { count: "exact", head: true })
      .eq("category_id", id);

    if (countError) {
      set({ loadingCrud: false });
      throw new Error(countError.message);
    }

    if (count && count > 0) {
      set({ loadingCrud: false });
      throw new Error("CATEGORY_USED_IN_EXPENSES");
    }

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
      selectedCategory: state.selectedCategory?.id === id ? null : state.selectedCategory,
    }));
  },
}));
