-- =============================================================================
-- Adiwidia Admin — seed museum_scenes (URL dari Supabase Storage)
-- =============================================================================
-- Prasyarat:
--   1) 003_museum_scenes.sql
--   2) 005_museum_panorama_storage.sql
--   3) Upload 5 file ke Storage bucket "museum-panoramas" (Dashboard → Storage):
--        ruangan-wayang.jpg
--        ruangan-candi-tektonik.jpg
--        ruangan-pelayaran.jpg
--        ruangan-tekstil-batik.jpg
--        ruangan-pahat-seni-kayu.jpg
--      (file ada di public/museum/ proyek ini — upload manual ke bucket)
--
-- Ganti BASE di bawah jika project Supabase berbeda.
-- =============================================================================

BEGIN;

-- Sesuaikan dengan NEXT_PUBLIC_SUPABASE_URL Anda
-- Contoh: https://llvkwvkslocqvmtapqfa.supabase.co

TRUNCATE TABLE public.museum_scenes RESTART IDENTITY CASCADE;

INSERT INTO public.museum_scenes (
  id, name, slug, panorama_url, description, ai_context, sort_order, is_published, created_at
) VALUES
(
  1,
  'Ruang Wayang & Gamelan',
  'ruang-wayang-gamelan',
  'https://llvkwvkslocqvmtapqfa.supabase.co/storage/v1/object/public/museum-panoramas/ruangan-wayang.jpg',
  '<p>Ruangan ini menampilkan koleksi <strong>Wayang Kulit</strong> di lemari kaca serta perangkat <strong>Gamelan</strong> lengkap di tengah ruang. Pengunjung dapat mengamati tokoh pewayangan dan instrumen seperti gong, saron, dan kendhang dalam suasana galeri kayu tradisional.</p>',
  'Scene: Ruang Wayang & Gamelan. Topik: Wayang Kulit, Gamelan Jawa, tokoh pewayangan, gong, saron, gender, kendhang, pertunjukan wayang. Jawab pertanyaan pengunjung tentang perbedaan wayang, fungsi gamelan, dan makna budaya Jawa. Bahasa: Indonesia, ramah edukatif.',
  1,
  true,
  '2025-09-01 10:00:00+00'
),
(
  2,
  'Ruang Candi & Tektonik',
  'ruang-candi-tektonik',
  'https://llvkwvkslocqvmtapqfa.supabase.co/storage/v1/object/public/museum-panoramas/ruangan-candi-tektonik.jpg',
  '<p>Galeri berbentuk lingkaran dengan diorama gunung api dan miniatur candi di pusat ruang. Panel informasi menjelaskan sejarah gunung api Indonesia serta artefak geologi di etalase sekitarnya.</p>',
  'Scene: Ruang Candi & Tektonik / Museum Gunungapi. Topik: gunung api Indonesia, tektonik, erupsi, miniatur Borobudur, relief batu, mineral vulkanik. Bantu pengunjung memahami hubungan geologi Nusantara dengan warisan budaya candi. Bahasa: Indonesia.',
  2,
  true,
  '2025-09-01 10:05:00+00'
),
(
  3,
  'Ruang Pelayaran Indonesia',
  'ruang-pelayaran-indonesia',
  'https://llvkwvkslocqvmtapqfa.supabase.co/storage/v1/object/public/museum-panoramas/ruangan-pelayaran.jpg',
  '<p>Galeri bahari menampilkan replika kapal layar, peta <strong>Jalur Rempah Nusantara</strong>, instrumen navigasi, serta diorama bawah laut di lantai kaca. Suasana ruang diperkuat pencahayaan biru yang menyerupai laut.</p>',
  'Scene: Ruang Pelayaran Indonesia. Topik: Jalur Rempah, kapal Pinisi, navigasi (kompas, kemudi), perdagangan rempah, diorama terumbu karang dan kapal karam. Jawab pertanyaan tentang sejarah maritim Nusantara. Bahasa: Indonesia.',
  3,
  true,
  '2025-09-01 10:10:00+00'
),
(
  4,
  'Ruang Tekstil Batik & Tenun',
  'ruang-tekstil-batik-tenun',
  'https://llvkwvkslocqvmtapqfa.supabase.co/storage/v1/object/public/museum-panoramas/ruangan-tekstil-batik.jpg',
  '<p>Galeri tekstil menampilkan koleksi kain batik dan tenun di dinding, serta demonstrasi alat tenun kayu. Ruangan terang dengan jendela besar menghadap halaman hijau, ideal untuk mengenal proses pembuatan tekstil tradisional.</p>',
  'Scene: Ruang Tekstil Batik & Tenun. Topik: perbedaan batik dan tenun, motif (parang, kawung), alat tenun tradisional, sejarah Museum Tekstil Indonesia. Bantu pengunjung memahami teknik dan makna motif. Bahasa: Indonesia.',
  4,
  true,
  '2025-09-01 10:15:00+00'
),
(
  5,
  'Ruang Pahat & Seni Kayu',
  'ruang-pahat-seni-kayu',
  'https://llvkwvkslocqvmtapqfa.supabase.co/storage/v1/object/public/museum-panoramas/ruangan-pahat-seni-kayu.jpg',
  '<p>Galeri utama bergaya arsitektur kayu dengan langit-langit berukir, lantai bermotif batik, serta koleksi lukisan dan patung di atas pedestal. Pintu kaca bertuliskan Museum menghubungkan ruang ini ke area lain.</p>',
  'Scene: Ruang Pahat & Seni Kayu. Topik: seni pahat kayu, lukisan tradisional, arsitektur joglo, motif batik pada lantai, patung dan relief. Jawab pertanyaan tentang karya seni dan elemen arsitektur ruang. Bahasa: Indonesia.',
  5,
  true,
  '2025-09-01 10:20:00+00'
);

SELECT setval(
  pg_get_serial_sequence('public.museum_scenes', 'id'),
  (SELECT MAX(id) FROM public.museum_scenes)
);

COMMIT;
