# OSINTRA - OSIS Interactive Administration

Sistem Manajemen OSIS SMKN 6 Surakarta berbasis Laravel + React + MySQL + Tailwind CSS

## 📋 Deskripsi Project

OSINTRA adalah sistem manajemen organisasi OSIS yang modern dan profesional dengan dua bagian utama:

1. **Public Page** - Website publik untuk masyarakat umum
2. **Internal Dashboard** - Dashboard manajemen untuk anggota OSIS dengan role-based access control

## 🎨 Tema Warna OSINTRA

- **Primary**: `#1E3A8A` (Navy OSIS)
- **Secondary**: `#FFD700` (Kuning Emas)
- **Accent**: `#E5E7EB` (Abu lembut)
- **Text**: `#111827` (Abu tua)
- **Border Radius**: `1.2rem` (rounded-2xl)
- **Font**: Inter / Poppins

## 🛠️ Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Frontend | React + TypeScript + Tailwind CSS |
| Backend | Laravel 11 REST API |
| Database | MySQL 8 |
| Authentication | Laravel Sanctum (Token-based) |
| Charts | Recharts |
| Icons | Lucide React |
| File Upload | Laravel Storage |
| Logging | Laravel Observer + Audit Trail |

## 📁 Struktur Database

### Tabel Utama (11 tabel)

1. **roles** - Role pengguna (Admin, Ketua OSIS, Sekretaris, Bendahara, Anggota)
2. **divisions** - Divisi OSIS
3. **users** - Data pengguna dengan role dan divisi
4. **prokers** - Program kerja OSIS
5. **proker_anggota** - Anggota yang ditugaskan ke proker
6. **proker_media** - Media (foto/video) proker untuk galeri
7. **messages** - Pesan dari contact form publik
8. **transactions** - Transaksi keuangan (income/expense)
9. **app_settings** - Pengaturan aplikasi
10. **audit_logs** - Log aktivitas pengguna
11. **role_permissions** - Permission per role dan modul

## 🚀 Instalasi

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+

### Langkah Instalasi

```bash
# 1. Clone repository
git clone <repository-url>
cd OSISVISKA

# 2. Install dependencies
composer install
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Generate application key
php artisan key:generate

# 5. Konfigurasi database di .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=osintra
DB_USERNAME=root
DB_PASSWORD=

# 6. Run migrations dan seeding
php artisan migrate
php artisan db:seed

# 7. Create storage link
php artisan storage:link

# 8. Run development servers

# Opsi 1: Satu command (Recommended)
npm run dev:all

# Opsi 2: Manual (dua terminal)
# Terminal 1:
php artisan serve

# Terminal 2:
npm run dev
```

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `password`

## 📂 Struktur File Frontend

```
resources/js/
├── components/
│   ├── public/              # Komponen Public Page
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── DivisionsSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── ContactSection.tsx
│   │   └── FooterSection.tsx
│   └── dashboard/           # Komponen Dashboard
│       ├── Sidebar.tsx
│       └── Topbar.tsx
├── contexts/
│   └── AuthContext.tsx      # Context untuk authentication
├── layouts/
│   └── DashboardLayout.tsx  # Layout dashboard
├── lib/
│   ├── axios.ts            # Axios configuration
│   ├── auth.ts             # Auth utilities
│   └── theme.ts            # Theme configuration
├── pages/
│   ├── PublicPage.tsx      # Halaman publik utama
│   ├── LoginPage.tsx       # Halaman login
│   └── dashboard/
│       └── DashboardPage.tsx
└── types/
    └── index.ts            # TypeScript types
```

## 📂 Struktur File Backend

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       ├── AuthController.php
│   │       ├── DashboardController.php
│   │       ├── DivisionController.php
│   │       ├── UserController.php
│   │       ├── ProkerController.php
│   │       ├── MessageController.php
│   │       ├── TransactionController.php
│   │       └── SettingController.php
│   └── Middleware/
│       └── CheckPermission.php
└── Models/
    ├── User.php
    ├── Role.php
    ├── RolePermission.php
    ├── Division.php
    ├── Proker.php
    ├── ProkerAnggota.php
    ├── ProkerMedia.php
    ├── Message.php
    ├── Transaction.php
    ├── AppSetting.php
    └── AuditLog.php
```

## 🔐 Role & Permissions

### Admin
- **Akses**: Semua modul (full CRUD)
- **Modules**: Dashboard, Divisions, Users, Prokers, Messages, Transactions, Settings, Profile

### Ketua OSIS
- **Akses**: Prokers, Transactions, Messages
- **Modules**: Dashboard, Prokers, Transactions, Messages, Profile

### Sekretaris
- **Akses**: Messages, Divisions
- **Modules**: Dashboard, Messages, Divisions, Profile

### Bendahara
- **Akses**: Transactions
- **Modules**: Dashboard, Transactions, Profile

### Anggota
- **Akses**: View only
- **Modules**: Dashboard, Profile

## 🌐 API Endpoints

### Public Endpoints
```
GET  /api/divisions         - List semua divisi
GET  /api/proker-media      - Media galeri dari proker
POST /api/messages          - Submit contact form
POST /api/login             - Login
```

### Protected Endpoints (require Bearer token)
```
# Auth
POST /api/logout
GET  /api/me
PUT  /api/profile
PUT  /api/change-password

