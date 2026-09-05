<div align="center">
  
  # Repost
  ### LoremIpsum
  
  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-success?style=for-the-badge)](https://[URL_DEMO])
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://[URL_REPO])
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
  
  **Submission for ITECHNO CUP 2026 - Web Development**
  
  **By Kelas Juara**
  
</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Unggulan](#-fitur-unggulan)
- [Demo & Screenshot](#-demo--screenshot)
- [Teknologi](#-teknologi)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Instalasi & Setup](#-instalasi--setup)
- [Penggunaan](#-penggunaan)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Tim Developer](#-tim-pengembang)
- [Lisensi](#-lisensi)

---

## 👥 Tim Developer

| Nama | Peran | GitHub |
|------|-------|--------|
| **Muhamad Jundi Al Hafidz** | Project Lead & Full Stack Developer | [nuuvy7](https://github.com/nuuvy7) |
| **Fauzunnajah Attamam** | Full Stack Developer | [chfjuna76-sudo](https://github.com/chfjuna76-sudo) |
| **Zariel Waleed Hidayat** | UI/UX Designer & Frontend Developer | [zarielwh04-cyber](https://github.com/zarielwh04-cyber) |

---

## 🎯 Tentang Proyek

### Latar Belakang

[Di kota-kota besar seperti Jakarta, masyarakat sering kali kesulitan untuk melaporkan masalah lingkungan, infrastruktur, atau keamanan secara efektif. Platform pelaporan yang ada bersifat vertikal (top-down) dan tidak memiliki elemen sosial yang mendorong partisipasi aktif warga. Berdasarkan data BPS 2024, tingkat partisipasi warga dalam pelaporan masalah kota masih di bawah 30%.]

### Solusi yang Ditawarkan

[REPOST menghadirkan pendekatan baru dengan menggabungkan konsep *social media* dan *crowd-reporting* dalam satu platform. Warga dapat membuat postingan laporan dengan lampiran foto, menandai lokasi kejadian di peta interaktif, dan berinteraksi dengan sesama warga melalui like, comment, dan repost — mirip dengan mekanisme viral di media sosial. Semakin banyak repost, semakin tinggi visibilitas laporan tersebut.]

### Tujuan Proyek

- 🎯 **Tujuan Utama**: [Membangun platform pelaporan warga yang terintegrasi, interaktif, dan mendorong partisipasi aktif masyarakat]
- 📊 **Target Pengguna**: [Warga kota, komunitas lokal, dan pemerintah daerah]
- 💡 **Value Proposition**: [Mekanisme repost & trending membuat laporan populer lebih cepat terlihat, fitur lokasi peta membantu identifikasi masalah secara geografis, dan sistem reputasi mendorong kontribusi berkelanjutan]

---

## ✨ Fitur Unggulan

### Fitur Utama

| Fitur | Deskripsi | Keunggulan |
|-------|-----------|------------|
| *Posting Laporan* | Buat laporan dengan judul, deskripsi, foto, dan lokasi | Lampiran foto langsung di-upload, lokasi ditandai di peta interaktif |
| *Like & Repost* | Tandai laporan yang penting dan sebarkan ke followers | Mekanisme repost membuat laporan viral, meningkatkan visibilitas masalah |
| *Komentar* | Diskusi dan beri informasi tambahan pada laporan | Membangun konteks kolaboratif di setiap laporan |
| *Sistem Flair* | Filter laporan berdasarkan wilayah Jakarta (Jaksel, Jakpus, dll) | Memudahkan warga menemukan laporan di area mereka |
| *Peta Lokasi* | Peta interaktif menggunakan OpenStreetMap/Leaflet | Visualisasi lokasi laporan secara geografis tanpa API key |
| *Trending & News* | Laporan dengan repost terbanyak muncul di sidebar | Laporan prioritas otomatis naik ke permukaan |
| *Profile & Reputasi* | Profil pengguna dengan statistik, chart, dan sistem reputasi | Mendorong konsistensi kontribusi warga |
| *Notifikasi Real-time* | Polling notifikasi setiap detik untuk like, repost, follow, komentar | Pengguna selalu mendapat update terbaru |

### Fitur Tambahan

- [*Avatar Crop*] — [Upload dan crop avatar dengan react-avatar-editor (zoom, rotate, preview)]
- [*Image Lightbox*] — [Klik foto untuk melihat dalam ukuran penuh]
- [*People You May Know*] — [Rekomendasi follow berdasarkan mutual followers]
- [*Search Unified*] — [Cari pengguna dan postingan dalam satu kolom pencarian]
- [*Help & Support*] — [Form kontak yang terhubung ke email admin]
- [*Mobile Responsive*] — [Layout horizontal scroll di mobile, FAB button untuk posting]
- [*Session Storage*] — [Sesi per-tab independen, multi-tab login tanpa konflik]
- [*Lava Lamp Background*] — [Efek visual animasi di berbagai halaman]

---


## 📸 Demo & Screenshot

### Live Demo

🔗 *[Kunjungi Website](#)* (placeholder)

### Screenshot Aplikasi

<div align="center">

*Login Page* — Glassmorphism card dengan image slider

<img src="" alt="Login" width="800"/>

*Home Feed* — Postingan dengan flair filter, trending sidebar, people you may know

<img src="" alt="Home" width="800"/>

*Profile Page* — 2-column layout dengan avatar crop, reputation chart, followers modal

<img src="" alt="Profile" width="800"/>

*Create Post* — Form dengan image upload, location map picker

<img src="" alt="Create Post" width="800"/>

*Notifications* — Notifikasi real-time dengan avatar dan icon

<img src="" alt="Notifications" width="800"/>

</div>

---

## 🛠️ Teknologi

### Tech Stack

#### Frontend
```
Framework    : React 19
Build Tool   : Vite 8
Styling      : Tailwind CSS v4 + shadcn/ui
Animation    : GSAP 3.15
Maps         : Leaflet + react-leaflet (OpenStreetMap)
HTTP Client  : Axios
Routing      : React Router DOM v7
Icons        : Lucide React
Image Crop   : react-avatar-editor
```

#### Backend
```
Runtime      : PHP 8.4
Framework    : Laravel 11
Auth         : Laravel Sanctum (Token-based)
Database     : MySQL (repost_db)
Storage      : Laravel Storage (public disk)
Email        : Laravel Mail (Gmail SMTP)
```

#### DevOps & Tools
```
Package Mgmt : Composer (backend) + npm (frontend)
Local Dev    : Laravel Herd
Code Linting : OxLint (frontend) + Laravel Pint (backend)
Testing      : PHPUnit (backend)
```

### Alasan Pemilihan Teknologi

| Teknologi | Alasan Pemilihan |
|-----------|------------------|
| *React + Vite* | Komponen reusabel, hot reload cepat, ekosistem besar |
| *Tailwind CSS v4* | Utility-first CSS, konsisten dengan desain Figma, shadcn/ui compatible |
| *GSAP* | Animasi performa tinggi untuk login slider, page transitions, scroll effects |
| *Leaflet + OpenStreetMap* | Peta gratis tanpa API key, cocok untuk proyek skala kota |
| *Laravel 11* | Framework PHP terpopuler, built-in auth, ORM kuat, struktur MVC jelas |
| *Sanctum* | Token-based auth yang ringan, cocok untuk SPA + mobile client |
| *MySQL* | Relasional database yang stabil, cocok untuk data laporan dan relasi user |

### Dependencies Utama

```json
{
  "dependencies": {
    "[package-1]": "^x.x.x",
    "[package-2]": "^x.x.x",
    "[package-3]": "^x.x.x"
  }
}
```

---

## 🏗️ Arsitektur Sistem

### System Architecture


```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (SPA)                   │
│  React 19 + Vite + Tailwind CSS + shadcn/ui         │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │   Auth   │ │   Post   │ │  Profile │ │  Notif  │ │
│  │  Module  │ │  Module  │ │  Module  │ │  Module │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬────┘ │
│       │             │            │             │    │
│       └─────────────┴────────────┴─────────────┘    │
│                         │                           │
│                    Axios (API)                      │
└─────────────────────────┬───────────────────────────┘
                          │ HTTP (Bearer Token)
┌─────────────────────────┴───────────────────────────────┐
│                   BACKEND (API)                         │
│           Laravel 11 + Sanctum + MySQL                  │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │  Auth    │ │  Post    │ │  User    │ │ Notif    │    │
│  │Controller│ │Controller│ │Controller│ │Controller│    │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘    │
│       │            │            │            │          │
│  ┌────┴────────────┴────────────┴────────────┴──────┐   │
│  │              Eloquent ORM + MySQL                │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │           Laravel Storage (Public Disk)          │   │
│  │         Avatar & Post Image Storage              │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```
#### Database Schema

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    users     │     │    posts     │     │   comments   │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id           │──┐  │ id           │──┐  │ id           │
│ name         │  │  │ user_id      │──┘  │ user_id      │──┐
│ username     │  │  │ title        │     │ post_id      │──┘
│ email        │  │  │ body         │     │ body         │
│ password     │  │  │ media_url    │     │ created_at   │
│ avatar       │  │  │ media_type   │     └──────────────┘
│ bio          │  │  │ status       │
│ role         │  │  │ latitude     │     ┌──────────────┐
│ reputation   │  │  │ longitude    │     │   follows    │
│ followers_   │  │  │ location_name│     ├──────────────┤
│   count      │  │  │ reposts_     │     │ user_id      │──┐
└──────────────┘  │  │   count      │     │ followed_    │  │
                  │  │ created_at   │     │   user_id    │──┘
┌──────────────┐  │  └──────────────┘     └──────────────┘
│    likes     │  │
├──────────────┤  │  ┌──────────────┐     ┌──────────────┐
│ id           │  │  │   reposts    │     │notifications │
│ user_id      │──┘  ├──────────────┤     ├──────────────┤
│ post_id      │─────│ user_id      │     │ id (uuid)    │
│ created_at   │     │ post_id      │     │ type         │
└──────────────┘     │ created_at   │     │ notifiable_  │
                     └──────────────┘     │   type + id  │
                                          │ data (json)  │
                     ┌──────────────┐     │ read_at      │
                     │support_tickets│    │ created_at   │
                     ├──────────────┤     └──────────────┘
                     │ id           │
                     │ user_id      │
                     │ name         │
                     │ email        │
                     │ subject      │
                     │ message      │
                     │ status       │
                     └──────────────┘
```
### Folder Structure

```
repost-backend/                    # Laravel 11 API
├── app/
│   ├── Http/Controllers/Api/      # API Controllers
│   ├── Mail/                      # Mailable classes
│   ├── Models/                    # Eloquent models
│   └── Notifications/             # Notification classes
├── database/
│   └── migrations/                # Database migrations
├── routes/
│   └── api.php                    # API routes
└── resources/views/emails/        # Email templates

repost-frontend/                   # React 19 + Vite
├── src/
│   ├── api/                       # Axios API layer
│   ├── assets/                    # Static assets & images
│   ├── components/
│   │   ├── auth/                  # Login/Register forms
│   │   ├── comments/              # Comment components
│   │   ├── effects/               # LavaLamp background
│   │   ├── layout/                # Header, Sidebar, Layout
│   │   ├── map/                   # MapPicker, MapDisplay
│   │   ├── posts/                 # PostCard, PostFeed, PostForm
│   │   └── ui/                    # shadcn/ui + custom components
│   ├── contexts/                  # AuthContext
│   └── pages/                     # Page components
└── public/                        # Static files
```

---

## ⚙️ Instalasi & Setup

### Prerequisites

Pastikan Anda telah menginstall:
- **Node.js** (v18.x atau lebih tinggi)
- **npm** / **yarn** / **pnpm**
- **[Database]** (jika diperlukan)
- **Git**

### Langkah Instalasi

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/[username]/[repo-name].git
cd [repo-name]
```

#### 2️⃣ Install Dependencies

```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan pnpm
pnpm install
```

#### 3️⃣ Setup Environment Variables

Buat file `.env` di root directory:

```env
# Database
DATABASE_URL="[connection_string]"

# Authentication
JWT_SECRET="[your_jwt_secret]"
NEXTAUTH_SECRET="[your_nextauth_secret]"

# API Keys
API_KEY="[your_api_key]"

# Other configs
NODE_ENV="development"
PORT=3000
```

#### 4️⃣ Setup Database

```bash
# Jalankan migrasi database
npm run db:migrate

# Seed data (opsional)
npm run db:seed
```

#### 5️⃣ Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

---

## 🚀 Penggunaan

### Menjalankan Aplikasi

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run start

# Run tests
npm run test

# Linting
npm run lint
```

### User Guide

#### Untuk Pengguna Umum

1. **Registrasi/Login**: [Jelaskan cara mendaftar atau login]
2. **[Fitur 1]**: [Jelaskan cara menggunakan fitur ini]
3. **[Fitur 2]**: [Jelaskan cara menggunakan fitur ini]

#### Untuk Admin

1. **Akses Admin Panel**: [Jelaskan cara mengakses]
2. **[Fungsi Admin 1]**: [Jelaskan cara menggunakan]
3. **[Fungsi Admin 2]**: [Jelaskan cara menggunakan]

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:3000/api
Production:  https://[domain]/api
```

### Endpoints

#### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

#### [Resource 1]

```http
GET    /api/[resource]       # Get all
GET    /api/[resource]/:id   # Get by ID
POST   /api/[resource]       # Create
PUT    /api/[resource]/:id   # Update
DELETE /api/[resource]/:id   # Delete
```

### Example Request

```javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});
```

📖 **[Dokumentasi API Lengkap](./docs/API.md)** _(opsional)_

---

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Test Coverage

```
Statements   : XX%
Branches     : XX%
Functions    : XX%
Lines        : XX%
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) - lihat file LICENSE untuk detail lebih lanjut.

---

<div align="center">

  **Made with ❤️ by [Nama Tim] for ITECHNO CUP 2026**

  
</div>
