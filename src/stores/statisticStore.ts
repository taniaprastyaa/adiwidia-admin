import { create } from "zustand";
import { supabaseClient } from "@/utils/supabase";

const supabase = supabaseClient;

// --- Interface untuk data per bulan
interface MonthlyCultureStat {
  culture_year: number;
  culture_month_number: number;
  culture_month_name: string;
  culture_count: number;
}

// --- Interface untuk data per kategori
interface CulturePerCategoryStat {
  category_id: number;
  category_name: string;
  culture_count: number;
}

// --- State utama
interface StatisticState {
  totalCategories: number;
  totalCultures: number;
  totalStories: number;
  totalVirtualMuseumItems: number;
  culturesLast12Months: MonthlyCultureStat[];
  culturesPerCategory: CulturePerCategoryStat[];
  loading: boolean;

  fetchTotals: () => Promise<void>;
  fetchCulturesLast12Months: () => Promise<void>;
  fetchCulturesPerCategory: () => Promise<void>;
}

export const useStatisticStore = create<StatisticState>((set) => ({
  totalCategories: 0,
  totalCultures: 0,
  totalStories: 0,
  totalVirtualMuseumItems: 0,
  culturesLast12Months: [],
  culturesPerCategory: [],
  loading: false,

  // Fetch total (untuk 4 card di dashboard)
  fetchTotals: async () => {
    set({ loading: true });

    const [
      { data: totalCategories, error: err1 },
      { data: totalCultures, error: err2 },
      { data: totalStories, error: err3 },
      { data: totalVirtualMuseumItems, error: err4 },
    ] = await Promise.all([
      supabase.rpc("get_total_categories"),
      supabase.rpc("get_total_cultures"),
      supabase.rpc("get_total_stories"),
      supabase.rpc("get_total_virtual_museum_items"),
    ]);

    set({ loading: false });

    if (err1 || err2 || err3 || err4) {
      console.error("Error fetchTotals:", { err1, err2, err3, err4 });
      throw new Error("Gagal mengambil data total statistik!");
    }

    set({
      totalCategories: totalCategories ?? 0,
      totalCultures: totalCultures ?? 0,
      totalStories: totalStories ?? 0,
      totalVirtualMuseumItems: totalVirtualMuseumItems ?? 0,
    });
  },

  // Fetch budaya 12 bulan terakhir (untuk area chart)
  fetchCulturesLast12Months: async () => {
    set({ loading: true });

    const { data, error } = await supabase.rpc("get_cultures_added_last_12_months");

    set({ loading: false });

    if (error) {
      console.error("Error fetchCulturesLast12Months:", error);
      throw new Error("Gagal mengambil statistik budaya 12 bulan terakhir!");
    }

    set({ culturesLast12Months: data || [] });
  },

  // Fetch budaya per kategori (untuk pie chart)
  fetchCulturesPerCategory: async () => {
    set({ loading: true });

    const { data, error } = await supabase.rpc("get_total_cultures_per_category");

    set({ loading: false });

    if (error) {
      console.error("Error fetchCulturesPerCategory:", error);
      throw new Error("Gagal mengambil data budaya per kategori!");
    }

    set({ culturesPerCategory: data || [] });
  },
}));
