# 🏛️ Adiwidia Admin System

Adiwidia adalah platform edukatif-interaktif untuk memperkenalkan, melestarikan, dan menghidupkan kembali kekayaan budaya Nusantara melalui teknologi digital.
Sistem ini dirancang untuk **menghubungkan generasi muda dengan akar budaya mereka** lewat konten budaya, cerita, dan koleksi museum virtual yang disajikan secara modern dan immersive.

## 🎯 Tentang Sistem Admin

Bagian **Admin Adiwidia** berfungsi sebagai backend management system untuk mengelola data budaya Nusantara. Melalui dashboard admin, pengelola dapat:

* Menambahkan, memperbarui, dan menghapus data **budaya (cultures)**
* Mengelola **cerita (stories)** terkait daerah/provinsi tertentu
* Mengatur koleksi **virtual museum items** dengan media 3D
* Mengelola **kategori** dan **provinsi** sebagai entitas utama

## 🗄️ Struktur Database

Sistem ini menggunakan Supabase sebagai layanan database & autentikasi, dengan tabel utama:

* **categories** → menyimpan kategori budaya
* **provinces** → menyimpan daftar provinsi
* **cultures** → data budaya beserta relasinya ke kategori & provinsi
* **stories** → cerita rakyat / sejarah berbasis provinsi
* **virtual\_museum\_items** → koleksi museum virtual dengan media 3D

## 📊 Statistik Dashboard

Dashboard admin dilengkapi fitur analitik:

* **Card Statistik**

  * Total Budaya
  * Total Cerita
  * Total Virtual Museum Items
  * Jumlah Kategori

* **Area Chart**

  * Menampilkan jumlah budaya per bulan

* **Pie Chart**

  * Distribusi budaya berdasarkan kategori

## 🚀 Teknologi yang Digunakan

* [Next.js](https://nextjs.org/) – framework React modern
* [Supabase](https://supabase.com/) – database, autentikasi, & API
* [Zustand](https://zustand-demo.pmnd.rs/) – state management sederhana & ringan
* [Tailwind CSS](https://tailwindcss.com/) – styling utility-first
* [shadcn/ui](https://ui.shadcn.com/) – komponen UI modern

## 🛠️ Development

Jalankan server development:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.
