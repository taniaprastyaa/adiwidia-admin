export interface Culture {
  id: number;
  province_id: number;
  category_id: number;
  name: string;
  content?: string | null;
  media_url?: string | null;
  location?: string | null;
  maps_url?: string | null;
  slug: string;
  category_name?: string;
  province_name?: string;
}

export type NewCulture = Omit<Culture, 'id' | 'created_at'>;

export type UpdateCulture = Partial<Omit<Culture, 'id' | 'created_at'>> & {
  id: number;
};
