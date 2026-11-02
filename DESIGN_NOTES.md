# 🏛️ DESIGN_NOTES.md — Studentato Emilia Modern Redesign System

> **Arah Desain:** *Modern Torinese Contemporary (Vibrant, Bold, High-Energy)*  
> **Karakter:** Modern, dinamis, segar, dan berwibawa khas hunian mahasiswa internasional di Torino. Mempertahankan warna identitas utama **Orange (`#FA5C38`)** dan **Aksen Kuning (`#FFC83B`)** secara tegas dan bersemangat, tanpa terasa kuno/klasik.

---

## 1. Tipografi Modern (Menggantikan Font Klasik)

- **Headings & Display:** `'Outfit', sans-serif`
  - Karakter: Geometrik modern, bersih, punchy, bold, kontemporer (ala brand arsitektur dan teknologi modern Eropa).
  - Skala: `text-4xl lg:text-6xl font-heading font-extrabold tracking-tight`
- **Body & Antarmuka:** `'Plus Jakarta Sans', sans-serif`
  - Karakter: Ergonomis, mudah dibaca, proporsional, ramah pengguna mobile.

---

## 2. Palet Warna Brand (Oranye & Kuning Cerah Dipertahankan Penuh)

- **Aksen Utama (Vibrant Orange):** `#FA5C38`
  - Dipakai pada tombol aksi utama, sorotan headline, tag harga, dan kartu penawaran promo.
- **Aksen Sekunder (Sun Yellow):** `#FFC83B`
  - Dipakai pada badge kamar, nomor fasilitas, bintang rating, dan penanda visual penting.
- **Latar Belakang:** `#FFF8F0` (Linen cerah hangat alami)
- **Footer (Satu-satunya yang gelap):** `#181614` (Deep Torinese Charcoal sesuai arahan pengguna)

---

## 3. Peningkatan Aksesibilitas Mobile untuk Detail Kamar (Room Modal)

- **Sticky Close Button (Tanda Silang):** Tombol silang [X] berukuran 40x40px yang **selalu menempel di pojok kanan atas** layar mobile saat pengguna scroll ke bawah.
- **Header Modal Mobile:** Bar judul atas yang tetap terlihat (*sticky*) agar tidak membingungkan pengguna.
- **Tutup Cepat:** Bisa menutup modal dengan tap area luar (*backdrop click*) atau tombol [Tutup Detail] di bagian bawah formulir.
