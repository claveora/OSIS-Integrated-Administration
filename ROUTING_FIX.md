# OSINTRA - Routing Fix Documentation

## 🔧 Masalah yang Diperbaiki

### Error Sebelumnya
```
Uncaught SyntaxError: The requested module '/resources/js/routes/index.ts' 
does not provide an export named 'home'
```

**Penyebab:**
- Project menggunakan **Inertia.js** (bukan React Router biasa)
- File layout mencoba import dari `/resources/js/routes/index.ts` yang tidak ada
- Komponen OSINTRA menggunakan `AuthContext` yang tidak kompatibel dengan Inertia

## ✅ Solusi yang Diterapkan

### 1. Update Web Routes (`routes/web.php`)
```php
// Public Page - OSINTRA
Route::get('/', function () {
    return Inertia::render('PublicPage');
})->name('home');

// Login Page - OSINTRA
Route::get('/login', function () {
    return Inertia::render('LoginPage');
})->name('login');

// Dashboard - OSINTRA (Protected)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/DashboardPage');
    })->name('dashboard');
    // ... other routes
});
```

### 2. Fix Auth Layout (`auth-simple-layout.tsx`)
**Sebelum:**
```tsx
import { home } from '@/routes'; // ❌ File tidak ada
<Link href={home()}>
```

**Sesudah:**
```tsx
// ✅ Tidak import routes
<Link href="/">
```

### 3. Update Komponen OSINTRA

#### PublicPage.tsx
```tsx
import { Head } from '@inertiajs/react';

const PublicPage = () => {
    return (
        <>
            <Head title="OSINTRA - OSIS SMKN 6 Surakarta" />
            <div className="min-h-screen">
                {/* Components */}
            </div>
        </>
    );
};
```

#### LoginPage.tsx
**Sebelum:**
```tsx
import { useAuth } from '@/contexts/AuthContext'; // ❌
const { login } = useAuth();
```

**Sesudah:**
```tsx
import { Head } from '@inertiajs/react';
import api from '@/lib/axios';

// Direct API call
const response = await api.post('/login', { username, password });
localStorage.setItem('auth_token', response.data.token);
window.location.href = '/dashboard';
```

#### DashboardPage.tsx
```tsx
import { Head } from '@inertiajs/react';

const DashboardPage = () => {
    return (
        <>
            <Head title="Dashboard - OSINTRA" />
            <DashboardLayout>
                {/* Content */}
            </DashboardLayout>
        </>
    );
};
```

### 4. Update Sidebar & Topbar

**Sidebar.tsx:**
```tsx
import { Link } from '@inertiajs/react';

// Temporary: Show all menu items
const user = { name: 'Admin', role: { name: 'Admin' } };

// Use Inertia Link instead of <a>
<Link href={item.path} className="...">
    {item.name}
</Link>
```

**Topbar.tsx:**
```tsx
// Temporary dummy user
const user = { name: 'Admin', role: { name: 'Admin' } };
```

## 🚀 Cara Testing

### 1. Jalankan Server
```bash
npm run dev:all
```

### 2. Akses URL
- **Public Page**: http://127.0.0.1:8000/
- **Login**: http://127.0.0.1:8000/login
- **Dashboard**: http://127.0.0.1:8000/dashboard (redirect ke login jika belum login)

### 3. Login
- Username: `admin`
- Password: `password`

### 4. Expected Behavior
- ✅ Public page tampil dengan semua section
- ✅ Login page tampil dengan form
- ✅ Setelah login, redirect ke dashboard
- ✅ Dashboard tampil dengan sidebar & content
- ✅ Navigation menggunakan Inertia (tanpa full page reload)

## 📝 Catatan Penting

### Temporary Solutions
Beberapa solusi bersifat temporary untuk membuat aplikasi berjalan:

1. **Dummy User Data**
   - Sidebar dan Topbar menggunakan dummy user
   - **TODO**: Implement proper user data dari Inertia props

2. **No Permission Checking**
   - Semua menu items ditampilkan
   - **TODO**: Implement role-based permission checking

3. **AuthContext Removed**
   - Tidak menggunakan React Context untuk auth
   - **TODO**: Implement Inertia-compatible auth state management

### Next Steps

#### 1. Pass User Data via Inertia
Update `web.php`:
```php
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/DashboardPage', [
            'auth' => [
                'user' => auth()->user()->load(['role.permissions', 'division'])
            ]
        ]);
    });
});
```

Update components:
```tsx
import { usePage } from '@inertiajs/react';

const { auth } = usePage().props;
const user = auth.user;
```

#### 2. Implement Middleware
Create `HandleInertiaRequests.php`:
```php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $request->user() ? $request->user()->load(['role.permissions', 'division']) : null,
        ],
    ]);
}
```

#### 3. Add Permission Checking
```tsx
const hasPermission = (module: string, action: string) => {
    if (!auth?.user?.role?.permissions) return false;
    const permission = auth.user.role.permissions.find(p => p.module_name === module);
    return permission?.[`can_${action}`] || false;
};
```

## 🔐 Authentication Flow

### Current Flow
1. User mengakses `/dashboard`
2. Middleware `auth:sanctum` check token
3. Jika tidak ada token → redirect ke `/login`
4. User login → token disimpan di localStorage
5. Redirect ke `/dashboard`

### Recommended Flow (Future)
1. Use Inertia's built-in auth handling
2. Share user data via middleware
3. Use `usePage().props.auth` untuk akses user data
4. Implement proper CSRF protection

## 🐛 Troubleshooting

### Masih Black Screen?
```bash
# Clear cache
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Restart servers
npm run dev:all
```

### Error "Page not found"?
- Check `routes/web.php` sudah benar
- Check file component ada di `resources/js/pages/`
- Check nama file match dengan `Inertia::render('NamaFile')`

### Navigation tidak work?
- Pastikan menggunakan `<Link>` dari `@inertiajs/react`
- Jangan gunakan `<a href>` atau `window.location`

## 📚 Resources

- [Inertia.js Documentation](https://inertiajs.com/)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [Inertia + React](https://inertiajs.com/client-side-setup#react)

---

**Last Updated:** 2024-10-31
**Status:** ✅ Basic routing working, needs user data implementation
