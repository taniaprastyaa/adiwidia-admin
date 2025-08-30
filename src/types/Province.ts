export interface Province {
  id: number;
  name: string;
  description?: string | null;
  slug: string;
}

export type NewProvince = Omit<Province, 'id' | 'created_at'>;

export type UpdateProvince = Partial<Omit<Province, 'id' | 'created_at'>> & {
  id: number;
};