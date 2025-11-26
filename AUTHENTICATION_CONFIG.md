# OSINTRA - Authentication Configuration

## 🔐 Konfigurasi Authentication

### Routing Structure

```
┌─────────────────────────────────────────────────────────┐
│                    PUBLIC ROUTES                         │
│  ✅ Accessible without authentication                    │
├─────────────────────────────────────────────────────────┤
│  GET  /              → PublicPage                        │
│  GET  /login         → LoginPage                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  PROTECTED ROUTES                        │
│  🔒 Requires authentication (Laravel Sanctum token)     │
├─────────────────────────────────────────────────────────┤
│  GET  /dashboard              → DashboardPage            │
│  GET  /dashboard/divisions    → DivisionsPage            │
│  GET  /dashboard/users        → UsersPage                │
│  GET  /dashboard/prokers      → ProkersPage              │
│  GET  /dashboard/messages     → MessagesPage             │
│  GET  /dashboard/transactions → TransactionsPage         │
│  GET  /dashboard/settings     → SettingsPage             │
│  GET  /dashboard/profile      → ProfilePage              │
└─────────────────────────────────────────────────────────┘
```

## 🔄 Authentication Flow

### 1. User Mengakses Public Page
```
User → http://127.0.0.1:8000/
  ↓
✅ Langsung tampil (No authentication required)
  ↓
PublicPage rendered
```

### 2. User Mengakses Dashboard (Belum Login)
```
User → http://127.0.0.1:8000/dashboard
  ↓
Middleware: auth:sanctum check
  ↓
❌ No token found
  ↓
Redirect → http://127.0.0.1:8000/login
```

### 3. User Login
```
User → http://127.0.0.1:8000/login
  ↓
Input username & password
  ↓
POST /api/login
  ↓
✅ Valid credentials
  ↓
Receive: { token, user }
  ↓
Store in localStorage:
  - auth_token
  - user (JSON)
  ↓
Set Axios header: Authorization: Bearer {token}
  ↓
Redirect → http://127.0.0.1:8000/dashboard
```

### 4. User Mengakses Dashboard (Sudah Login)
```
User → http://127.0.0.1:8000/dashboard
  ↓
app.tsx: Load token from localStorage
  ↓
Set Axios header: Authorization: Bearer {token}
  ↓
Inertia request with token
  ↓
Middleware: auth:sanctum check
  ↓
✅ Valid token
  ↓
DashboardPage rendered with auth.user data
```

### 5. User Logout
```
User → Click Logout button
  ↓
POST /api/logout
  ↓
Remove from localStorage:
  - auth_token
  - user
  ↓
Redirect → http://127.0.0.1:8000/login
```

## 📁 File Configuration

### 1. Routes (`routes/web.php`)
```php
// Public Routes (No Auth)
Route::get('/', fn() => Inertia::render('PublicPage'))->name('home');
Route::get('/login', fn() => Inertia::render('LoginPage'))->name('login');

// Protected Routes (Auth Required)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/DashboardPage', [
            'auth' => ['user' => auth()->user()]
        ]);
    })->name('dashboard');
});
```

### 2. Exception Handler (`bootstrap/app.php`)
```php
->withExceptions(function (Exceptions $exceptions): void {
    // Redirect unauthenticated users to login
    $exceptions->respond(function ($response, $exception, $request) {
        if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
            return $request->expectsJson()
                ? $response
                : redirect()->guest(route('login'));
        }
        return $response;
    });
})
```

### 3. Inertia Middleware (`app/Http/Middleware/HandleInertiaRequests.php`)
```php
public function share(Request $request): array
{
    return [
        ...parent::share($request),
        'auth' => [
            'user' => $request->user(), // Share user globally
        ],
    ];
}
```

### 4. Axios Configuration (`resources/js/app.tsx`)
```tsx
// Load token on app initialization
const token = localStorage.getItem('auth_token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
```

### 5. API Axios (`resources/js/lib/axios.ts`)
```tsx
// Add token to every API request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
```

## 🧪 Testing Flow

