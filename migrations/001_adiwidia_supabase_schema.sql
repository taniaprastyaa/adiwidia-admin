-- =============================================================================
-- Adiwidia Admin — Supabase (Postgres) schema migration
-- =============================================================================
-- Apply in Supabase Dashboard → SQL Editor → New query → Run
--
-- Creates tables, views, RPCs, grants, and RLS for the admin app.
-- Keep .env as:
--   NEXT_PUBLIC_SUPABASE_URL=...
--   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
-- Then create an Auth user (email/password) to log in at /login.
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.categories (
  id              serial PRIMARY KEY,
  category_name   text NOT NULL,
  description     text,
  slug            text NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT categories_category_name_key UNIQUE (category_name),
  CONSTRAINT categories_slug_key UNIQUE (slug)
);

CREATE TABLE IF NOT EXISTS public.provinces (
  id              serial PRIMARY KEY,
  name            text NOT NULL,
  description     text,
  slug            text NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT provinces_name_key UNIQUE (name),
  CONSTRAINT provinces_slug_key UNIQUE (slug)
);

CREATE TABLE IF NOT EXISTS public.cultures (
  id              serial PRIMARY KEY,
  province_id     integer NOT NULL REFERENCES public.provinces (id) ON DELETE RESTRICT,
  category_id     integer NOT NULL REFERENCES public.categories (id) ON DELETE RESTRICT,
  name            text NOT NULL,
  content         text,
  media_url       text,
  location        text,
  maps_url        text,
  slug            text NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT cultures_name_key UNIQUE (name),
  CONSTRAINT cultures_slug_key UNIQUE (slug)
);

CREATE TABLE IF NOT EXISTS public.stories (
  id                  serial PRIMARY KEY,
  province_id         integer NOT NULL REFERENCES public.provinces (id) ON DELETE RESTRICT,
  title               text NOT NULL,
  content_text        text,
  content_video_url   text,
  slug                text NOT NULL,
  created_at          timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT stories_title_key UNIQUE (title),
  CONSTRAINT stories_slug_key UNIQUE (slug)
);

CREATE TABLE IF NOT EXISTS public.virtual_museum_items (
  id              serial PRIMARY KEY,
  province_id     integer NOT NULL REFERENCES public.provinces (id) ON DELETE RESTRICT,
  category_id     integer NOT NULL REFERENCES public.categories (id) ON DELETE RESTRICT,
  name            text NOT NULL,
  description     text,
  content         text,
  media_3d_url    text,
  slug            text NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT virtual_museum_items_name_key UNIQUE (name),
  CONSTRAINT virtual_museum_items_slug_key UNIQUE (slug)
);

