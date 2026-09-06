-- =============================================================================
-- Adiwidia Admin — Supabase Storage bucket for museum panoramas
-- =============================================================================
-- Jalankan di SQL Editor setelah 003_museum_scenes.sql
-- Bucket publik: museum-panoramas
-- =============================================================================

BEGIN;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'museum-panoramas',
  'museum-panoramas',
  true,
  52428800, -- 50 MB (panorama bisa besar)
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public read (landing + admin preview)
DROP POLICY IF EXISTS "museum_panoramas_public_read" ON storage.objects;
CREATE POLICY "museum_panoramas_public_read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'museum-panoramas');

-- Authenticated upload
DROP POLICY IF EXISTS "museum_panoramas_authenticated_insert" ON storage.objects;
CREATE POLICY "museum_panoramas_authenticated_insert"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'museum-panoramas');

-- Authenticated update (replace)
DROP POLICY IF EXISTS "museum_panoramas_authenticated_update" ON storage.objects;
CREATE POLICY "museum_panoramas_authenticated_update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'museum-panoramas')
WITH CHECK (bucket_id = 'museum-panoramas');

-- Authenticated delete
DROP POLICY IF EXISTS "museum_panoramas_authenticated_delete" ON storage.objects;
CREATE POLICY "museum_panoramas_authenticated_delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'museum-panoramas');

COMMIT;