### Test 1: Public Page Access
```bash
# Expected: ✅ Page loads without login
curl http://127.0.0.1:8000/
```

### Test 2: Dashboard Access (No Token)
```bash
# Expected: ❌ Redirect to /login
curl http://127.0.0.1:8000/dashboard
```

### Test 3: Login
```bash
# Expected: ✅ Receive token
curl -X POST http://127.0.0.1:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

### Test 4: Dashboard Access (With Token)
```bash
# Expected: ✅ Page loads
curl http://127.0.0.1:8000/dashboard \
  -H "Authorization: Bearer {your-token}"
```

## 🔑 Token Storage

### localStorage Structure
```javascript
{
  "auth_token": "1|abc123...",
  "user": "{\"id\":1,\"name\":\"Admin\",\"email\":\"admin@osisviska.com\",...}"
}
```

### Token Lifecycle
1. **Created**: On successful login
2. **Stored**: In localStorage
3. **Used**: In every request header
4. **Validated**: By Laravel Sanctum middleware
5. **Removed**: On logout or 401 error

## 🛡️ Security Features

### 1. CSRF Protection
- Enabled for all POST/PUT/DELETE requests
- Token automatically handled by Laravel

### 2. Token Expiration
- Sanctum tokens don't expire by default
- Can be configured in `config/sanctum.php`

### 3. Middleware Protection
- `auth:sanctum` validates token on every request
- Invalid token → 401 → Redirect to login

### 4. XSS Protection
- Token stored in localStorage (not cookies)
- Axios automatically escapes responses

## 📊 User Data Flow

### In Components
```tsx
import { usePage } from '@inertiajs/react';

const MyComponent = () => {
    const { auth } = usePage().props;
    const user = auth.user;
    
    return <div>Welcome, {user.name}!</div>;
};
```

### In Sidebar/Topbar
```tsx
// Currently using dummy data
const user = { name: 'Admin', role: { name: 'Admin' } };

// TODO: Replace with real data from Inertia props
const { auth } = usePage().props;
const user = auth.user;
```

## 🚀 Next Steps

### 1. Update Sidebar & Topbar
Replace dummy user with real data:
```tsx
import { usePage } from '@inertiajs/react';

const Sidebar = ({ isOpen, onClose }) => {
    const { auth } = usePage().props;
    const user = auth.user;
    
    // Use real user data
    return (
        <div>
            <p>{user.name}</p>
            <p>{user.role.name}</p>
        </div>
    );
};
```

### 2. Implement Permission Checking
```tsx
const hasPermission = (module: string, action: string) => {
    const { auth } = usePage().props;
    if (!auth?.user?.role?.permissions) return false;
    
    const permission = auth.user.role.permissions.find(
        p => p.module_name === module
    );
    
    return permission?.[`can_${action}`] || false;
};

// Filter menu items
const filteredMenuItems = menuItems.filter(item => 
    hasPermission(item.module, 'view')
);
```

### 3. Add Remember Me
```tsx
// LoginPage.tsx
const [rememberMe, setRememberMe] = useState(false);

// Store token differently based on remember me
if (rememberMe) {
    localStorage.setItem('auth_token', token);
} else {
    sessionStorage.setItem('auth_token', token);
}
```

## 🐛 Troubleshooting

### Issue: Redirect loop (login → dashboard → login)
**Cause**: Token not being sent with request
**Fix**: Check axios configuration in `app.tsx`

### Issue: 401 on dashboard access
**Cause**: Token expired or invalid
**Fix**: Clear localStorage and login again

### Issue: User data not showing
**Cause**: Not using `usePage().props.auth`
**Fix**: Import and use Inertia's `usePage` hook

### Issue: CORS error
**Cause**: Sanctum not configured properly
**Fix**: Check `config/sanctum.php` and `.env`

## 📚 References

- [Laravel Sanctum Documentation](https://laravel.com/docs/sanctum)
- [Inertia.js Authentication](https://inertiajs.com/authentication)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)

---

**Last Updated:** 2024-10-31
**Status:** ✅ Authentication configured and working