# Dashboard
GET  /api/dashboard

# Divisions
GET    /api/divisions
POST   /api/divisions
GET    /api/divisions/{id}
PUT    /api/divisions/{id}
DELETE /api/divisions/{id}

# Users
GET    /api/users
POST   /api/users
GET    /api/users/{id}
PUT    /api/users/{id}
DELETE /api/users/{id}

# Prokers
GET    /api/prokers
POST   /api/prokers
GET    /api/prokers/{id}
PUT    /api/prokers/{id}
DELETE /api/prokers/{id}
POST   /api/prokers/{id}/anggota
DELETE /api/prokers/{id}/anggota/{anggotaId}
POST   /api/prokers/{id}/media
DELETE /api/prokers/{id}/media/{mediaId}

# Messages
GET    /api/messages
GET    /api/messages/statistics
GET    /api/messages/{id}
PUT    /api/messages/{id}/status
DELETE /api/messages/{id}

# Transactions
GET    /api/transactions
POST   /api/transactions
GET    /api/transactions/{id}
PUT    /api/transactions/{id}
DELETE /api/transactions/{id}
GET    /api/transactions-statistics
GET    /api/transactions-monthly

# Settings
GET  /api/settings
PUT  /api/settings
GET  /api/roles
PUT  /api/roles/{id}/permissions
GET  /api/audit-logs
```

## 📄 Public Page Sections

1. **HeroSection** - Landing page dengan CTA
2. **AboutSection** - Visi & Misi OSIS
3. **DivisionsSection** - Grid divisi OSIS
4. **GallerySection** - Galeri foto/video kegiatan
5. **ContactSection** - Form kontak dengan validasi
6. **FooterSection** - Footer dengan info kontak & sosial media

## 🎯 Dashboard Features

### Dashboard Overview
- Statistik total anggota, proker, pesan, saldo
- Grafik pemasukan/pengeluaran
- Status proker (planned, ongoing, done)
- Recent prokers & messages

### Modules
- **Divisions**: CRUD divisi OSIS
- **Users**: CRUD user dengan role assignment
- **Prokers**: CRUD program kerja + assign anggota + upload media
- **Messages**: View & manage pesan dari publik
- **Transactions**: CRUD transaksi keuangan + laporan
- **Settings**: Manage app settings, roles, permissions, audit logs
- **Profile**: Update profil & change password

## 🔒 Security Features

- Token-based authentication (Laravel Sanctum)
- Role-based access control (RBAC)
- Permission checking per module
- Audit logging untuk semua aksi penting
- Password hashing dengan bcrypt
- CSRF protection
- Input validation & sanitization

## 🎨 UI/UX Features

- Responsive design (mobile, tablet, desktop)
- Smooth animations & transitions
- Modern gradient buttons
- Clean & professional layout
- Consistent color scheme
- Loading states
- Error handling dengan user-friendly messages
- Toast notifications

## 📊 Charts & Visualizations

- Dashboard statistics cards
- Financial trend charts (income vs expense)
- Proker status breakdown
- User distribution by division
- Monthly transaction data

## 🔄 Development Workflow

```bash
# Development
npm run dev          # Start Vite dev server
php artisan serve    # Start Laravel dev server

# Build for production
npm run build

# Database
php artisan migrate           # Run migrations
php artisan migrate:fresh     # Fresh migration
php artisan db:seed           # Seed data
php artisan migrate:fresh --seed  # Fresh + seed

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

## 📝 Notes

- Semua timestamp menggunakan timezone Asia/Jakarta
- File upload disimpan di `storage/app/public`
- Media proker otomatis muncul di public gallery
- Audit logs mencatat user_id, action, description, timestamp
- Settings dapat diubah melalui dashboard admin
- Default permissions sudah di-seed untuk setiap role

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Pastikan MySQL running
# Check .env database credentials
# Run: php artisan config:clear
```

### Storage Link Error
```bash
php artisan storage:link
```

### Permission Denied
```bash
# Linux/Mac
chmod -R 775 storage bootstrap/cache

# Windows: Run as Administrator
```

## 📞 Support

Untuk pertanyaan atau bantuan:
- Email: osis@smkn6solo.sch.id
- Phone: (0271) 123456

---

**© 2024 OSIS SMKN 6 Surakarta - OSINTRA System**