-- Stub: delete guards in categoryStore / provinceStore query this table
CREATE TABLE IF NOT EXISTS public.expenses (
  id              serial PRIMARY KEY,
  category_id     integer REFERENCES public.categories (id) ON DELETE SET NULL,
  province_id     integer REFERENCES public.provinces (id) ON DELETE SET NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_cultures_province_id
  ON public.cultures (province_id);
CREATE INDEX IF NOT EXISTS idx_cultures_category_id
  ON public.cultures (category_id);
CREATE INDEX IF NOT EXISTS idx_cultures_created_at
  ON public.cultures (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_stories_province_id
  ON public.stories (province_id);
CREATE INDEX IF NOT EXISTS idx_stories_created_at
  ON public.stories (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_virtual_museum_items_province_id
  ON public.virtual_museum_items (province_id);
CREATE INDEX IF NOT EXISTS idx_virtual_museum_items_category_id
  ON public.virtual_museum_items (category_id);
CREATE INDEX IF NOT EXISTS idx_virtual_museum_items_created_at
  ON public.virtual_museum_items (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_categories_created_at
  ON public.categories (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_provinces_created_at
  ON public.provinces (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_expenses_category_id
  ON public.expenses (category_id);
CREATE INDEX IF NOT EXISTS idx_expenses_province_id
  ON public.expenses (province_id);

-- ---------------------------------------------------------------------------
-- Views (used by cultureStore / storyStore / virtualMuseumItemStore)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.view_cultures_with_category_province
WITH (security_invoker = true)
AS
SELECT
  c.id,
  c.province_id,
  c.category_id,
  c.name,
  c.content,
  c.media_url,
  c.location,
  c.maps_url,
  c.slug,
  c.created_at,
  cat.category_name,
  p.name AS province_name
FROM public.cultures c
JOIN public.categories cat ON cat.id = c.category_id
JOIN public.provinces p ON p.id = c.province_id;

CREATE OR REPLACE VIEW public.view_stories_with_province
WITH (security_invoker = true)
AS
SELECT
  s.id,
  s.province_id,
  s.title,
  s.content_text,
  s.content_video_url,
  s.slug,
  s.created_at,
  p.name AS province_name
FROM public.stories s
JOIN public.provinces p ON p.id = s.province_id;

CREATE OR REPLACE VIEW public.view_virtual_museum_items_with_category_province
WITH (security_invoker = true)
AS
SELECT
  v.id,
  v.province_id,
  v.category_id,
  v.name,
  v.description,
  v.content,
  v.media_3d_url,
  v.slug,
  v.created_at,
  cat.category_name,
  p.name AS province_name
FROM public.virtual_museum_items v
JOIN public.categories cat ON cat.id = v.category_id
JOIN public.provinces p ON p.id = v.province_id;

-- ---------------------------------------------------------------------------
-- Statistic RPCs (used by statisticStore)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.get_total_categories()
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT count(*)::bigint FROM public.categories;
$$;

CREATE OR REPLACE FUNCTION public.get_total_cultures()
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT count(*)::bigint FROM public.cultures;
$$;

CREATE OR REPLACE FUNCTION public.get_total_stories()
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT count(*)::bigint FROM public.stories;
$$;

CREATE OR REPLACE FUNCTION public.get_total_virtual_museum_items()
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT count(*)::bigint FROM public.virtual_museum_items;
$$;

CREATE OR REPLACE FUNCTION public.get_cultures_added_last_12_months()
RETURNS TABLE (
  culture_year integer,
  culture_month_number integer,
  culture_month_name text,
  culture_count bigint
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  WITH months AS (
    SELECT
      date_trunc('month', (current_date - (g || ' months')::interval))::date AS month_start
    FROM generate_series(11, 0, -1) AS g
  )
  SELECT
    EXTRACT(YEAR FROM m.month_start)::integer AS culture_year,
    EXTRACT(MONTH FROM m.month_start)::integer AS culture_month_number,
    to_char(m.month_start, 'FMMonth') AS culture_month_name,
    count(c.id)::bigint AS culture_count
  FROM months m
  LEFT JOIN public.cultures c
    ON date_trunc('month', c.created_at)::date = m.month_start
  GROUP BY m.month_start
  ORDER BY m.month_start;
$$;

CREATE OR REPLACE FUNCTION public.get_total_cultures_per_category()
RETURNS TABLE (
  category_id integer,
  category_name text,
  culture_count bigint
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT
    cat.id AS category_id,
    cat.category_name,
    count(c.id)::bigint AS culture_count
  FROM public.categories cat
  LEFT JOIN public.cultures c ON c.category_id = cat.id
  GROUP BY cat.id, cat.category_name
  ORDER BY cat.category_name;
$$;

-- ---------------------------------------------------------------------------
-- Grants (Supabase roles)
-- ---------------------------------------------------------------------------

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
  public.categories,
  public.provinces,
  public.cultures,
  public.stories,
  public.virtual_museum_items,
  public.expenses
TO anon, authenticated, service_role;

GRANT SELECT ON TABLE
  public.view_cultures_with_category_province,
  public.view_stories_with_province,
  public.view_virtual_museum_items_with_category_province
TO anon, authenticated, service_role;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public
TO anon, authenticated, service_role;

GRANT EXECUTE ON FUNCTION public.get_total_categories() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_total_cultures() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_total_stories() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_total_virtual_museum_items() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_cultures_added_last_12_months() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_total_cultures_per_category() TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO anon, authenticated, service_role;

-- ---------------------------------------------------------------------------
-- RLS — admin app uses authenticated session after login
-- ---------------------------------------------------------------------------

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provinces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_museum_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- categories
DROP POLICY IF EXISTS "categories_select_authenticated" ON public.categories;
DROP POLICY IF EXISTS "categories_insert_authenticated" ON public.categories;
DROP POLICY IF EXISTS "categories_update_authenticated" ON public.categories;
DROP POLICY IF EXISTS "categories_delete_authenticated" ON public.categories;

CREATE POLICY "categories_select_authenticated" ON public.categories
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "categories_insert_authenticated" ON public.categories
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "categories_update_authenticated" ON public.categories
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "categories_delete_authenticated" ON public.categories
  FOR DELETE TO authenticated USING (true);

-- provinces
DROP POLICY IF EXISTS "provinces_select_authenticated" ON public.provinces;
DROP POLICY IF EXISTS "provinces_insert_authenticated" ON public.provinces;
DROP POLICY IF EXISTS "provinces_update_authenticated" ON public.provinces;
DROP POLICY IF EXISTS "provinces_delete_authenticated" ON public.provinces;

CREATE POLICY "provinces_select_authenticated" ON public.provinces
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "provinces_insert_authenticated" ON public.provinces
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "provinces_update_authenticated" ON public.provinces
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "provinces_delete_authenticated" ON public.provinces
  FOR DELETE TO authenticated USING (true);

-- cultures
DROP POLICY IF EXISTS "cultures_select_authenticated" ON public.cultures;
DROP POLICY IF EXISTS "cultures_insert_authenticated" ON public.cultures;
DROP POLICY IF EXISTS "cultures_update_authenticated" ON public.cultures;
DROP POLICY IF EXISTS "cultures_delete_authenticated" ON public.cultures;

CREATE POLICY "cultures_select_authenticated" ON public.cultures
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "cultures_insert_authenticated" ON public.cultures
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "cultures_update_authenticated" ON public.cultures
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "cultures_delete_authenticated" ON public.cultures
  FOR DELETE TO authenticated USING (true);

-- stories
DROP POLICY IF EXISTS "stories_select_authenticated" ON public.stories;
DROP POLICY IF EXISTS "stories_insert_authenticated" ON public.stories;
DROP POLICY IF EXISTS "stories_update_authenticated" ON public.stories;
DROP POLICY IF EXISTS "stories_delete_authenticated" ON public.stories;

CREATE POLICY "stories_select_authenticated" ON public.stories
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "stories_insert_authenticated" ON public.stories
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "stories_update_authenticated" ON public.stories
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "stories_delete_authenticated" ON public.stories
  FOR DELETE TO authenticated USING (true);

-- virtual_museum_items
DROP POLICY IF EXISTS "virtual_museum_items_select_authenticated" ON public.virtual_museum_items;
DROP POLICY IF EXISTS "virtual_museum_items_insert_authenticated" ON public.virtual_museum_items;
DROP POLICY IF EXISTS "virtual_museum_items_update_authenticated" ON public.virtual_museum_items;
DROP POLICY IF EXISTS "virtual_museum_items_delete_authenticated" ON public.virtual_museum_items;

CREATE POLICY "virtual_museum_items_select_authenticated" ON public.virtual_museum_items
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "virtual_museum_items_insert_authenticated" ON public.virtual_museum_items
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "virtual_museum_items_update_authenticated" ON public.virtual_museum_items
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "virtual_museum_items_delete_authenticated" ON public.virtual_museum_items
  FOR DELETE TO authenticated USING (true);

-- expenses (count-only reads from delete guards)
DROP POLICY IF EXISTS "expenses_select_authenticated" ON public.expenses;
DROP POLICY IF EXISTS "expenses_insert_authenticated" ON public.expenses;
DROP POLICY IF EXISTS "expenses_update_authenticated" ON public.expenses;
DROP POLICY IF EXISTS "expenses_delete_authenticated" ON public.expenses;

CREATE POLICY "expenses_select_authenticated" ON public.expenses
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "expenses_insert_authenticated" ON public.expenses
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "expenses_update_authenticated" ON public.expenses
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "expenses_delete_authenticated" ON public.expenses
  FOR DELETE TO authenticated USING (true);

COMMIT;
