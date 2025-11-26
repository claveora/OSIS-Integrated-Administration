# OSINTRA - Troubleshooting Black Screen

## 🐛 Masalah: Black Screen di Dashboard

### Kemungkinan Penyebab

1. **Vite Cache Issue**
   - Vite masih mencoba load file yang sudah dihapus
   - Cache browser masih menyimpan reference lama

2. **Authentication Issue**
   - Token tidak terkirim dengan benar
   - Middleware redirect loop

3. **Component Loading Issue**
   - Import path salah
   - Component tidak ter-export dengan benar

## 🔧 Solusi Step-by-Step

### Step 1: Clear All Cache
```bash
# Clear Laravel cache
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

### Step 2: Check Browser Console
1. Buka http://127.0.0.1:8000/dashboard
2. Tekan F12 → Console tab
3. Cari error merah
4. Screenshot dan share

### Step 3: Test Each Route

#### Test 1: Public Page
```
URL: http://127.0.0.1:8000/
Expected: ✅ Tampil dengan hero, about, divisions, dll
```

#### Test 2: Login Page
```
URL: http://127.0.0.1:8000/login
Expected: ✅ Form login dengan gradient navy & gold
```

#### Test 3: Dashboard (Tanpa Login)
```
URL: http://127.0.0.1:8000/dashboard
Expected: ❌ Redirect ke /login
```

#### Test 4: Dashboard (Dengan Login)
```
1. Login dulu di /login
2. Akses /dashboard
Expected: ✅ Dashboard tampil
```

### Step 4: Check Network Tab
1. F12 → Network tab
2. Refresh page
3. Cari request yang failed (merah)
4. Klik request → Preview tab
5. Screenshot error message

## 🔍 Debug Checklist

### File Structure
```bash
# Check apakah file ada
ls resources/js/pages/PublicPage.tsx
ls resources/js/pages/LoginPage.tsx
ls resources/js/pages/dashboard/DashboardPage.tsx
```

### Routing
```bash
# Check routes
php artisan route:list | grep dashboard
```

### Vite
```bash
# Check Vite running
curl http://localhost:5173
```

### Laravel
```bash
# Check Laravel running
curl http://127.0.0.1:8000
```

## 🚨 Common Errors

### Error 1: "Cannot find module './pages/dashboard/DashboardPage'"
**Cause**: File tidak ditemukan atau path salah
**Fix**: 
```bash
# Check file ada
ls resources/js/pages/dashboard/DashboardPage.tsx

# Restart Vite
npm run dev
```

### Error 2: "401 Unauthorized"
**Cause**: Token tidak valid atau tidak ada
**Fix**:
```javascript
// Clear localStorage
localStorage.clear();

// Login lagi
window.location.href = '/login';
```

### Error 3: "Inertia page not found"
**Cause**: Routing tidak match dengan component
**Fix**:
```php
// Check web.php
Route::get('/dashboard', function () {
    return Inertia::render('dashboard/DashboardPage');
});

// Component harus ada di:
// resources/js/pages/dashboard/DashboardPage.tsx
```

### Error 4: "Module not found: Can't resolve '@/components/...'"
**Cause**: Import path salah atau component tidak ada
**Fix**:
```bash
# Check component ada
ls resources/js/components/dashboard/Sidebar.tsx
ls resources/js/components/dashboard/Topbar.tsx
```

## 🔄 Full Reset (Nuclear Option)

Jika semua cara di atas tidak berhasil:

```bash
# 1. Stop all servers
Ctrl+C

# 2. Clear everything
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
rm -rf node_modules/.vite
rm -rf public/build

# 3. Rebuild
npm run build

# 4. Restart servers
npm run dev:all
```

## 📝 Debugging Commands

### Check if component exports correctly
```bash
# In resources/js/pages/dashboard/DashboardPage.tsx
# Should have: export default DashboardPage;
```

### Check Inertia props
```javascript
// In browser console
console.log(window.page);
```

### Check auth token
```javascript
// In browser console
console.log(localStorage.getItem('auth_token'));
```

### Check axios config
```javascript
// In browser console
console.log(axios.defaults.headers.common['Authorization']);
```

## 🎯 Next Steps

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Hard refresh** (Ctrl+Shift+R)
3. **Try incognito mode** (Ctrl+Shift+N)
4. **Check console for errors**
5. **Share screenshot of errors**

---

**Last Updated:** 2024-10-31
