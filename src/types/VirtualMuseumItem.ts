export interface VirtualMuseumItem {
  id: number;
  province_id: number;
  category_id: number;
  name: string;
  description?: string | null;
  content?: string | null;
  media_3d_url?: string | null;
  slug: string;
  category_name?: string;
  province_name?: string;
}

export type NewVirtualMuseumItem = Omit<VirtualMuseumItem, 'id' | 'created_at'>;

export type UpdateVirtualMuseumItem = Partial<Omit<VirtualMuseumItem, 'id' | 'created_at'>> & {
  id: number;
};
