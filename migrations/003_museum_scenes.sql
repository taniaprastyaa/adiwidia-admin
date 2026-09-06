-- =============================================================================
-- Adiwidia Admin — museum_scenes (Virtual Tour 360)
-- =============================================================================
-- Jalankan di Supabase SQL Editor setelah schema inti (001).
-- =============================================================================

BEGIN;

CREATE TABLE IF NOT EXISTS public.museum_scenes (
  id            serial PRIMARY KEY,
  name          text NOT NULL,
  slug          text NOT NULL,
  panorama_url  text NOT NULL,
  description   text,
  ai_context    text,
  sort_order    integer NOT NULL DEFAULT 0,
  is_published  boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT museum_scenes_name_key UNIQUE (name),
  CONSTRAINT museum_scenes_slug_key UNIQUE (slug)
);

CREATE INDEX IF NOT EXISTS idx_museum_scenes_sort_order
  ON public.museum_scenes (sort_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_museum_scenes_created_at
  ON public.museum_scenes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_museum_scenes_is_published
  ON public.museum_scenes (is_published);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.museum_scenes
  TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON SEQUENCE public.museum_scenes_id_seq
  TO anon, authenticated, service_role;

ALTER TABLE public.museum_scenes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "museum_scenes_select_authenticated" ON public.museum_scenes;
DROP POLICY IF EXISTS "museum_scenes_insert_authenticated" ON public.museum_scenes;
DROP POLICY IF EXISTS "museum_scenes_update_authenticated" ON public.museum_scenes;
DROP POLICY IF EXISTS "museum_scenes_delete_authenticated" ON public.museum_scenes;

CREATE POLICY "museum_scenes_select_authenticated" ON public.museum_scenes
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "museum_scenes_insert_authenticated" ON public.museum_scenes
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "museum_scenes_update_authenticated" ON public.museum_scenes
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "museum_scenes_delete_authenticated" ON public.museum_scenes
  FOR DELETE TO authenticated USING (true);

COMMIT;
