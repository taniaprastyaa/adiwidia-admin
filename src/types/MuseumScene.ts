export interface MuseumScene {
  id: number;
  name: string;
  slug: string;
  panorama_url: string;
  description?: string | null;
  ai_context?: string | null;
  sort_order: number;
  is_published: boolean;
  created_at?: string;
}

export type NewMuseumScene = Omit<MuseumScene, 'id' | 'created_at'>;

export type UpdateMuseumScene = Partial<Omit<MuseumScene, 'id' | 'created_at'>> & {
  id: number;
};
