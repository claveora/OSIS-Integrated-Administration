# OSINTRA - Setup Instructions

## Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+

## Installation Steps

### 1. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Add additional required packages
npm install react-router-dom recharts axios
```

### 2. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=osisviska
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Database Migration & Seeding

```bash
# Run migrations
php artisan migrate

# Seed initial data (roles, permissions, settings, admin user)
php artisan db:seed

# Default admin credentials:
# Username: admin
# Password: password
```

### 4. Storage Setup

```bash
# Create storage link
php artisan storage:link
```

### 5. Run Development Servers

```bash
# Terminal 1: Laravel backend
php artisan serve

# Terminal 2: Vite frontend
npm run dev
```

## Database Structure

### Tables Created:
1. **roles** - User roles (Admin, Ketua OSIS, Sekretaris, Bendahara, Anggota)
2. **divisions** - OSIS divisions
3. **users** - User accounts with role and division
4. **prokers** - Program kerja (work programs)
5. **proker_anggota** - Members assigned to prokers
6. **proker_media** - Media (images/videos) for prokers
7. **messages** - Contact form messages
8. **transactions** - Financial transactions
9. **app_settings** - Application settings
10. **audit_logs** - Activity logs
11. **role_permissions** - Role-based permissions

## API Endpoints

### Public Endpoints
- `GET /api/divisions` - Get all divisions
- `GET /api/proker-media` - Get all proker media for gallery
- `POST /api/messages` - Submit contact form
- `POST /api/login` - Login

### Protected Endpoints (require auth token)
- `GET /api/dashboard` - Dashboard statistics
- `GET /api/me` - Get current user
- `POST /api/logout` - Logout
- CRUD endpoints for: users, divisions, prokers, messages, transactions, settings

## Frontend Structure

### Public Page Components
- `HeroSection` - Landing hero with CTA
- `AboutSection` - Vision & mission
- `DivisionsSection` - List of OSIS divisions
- `GallerySection` - Media gallery from prokers
- `ContactSection` - Contact form
- `FooterSection` - Footer with links

### Dashboard Components (to be implemented)
- Sidebar navigation
- Dashboard overview with charts
- CRUD pages for all modules
- User profile & settings

## Color Theme (OSINTRA)
- Primary: #1E3A8A (Navy OSIS)
- Secondary: #FFD700 (Gold)
- Accent: #E5E7EB (Light gray)
- Text: #111827 (Dark gray)

## Default Roles & Permissions

### Admin
- Full access to all modules

### Ketua OSIS
- Access: Dashboard, Prokers, Transactions, Messages, Profile

### Sekretaris
- Access: Dashboard, Messages, Divisions, Profile

### Bendahara
- Access: Dashboard, Transactions, Profile

### Anggota
- Access: Dashboard, Profile only

## Notes
- All API routes use Laravel Sanctum for authentication
- Frontend uses React + TypeScript + Tailwind CSS
- Backend uses Laravel 11 REST API
- File uploads should be configured for storage/public
- Audit logs track all major actions
