# OSINTRA - Quick Start Guide

## 🚀 Instalasi Cepat

### 1. Install Dependencies
```bash
composer install
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Konfigurasi Database
Edit file `.env`:
```env
DB_DATABASE=osisviska
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Migrasi & Seed
```bash
php artisan migrate
php artisan db:seed
```

### 5. Storage Link
```bash
php artisan storage:link
```

### 6. Jalankan Server

**Opsi 1: Satu Command (Recommended)**
```bash
npm run dev:all
```

**Opsi 2: Manual (Dua Terminal)**
```bash
# Terminal 1
php artisan serve

# Terminal 2
npm run dev
```

### 7. Akses Aplikasi
- **Public Page**: http://localhost:8000
- **Login**: http://localhost:8000/login
- **Dashboard**: http://localhost:8000/dashboard

### 8. Login Admin
- **Username**: admin
- **Password**: password

## 📋 Checklist Instalasi

- [ ] PHP 8.2+ terinstall
- [ ] Composer terinstall
- [ ] Node.js 18+ terinstall
- [ ] MySQL 8.0+ terinstall dan running
- [ ] Database `osisviska` sudah dibuat
- [ ] `composer install` berhasil
- [ ] `npm install` berhasil
- [ ] `.env` sudah dikonfigurasi
- [ ] `php artisan migrate` berhasil
- [ ] `php artisan db:seed` berhasil
- [ ] `php artisan storage:link` berhasil
- [ ] Server Laravel running di http://localhost:8000
- [ ] Vite dev server running
- [ ] Bisa login dengan admin/password

## 🔧 Troubleshooting

### Error: Database connection failed
```bash
# Pastikan MySQL running
# Check kredensial di .env
php artisan config:clear
```

### Error: npm install gagal
```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json
npm install
```

### Error: Permission denied (Linux/Mac)
```bash
chmod -R 775 storage bootstrap/cache
```

### Error: Class not found
```bash
composer dump-autoload
php artisan config:clear
php artisan cache:clear
```

## 📱 Fitur yang Bisa Dicoba

### Public Page
1. Scroll halaman utama
2. Lihat divisi OSIS
3. Lihat galeri (jika ada media)
4. Kirim pesan via contact form

### Dashboard (Login sebagai Admin)
1. Lihat statistik di dashboard
2. Kelola divisi (Create, Read, Update, Delete)
3. Kelola user dengan role
4. Kelola program kerja
5. Lihat pesan masuk
6. Kelola transaksi keuangan
7. Lihat audit logs
8. Update profil

## 🎯 Role & Akses

| Role | Akses Modul |
|------|-------------|
| Admin | Semua modul (full CRUD) |
| Ketua OSIS | Dashboard, Prokers, Transactions, Messages, Profile |
| Sekretaris | Dashboard, Messages, Divisions, Profile |
| Bendahara | Dashboard, Transactions, Profile |
| Anggota | Dashboard, Profile |

## 📚 Dokumentasi Lengkap

- **README_OSINTRA.md** - Dokumentasi lengkap
- **SETUP_INSTRUCTIONS.md** - Panduan instalasi detail
- **PROJECT_SUMMARY.md** - Ringkasan project

## 💡 Tips

1. Gunakan Postman/Insomnia untuk test API endpoints
2. Check `routes/api.php` untuk list semua endpoint
3. Lihat `database/seeders` untuk contoh data
4. Audit logs mencatat semua aktivitas penting
5. Token auth disimpan di localStorage browser

## 🆘 Butuh Bantuan?

1. Check error di Laravel log: `storage/logs/laravel.log`
2. Check error di browser console (F12)
3. Pastikan semua service running (MySQL, Laravel, Vite)
4. Clear cache: `php artisan optimize:clear`

---

**Happy Coding! 🚀**
