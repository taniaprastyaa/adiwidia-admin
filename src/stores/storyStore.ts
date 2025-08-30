import { create } from "zustand";
import type { Story, NewStory, UpdateStory } from "@/types";
import { supabaseClient } from "@/utils/supabase";
import { generateSlug } from "@/utils/slug";

const supabase = supabaseClient;

interface StoryState {
  stories: Story[];
  selectedStory: Story | null;
  loading: boolean;
  loadingCrud: boolean;
  fetchStories: () => Promise<void>;
  createStory: (newStory: Omit<NewStory, "slug">) => Promise<void>;
  getStoryById: (id: number) => Promise<void>;
  updateStory: (
    updatedStory: Partial<Omit<UpdateStory, "slug" | "created_at">> & {
      id: number;
    }
  ) => Promise<void>;
  deleteStory: (id: number) => Promise<void>;
}

export const useStoryStore = create<StoryState>((set) => ({
  stories: [],
  selectedStory: null,
  loading: false,
  loadingCrud: false,

  fetchStories: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("view_stories_with_province")
      .select("*")
      .order("created_at", { ascending: false });

    set({ loading: false });

    if (error) throw new Error("Gagal mengambil data stories!");

    set({ stories: data });
  },

  createStory: async (newStoryInput) => {
    set({ loadingCrud: true });

    const slug = generateSlug(newStoryInput.title);
    const newStory = { ...newStoryInput, slug };

    const { data, error } = await supabase
      .from("stories")
      .insert(newStory)
      .select()
      .single();

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({ stories: [data, ...state.stories] }));
  },

  getStoryById: async (id) => {
    set({ loading: true });

    const { data, error } = await supabase
      .from("view_stories_with_province")
      .select("*")
      .eq("id", id)
      .single();

    set({ loading: false });

    if (error) {
      set({ selectedStory: null });
      console.error("Error fetching story:", error);
      return;
    }

    set({ selectedStory: data });
  },

  updateStory: async (updateInput) => {
    set({ loadingCrud: true });

    const { id, title, ...rest } = updateInput;
    const slug = title ? generateSlug(title) : undefined;
    const updatePayload = { ...rest, ...(title && { title, slug }) };

    const { data, error } = await supabase
      .from("stories")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      stories: state.stories.map((s) => (s.id === id ? data : s)),
      selectedStory: data,
    }));
  },

  deleteStory: async (id) => {
    set({ loadingCrud: true });

    const { error } = await supabase.from("stories").delete().eq("id", id);

    set({ loadingCrud: false });

    if (error) throw new Error(error.message);

    set((state) => ({
      stories: state.stories.filter((s) => s.id !== id),
      selectedStory:
        state.selectedStory?.id === id ? null : state.selectedStory,
    }));
  },
}));
