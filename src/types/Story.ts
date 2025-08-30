export interface Story {
  id: number;
  province_id: number;
  title: string;
  content_text?: string | null;
  content_video_url?: string | null;
  slug: string;
  province_name?: string;
}

export type NewStory = Omit<Story, 'id' | 'created_at'>;

export type UpdateStory = Partial<Omit<Story, 'id' | 'created_at'>> & {
  id: number;
};
