S<div align="center">
  
  # Repost
  ### LoremIpsum
  
  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-success?style=for-the-badge)](https://[URL_DEMO])
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://[github.com/Nuuvy7/Repost])
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

🔗 *[Kunjungi Website Repost](https://tamam.ukk-rpl.site)*

### Screenshot Aplikasi

<div align="center">

*Login Page* — Glassmorphism card dengan image slider

<img src="" alt="Login" width="800"/>

*Home Feed* — Postingan dengan flair filter, trending sidebar, people you may know

<img src="" alt="Home" width="800"/>

*Profile Page* — 2-column layout dengan avatar crop, reputation chart, followers modal

<img src="" alt="Profile" width="800"/>

*Create Post* — Form dengan image upload, location map picker

<img src="https://github.com/user-attachments/assets/c693d10c-c6f5-4558-9959-fd449aef9b01"
alt="Create Post" width="800"/>

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
- *PHP* ≥ 8.3 (via Laravel Herd / XAMPP / native)
- *Node.js* ≥ 18.x
- *MySQL* ≥ 8.0
- *Composer* ≥ 2.x
- *Git*

### Langkah Instalasi

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/nuuvy7/repost.git
cd repost
```

#### 2️⃣ Setup Backend

```bash
cd repost-backend

# Install dependencies PHP
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

#### 3️⃣ Konfigurasi .env

Buat file `.env` di root directory:

```env
env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=repost_db
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME=REPOST
```

#### 4️⃣ Setup Database

```bash
## Buat database (jika belum ada)
mysql -u root -e "CREATE DATABASE repost_db"

# Jalankan migrasi
php artisan migrate --force

# Seed data (opsional)
php artisan db:seed
```
#### 5️⃣ Setup Storage

```bash
# Buat symlink untuk storage public
php artisan storage:link
```
#### 6️⃣ Setup Frontend
```bash
cd ../repost-frontend

# Install dependencies Node
npm install
```

#### 7️⃣ Jalankan Development Server
```bash
# Terminal 1 — Backend
cd repost-backend
php artisan serve

# Terminal 2 — Frontend
cd repost-frontend
npm run dev
```

Aplikasi akan berjalan di:
- *Frontend*: http://localhost:5173
- *Backend API*: http://localhost:8000/api

---

## 🚀 Penggunaan

### Menjalankan Aplikasi

```bash
# Frontend
npm run dev       # Development mode
npm run build     # Production build
npm run preview   # Preview build

# Backend
php artisan serve          # Development server
php artisan migrate        # Run migrations
php artisan test           # Run tests
php artisan notification:table  # Setup notifications table
```

#### User Guide

#### Register & Login

1. Buka halaman /register
2. Masukkan *Username, **Email, dan **Password*
3. Setelah register, Anda akan otomatis login dan diarahkan ke Home
4. Login kembali dapat dilakukan dari halaman /login

#### Membuat Postingan

1. Klik tombol *"BUAT POSTINGAN"* (FAB di mobile) atau *"Post"* di sidebar
2. Isi judul, konten, dan lampirkan foto (opsional)
3. Tandai lokasi kejadian menggunakan peta interaktif
4. Klik *"Create Post"*

#### Berinteraksi dengan Postingan

- *Like* — Klik ikon hati untuk menyukai postingan
- *Comment* — Klik ikon komentar untuk membuka atau menulis komentar
- *Repost* — Klik ikon repost untuk menyebarkan postingan ke followers Anda

#### Mengikuti Pengguna

1. Buka profil pengguna yang ingin di-follow
2. Klik tombol *"Follow"*
3. Pengguna akan menerima notifikasi

#### Melihat Notifikasi

1. Klik ikon lonceng di header
2. Dropdown notifikasi muncul dengan update terbaru
3. Klik *"Lihat Semua Notifikasi"* untuk halaman notifikasi lengkap

#### Filter by Wilayah

1. Di sidebar (desktop) atau bagian atas feed (mobile), pilih flair wilayah
2. Pilihan: Semua, Jakut, Jaksel, Jakpus, Jaktim, Jakbar
3. Feed akan terfilter berdasarkan lokasi yang dipilih

---

## 📚 API Documentation

### Base URL

Development: http://localhost:8000/api

### Authentication

```Semua endpoint yang dilindungi memerlukan header:
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
```

### Endpoints

#### Auth

```http
POST   /api/auth/register        # Register akun baru
POST   /api/auth/login           # Login
POST   /api/auth/logout          # Logout (protected)
GET    /api/auth/me              # Get current user (protected)
POST   /api/auth/forgot-password # Kirim link reset password
POST   /api/auth/reset-password  # Reset password
```

#### Posts

```http
GET    /api/posts                # Get all posts (with pagination, filter)
GET    /api/posts/trending       # Get trending posts (reposts terbanyak)
GET    /api/posts/:id            # Get single post
POST   /api/posts                # Create post (protected)
PUT    /api/posts/:id            # Update post (protected, owner only)
DELETE /api/posts/:id            # Delete post (protected, owner only)
POST   /api/posts/:id/repost     # Toggle repost (protected)
POST   /api/posts/:id/like       # Like post (protected)
DELETE /api/posts/:id/like       # Unlike post (protected)
GET    /api/posts/:id/comments   # Get comments for post
POST   /api/posts/:id/comments   # Add comment (protected)
DELETE /api/posts/:id/comments/:id  # Delete comment (protected, owner only)
```

#### Users

```http
GET    /api/users/search?q=query # Search users & posts
GET    /api/users/:id            # Get user profile
PUT    /api/users/profile        # Update profile (protected)
POST   /api/users/avatar         # Upload avatar (protected)
GET    /api/users/suggested       # Get suggested users (protected)
GET    /api/users/:id/stats       # Get user stats (posts/reposts per week)
POST   /api/users/:id/follow      # Toggle follow (protected)
GET    /api/users/:id/followers   # Get followers list
GET    /api/users/:id/following   # Get following list
```

#### Notifications

```http
GET    /api/notifications              # Get all notifications (protected)
GET    /api/notifications/unread-count  # Get unread count (protected)
POST   /api/notifications/read-all      # Mark all as read (protected)
POST   /api/notifications/:id/read      # Mark one as read (protected)
```

#### Upload & Support

```http
POST   /api/upload             # Upload image file (protected)
POST   /api/support            # Send support ticket (public)
```
### Example Request

```javascript
// Login
const res = await fetch('http://localhost:8000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});
const { user, token } = await res.json();

// Create Post (with token)
const postRes = await fetch('http://localhost:8000/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Jalan Rusak di Jaksel',
    body: 'Jalan berlubang di depan Mall XYZ',
    media_url: null,
    media_type: 'text',
    latitude: -6.2615,
    longitude: 106.8106,
    location_name: 'Jakarta Selatan'
  })
});
```
---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) - lihat file LICENSE untuk detail lebih lanjut.

---

<div align="center">

*Made with ❤️ by Tim Sukses for ITECHNO CUP 2026*

</div>
