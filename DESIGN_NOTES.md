# 🏛️ DESIGN_NOTES.md — Studentato Emilia Redesign System

> **Arah Desain:** *Torinese Editorial Contemporary* (Arsitektural, Hangat, Manusiawi, Editorial)  
> **Tujuan:** Menghapus seluruh ciri khas template AI (orbs blur, glow neon, badge sparkles, glassmorphism berlebih, radius serba bulat gelembung, teks warna berulang tanpa ritme) dan menggantinya dengan estetika publikasi arsitektur Italia kontemporer yang elegan, otentik, dan nyaman dibaca.

---

## 1. Audit Elemen "Khas AI" yang Dihapus

| No | Elemen Lama (Khas AI) | Masalah Visual | Solusi Pengganti (Human-Crafted) |
|---|---|---|---|
| 1 | **Floating Blur Orbs** (`blur-3xl`, `bg-[#FFC83B]/20`) di Hero | Ciri paling kentara AI SaaS template | Dihapus total. Diganti dengan grid arsitektural bersih berlatar linen hangat (`#FAF8F5`). |
| 2 | **Sparkles & Badge "✨"** di headline | Elemen klise generator AI | Diganti label editorial minimalis: `RESIDENZA UNIVERSITARIA • TORINO` dengan tracking elegan. |
| 3 | **Glassmorphism Berlebih** (`backdrop-blur-md` di mana-mana) | Efek buatan AI tanpa fungsi taktil | Diganti kartu berbahan padat: putih gading kapur (`#FFFFFF`) dengan border hairline (`border-stone-200/80`). |
| 4 | **Saturasi Oranye Berulang** (About, Services, FAQ semuanya `bg-[#FA5C38]`) | Mata cepat lelah, terasa seperti template murah | Variasi ritme warna antar section: Linen Warm (`#FAF8F5`) → Warm Sandstone (`#F4EFEA`) → Torinese Slate Ink (`#181614`) → Terracotta Accent terarah. |
| 5 | **Radius Gelembung** (`rounded-3xl`, `rounded-full` di semua kartu) | Tampak seperti mainan anak / AI bubble | Radius terukur dan berwibawa: `rounded-lg` (8px) hingga `rounded-xl` (12px), garis batas tegas. |
| 6 | **Tipografi Sistem Standar Tanpa Hirarki** | Terasa datar dan mekanis | Pairing tipografi: **Playfair Display** (Heading editorial Italia) + **Plus Jakarta Sans** (Body & UI taktil). |
| 7 | **Title Tag Bawaan** (`My Google AI Studio App`) | Jejak generator AI langsung | Diperbarui menjadi `Studentato Emilia — All-Inclusive Student Living in Torino, Italy`. |

---

## 2. Palet Warna (Natural, Hangat, WCAG AA Compliant)

- **Canvas / Background:**
  - Linen Hangat Utama: `#FAF8F5`
  - Stone Sand Kontras: `#F4EFEA`
  - Deep Torinese Ink (Section malam/fitur): `#181614`
- **Tinta & Tipografi:**
  - Heading & Primary Text: `#1C1917` (Stone-900 / Warm Charcoal)
  - Secondary / Editorial Subtitle: `#57534E` (Stone-600)
  - Muted Detail / Meta: `#78716C` (Stone-500)
- **Aksen Tunggal Utama (Terracotta Italia):**
  - Brand Terracotta: `#E04D26` / `#D4421B` (Warna batu bata bersejarah Torino)
  - Ochre Warm Accent: `#D99426` (Aksen emas hangat tembaga)
- **Garis & Pembatas (Hairline):**
  - Border Ringan: `rgba(28, 25, 23, 0.08)` / `#E7E5E4`

---

## 3. Tipografi & Hirarki

- **Heading (Serif Editorial):** `'Playfair Display', Georgia, serif`
  - Karakter: Akademis, berkelas, arsitektural Italia.
  - Skala: H1 `text-4xl lg:text-5xl font-serif font-semibold tracking-tight`
  - H2 `text-3xl lg:text-4xl font-serif font-medium`
- **Body & UI (Humanist Sans):** `'Plus Jakarta Sans', system-ui, sans-serif`
  - Karakter: Jelas, bersih, spacing proporsional, nyaman dibaca mahasiswa & orang tua.

---

## 4. Layout & Komponen

- **Hero V1:** 
  - Layout asimetris 7/5 kolom: Sisi kiri fokus pada tipografi editorial + search card bertekstur arsitektural. Sisi kanan galeri foto interior berbingkai tegas dengan tag alamat resmi di Torino.
- **Kartu Kamar:** 
  - Format editorial katalog: foto bernuansa arsitektur nyata, badge harga terstruktur di sudut, spesifikasi kamar dalam tag minimalis (bukan pil gelembung).
- **FAQ:** 
  - Mengubah latar belakang dari oranye menyengat ke latar linen stone yang nyaman dibaca, dengan accordion bergaris tipis ala majalah monokrom.
- **Why Choose Us / Services:**
  - Layout dua warna dinamis dengan kontras berkelas: kartu bernomor terstruktur rapi, tanpa blur transparan sembarangan.

---

## 5. Keputusan Layout

- **V1 (Fixed Layout):** Dipakai sebagai versi permanen dan utama.
- **V2 (Editorial Mock):** Disembunyikan total dari bar utilitas publik dan panel navigasi CMS agar pengguna tidak bingung.
