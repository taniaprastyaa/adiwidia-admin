-- =============================================================================
-- Adiwidia Admin — RLS: anon can SELECT all public tables + image bucket
-- =============================================================================
-- Jalankan di Supabase SQL Editor setelah 001–005.
-- INSERT / UPDATE / DELETE tetap hanya untuk role authenticated.
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- categories
DROP POLICY IF EXISTS "categories_select_anon" ON public.categories;
CREATE POLICY "categories_select_anon" ON public.categories
  FOR SELECT TO anon USING (true);

-- provinces
DROP POLICY IF EXISTS "provinces_select_anon" ON public.provinces;
CREATE POLICY "provinces_select_anon" ON public.provinces
  FOR SELECT TO anon USING (true);

-- cultures
DROP POLICY IF EXISTS "cultures_select_anon" ON public.cultures;
CREATE POLICY "cultures_select_anon" ON public.cultures
  FOR SELECT TO anon USING (true);

-- stories
DROP POLICY IF EXISTS "stories_select_anon" ON public.stories;
CREATE POLICY "stories_select_anon" ON public.stories
  FOR SELECT TO anon USING (true);

-- virtual_museum_items
DROP POLICY IF EXISTS "virtual_museum_items_select_anon" ON public.virtual_museum_items;
CREATE POLICY "virtual_museum_items_select_anon" ON public.virtual_museum_items
  FOR SELECT TO anon USING (true);

-- expenses
DROP POLICY IF EXISTS "expenses_select_anon" ON public.expenses;
CREATE POLICY "expenses_select_anon" ON public.expenses
  FOR SELECT TO anon USING (true);

-- museum_scenes
DROP POLICY IF EXISTS "museum_scenes_select_anon" ON public.museum_scenes;
CREATE POLICY "museum_scenes_select_anon" ON public.museum_scenes
  FOR SELECT TO anon USING (true);

-- ---------------------------------------------------------------------------
-- Storage — bucket museum-panoramas (gambar panorama)
-- ---------------------------------------------------------------------------

UPDATE storage.buckets
SET public = true
WHERE id = 'museum-panoramas';

DROP POLICY IF EXISTS "museum_panoramas_select_anon" ON storage.objects;
CREATE POLICY "museum_panoramas_select_anon"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'museum-panoramas');

COMMIT;
