# Adiwidia Admin

Adiwidia adalah platform edukatif-interaktif untuk memperkenalkan, melestarikan, dan menghidupkan kembali kekayaan budaya Nusantara melalui teknologi digital.

Aplikasi **Adiwidia Admin** adalah backend management system untuk mengelola data budaya, cerita rakyat, koleksi museum virtual, dan scene virtual tour 360°.

## Fitur utama

- CRUD **budaya (cultures)** beserta kategori & provinsi
- CRUD **cerita (stories)** berbasis provinsi
- CRUD **virtual museum items** (media 3D)
- CRUD **museum scenes** (panorama 360°, deskripsi, AI context)
- Manajemen **categories** dan **provinces**
- Dashboard statistik (total data, chart budaya per bulan, distribusi per kategori)

## Spesifikasi lingkungan pengujian

| Komponen | Versi / keterangan |
| --- | --- |
| OS | Linux, macOS, atau Windows 10/11 |
| Node.js | **20.x LTS** atau **22.x** (disarankan) |
| npm | **10.x** atau lebih baru |
| Framework | Next.js **15.4** (App Router) |
| Runtime UI | React **19** |
| Bahasa | TypeScript **5** |
| Database & Auth | Supabase (PostgreSQL + Auth + Storage) |
| Browser uji | Chrome / Edge / Firefox versi terkini |
| Port lokal | `http://localhost:3000` |

Perintah verifikasi cepat:

```bash
node -v   # contoh: v22.x
npm -v    # contoh: 10.x
```

## Instalasi

### 1. Clone & install dependensi

```bash
git clone <url-repo-adiwidia-admin>
cd adiwidia-admin
npm install
```

### 2. Konfigurasi environment

Buat file `.env` di root proyek:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Nilai diambil dari Supabase Dashboard → **Project Settings → API**.

### 3. Siapkan database (Supabase SQL Editor)

Jalankan migrasi berurutan sesuai kebutuhan:

| Urutan | File | Fungsi |
| --- | --- | --- |
| 1 | `migrations/001_adiwidia_supabase_schema.sql` | Schema, view, RPC, RLS admin |
| 2 | `migrations/002_adiwidia_supabase_seed.sql` | Seed data awal (TRUNCATE tabel inti) |
| 3 | `migrations/003_museum_scenes.sql` | Tabel museum scenes |
| 4 | `migrations/005_museum_panorama_storage.sql` | Bucket Storage panorama |
| 5 | `migrations/004_museum_scenes_seed.sql` | Seed scene museum (opsional) |
| 6 | `migrations/006_anon_select_all.sql` | Policy SELECT untuk role `anon` |
| 7 | `migrations/007_replace_stories_from_seed.sql` | Timpa ulang data `stories` saja |

> **Catatan:** `002` melakukan `TRUNCATE` pada tabel inti. Jangan jalankan di database produksi yang sudah berisi data penting. Untuk update cerita saja, gunakan `007`.

### 4. Buat user admin (Auth)

Di Supabase Dashboard → **Authentication → Users → Add user**:

1. Pilih **Create new user**
2. Isi **email** dan **password**
3. Gunakan kredensial tersebut untuk login di `/login`

## Cara menjalankan aplikasi

### Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Tanpa session, akses `/dashboard` akan diarahkan ke `/login`.

### Production build (lokal)

```bash
npm run build
npm start
```

### Script lain

```bash
npm run lint
```

## Akun demo

Login memakai **Supabase Auth** (email + password) di [http://localhost:3000/login](http://localhost:3000/login).

Kredensial demo disimpan lokal di `demo-account.txt` (file ini **di-gitignore**, tidak di-commit).

```bash
cp demo-account.example.txt demo-account.txt
# lalu sesuaikan email/password di demo-account.txt
```

Pastikan user yang sama sudah dibuat di Supabase Dashboard → **Authentication → Users**.

## Struktur database (ringkas)

- `categories` — kategori budaya
- `provinces` — daftar provinsi
- `cultures` — data budaya
- `stories` — cerita rakyat / legenda
- `virtual_museum_items` — koleksi museum 3D
- `museum_scenes` — scene virtual tour 360°
- `expenses` — stub untuk guard delete di admin

View utama: `view_cultures_with_category_province`, `view_stories_with_province`, `view_virtual_museum_items_with_category_province`.

## Teknologi

- [Next.js](https://nextjs.org/) — App Router
- [Supabase](https://supabase.com/) — database, autentikasi, storage
- [Zustand](https://zustand-demo.pmnd.rs/) — state management
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [shadcn/ui](https://ui.shadcn.com/) — komponen UI
- [TipTap](https://tiptap.dev/) — rich text editor (konten cerita/budaya)
