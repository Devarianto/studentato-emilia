# 🏢 Studentato Emilia — Torino, Italy

Website resmi & Portal CMS Terintegrasi untuk akomodasi hunian mahasiswa di Torino, Italia (**Viale della Rimembranza 2, Torino**).

Dibangun menggunakan **React 19**, **Vite 6**, **Tailwind CSS v4**, dan **TypeScript**, dilengkapi dengan sistem **WordPress-Style Headless CMS** yang berjalan langsung tanpa memerlukan XAMPP, Apache, maupun database MySQL eksternal.

---

## ✨ Fitur Utama

### 🌐 Website Publik (`/`)
- **Desain Modern & Responsif**: Berorientasi pada kenyamanan navigasi pencari hunian mahasiswa.
- **Dukungan Multi-bahasa**: Bahasa Inggris (EN) & Italia (IT).
- **Katalog Kamar Interaktif**: Filter tipe kamar (Single Deluxe, Single Standard, Double Studio, Penthouse Suite) dengan detail fasilitas & harga bulanan.
- **Hero & Layanan Terintegrasi**: Informasi fasilitas kampus, lokasi strategis Torino, review penghuni, promo, dan FAQ.
- **Form Booking & Kontak**: Dialog pemesanan langsung terhubung dengan informasi kontak.

### 🔐 WordPress-Style CMS Portal (`/admin`)
- **Portal Terpisah**: Halaman login dan dashboard CMS terpisah dari tampilan publik.
- **Role-Based Access Control (RBAC)**:
  - `super_admin`: Akses penuh konfigurasi tema, kamar, promo, review, manajemen user, dan API server.
  - `editor`: Mengelola teks landing page, FAQ, promo, dan testimoni.
  - `room_manager`: Khusus mengelola katalog kamar, harga, dan ketersediaan.
  - `viewer`: Akses baca (*read-only*).
- **Penyimpanan Persisten Otomatis**: Perubahan disimpan otomatis ke `data/cms-data.json` melalui API backend Vite (`/api/cms`).
- **Live Theme Customizer**: Mengubah warna primer, sekunder, background, font, hingga Custom CSS secara *real-time*.

---

## 🚀 Cara Menjalankan di Komputer Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas)
- npm (bawaan Node.js)

### Langkah-langkah
1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/<username>/<nama-repo>.git
   cd studentato-emilia
   ```

2. **Pasang dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```

4. **Akses di browser:**
   - **Website Publik**: [http://localhost:3000](http://localhost:3000)
   - **CMS Admin Portal**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔑 Akun Login CMS Bawaan

| Role | Username | Password | Deskripsi Akses |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin` | `admin123` | Akses penuh seluruh modul & pengaturan tema |
| **Editor** | `editor` | `editor123` | Mengelola konten, promo, FAQ, & review |
| **Room Manager** | `rooms` | `rooms123` | Mengelola data kamar & fasilitas |
| **Viewer** | `viewer` | `viewer123` | Hanya melihat data tanpa izin ubah |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State & Data**: React Context + Local JSON Storage (`data/cms-data.json`)

---

## 📁 Struktur Direktori

```text
studentato-emilia/
├── data/
│   └── cms-data.json          # File database persisten CMS
├── src/
│   ├── components/            # Komponen UI (Header, Hero, Rooms, CMSAdminPanel, dll.)
│   ├── context/               # CMSContext (state manajemen & backend API bridge)
│   ├── data/                  # Data mock awal & tipe default
│   ├── types.ts               # Definisi TypeScript interface & tipe data
│   ├── App.tsx                # Routing utama (/ vs /admin)
│   ├── index.css              # Konfigurasi Tailwind CSS v4
│   └── main.tsx               # Entry point aplikasi React
├── index.html                 # Template HTML utama
├── package.json               # Konfigurasi dependensi & script npm
├── tsconfig.json              # Konfigurasi TypeScript compiler
└── vite.config.ts             # Konfigurasi Vite & middleware plugin API backend
```

---

## 📄 Lisensi
Hak Cipta © 2025 Studentato Emilia. Seluruh hak cipta dilindungi.
