import { create } from "zustand";
import type { MuseumScene, NewMuseumScene, UpdateMuseumScene } from "@/types";
import { supabaseClient } from "@/utils/supabase";
import { generateSlug } from "@/utils/slug";

const supabase = supabaseClient;

interface MuseumSceneState {
  scenes: MuseumScene[];
  selectedScene: MuseumScene | null;
  loading: boolean;
  loadingCrud: boolean;
  fetchScenes: () => Promise<void>;
  createScene: (newScene: Omit<NewMuseumScene, "slug">) => Promise<void>;
  getSceneById: (id: number) => Promise<void>;
  updateScene: (
    updatedScene: Partial<Omit<UpdateMuseumScene, "slug" | "created_at">> & {
      id: number;
    }
  ) => Promise<void>;
  deleteScene: (id: number) => Promise<void>;
}

export const useMuseumSceneStore = create<MuseumSceneState>((set) => ({
  scenes: [],
  selectedScene: null,
  loading: false,
  loadingCrud: false,

  fetchScenes: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("museum_scenes")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    set({ loading: false });

    if (error) throw new Error("Gagal mengambil data museum scenes!");

    set({ scenes: data });
  },

  createScene: async (newSceneInput) => {
    set({ loadingCrud: true });

    const slug = generateSlug(newSceneInput.name);
    const newScene = { ...newSceneInput, slug };

    const { data, error } = await supabase
      .from("museum_scenes")
      .insert(newScene)
      .select()
      .single();

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({ scenes: [data, ...state.scenes] }));
  },

  getSceneById: async (id) => {
    set({ loading: true });

    const { data, error } = await supabase
      .from("museum_scenes")
      .select("*")
      .eq("id", id)
      .single();

    set({ loading: false });

    if (error) {
      set({ selectedScene: null });
      console.error("Error fetching museum scene:", error);
      return;
    }

    set({ selectedScene: data });
  },

  updateScene: async (updateInput) => {
    set({ loadingCrud: true });

    const { id, name, ...rest } = updateInput;
    const slug = name ? generateSlug(name) : undefined;
    const updatePayload = { ...rest, ...(name && { name, slug }) };

    const { data, error } = await supabase
      .from("museum_scenes")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      scenes: state.scenes.map((s) => (s.id === id ? data : s)),
      selectedScene: data,
    }));
  },

  deleteScene: async (id) => {
    set({ loadingCrud: true });

    const { error } = await supabase.from("museum_scenes").delete().eq("id", id);

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      scenes: state.scenes.filter((s) => s.id !== id),
      selectedScene:
        state.selectedScene?.id === id ? null : state.selectedScene,
    }));
  },
}));
