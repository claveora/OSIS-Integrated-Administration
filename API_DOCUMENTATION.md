# OSINTRA - API Documentation

Base URL: `http://localhost:8000/api`

## 🔓 Public Endpoints

### Get All Divisions
```http
GET /divisions
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Divisi Humas",
    "description": "Mengelola hubungan masyarakat",
    "users_count": 5,
    "prokers_count": 3,
    "created_at": "2024-10-31T00:00:00.000000Z",
    "updated_at": "2024-10-31T00:00:00.000000Z"
  }
]
```

### Get Proker Media (Gallery)
```http
GET /proker-media
```

**Response:**
```json
[
  {
    "id": 1,
    "proker_id": 1,
    "media_type": "image",
    "media_url": "/storage/proker/image.jpg",
    "caption": "Kegiatan MPLS 2024",
    "created_at": "2024-10-31T00:00:00.000000Z",
    "proker": {
      "id": 1,
      "title": "MPLS 2024",
      "division": {
        "id": 1,
        "name": "Divisi Humas"
      }
    }
  }
]
```

### Submit Contact Message
```http
POST /messages
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Pertanyaan tentang OSIS",
  "message": "Saya ingin bertanya tentang..."
}
```

**Response:**
```json
{
  "message": "Message sent successfully"
}
```

### Login
```http
POST /login
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "password"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "Administrator",
    "username": "admin",
    "email": "admin@osisviska.com",
    "role_id": 1,
    "division_id": null,
    "status": "active",
    "role": {
      "id": 1,
      "name": "Admin",
      "permissions": [...]
    }
  },
  "token": "1|abc123..."
}
```

## 🔒 Protected Endpoints

**Authentication:** Bearer Token in Authorization header
```
Authorization: Bearer {token}
```

---

## Authentication

### Logout
```http
POST /logout
```

### Get Current User
```http
GET /me
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "Administrator",
    "role": {...},
    "division": {...}
  }
}
```

### Update Profile
```http
PUT /profile
```

**Request Body:**
```json
{
  "name": "New Name",
  "email": "newemail@example.com",
  "profile_picture": "/storage/profiles/pic.jpg"
}
```

### Change Password
```http
PUT /change-password
```

**Request Body:**
```json
{
  "current_password": "oldpassword",
  "new_password": "newpassword",
  "new_password_confirmation": "newpassword"
}
```

---

## Dashboard

### Get Dashboard Statistics
```http
GET /dashboard
```

**Response:**
```json
{
  "total_users": 50,
  "total_divisions": 10,
  "total_prokers": 25,
  "unread_messages": 5,
  "balance": 5000000,
  "total_income": 10000000,
  "total_expense": 5000000,
  "proker_status": {
    "planned": 10,
    "ongoing": 8,
    "done": 7
  },
  "recent_prokers": [...],
  "recent_messages": [...],
  "users_by_division": [...],
  "transaction_trend": [...]
}
```

---

## Divisions

### List Divisions
```http
GET /divisions
```

### Create Division
```http
POST /divisions
```

**Request Body:**
```json
{
  "name": "Divisi Baru",
  "description": "Deskripsi divisi"
}
```

### Get Division
```http
GET /divisions/{id}
```

### Update Division
```http
PUT /divisions/{id}
```

### Delete Division
```http
DELETE /divisions/{id}
```

---

## Users

### List Users
```http
GET /users?role_id=1&division_id=2&status=active&search=john&per_page=15
```

**Query Parameters:**
- `role_id` (optional): Filter by role
- `division_id` (optional): Filter by division
- `status` (optional): Filter by status (active/inactive)
- `search` (optional): Search by name, username, email
- `per_page` (optional): Items per page (default: 15)

### Create User
```http
POST /users
```

**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "role_id": 2,
  "division_id": 1,
  "status": "active"
}
```

### Get User
```http
GET /users/{id}
```

### Update User
```http
PUT /users/{id}
```

### Delete User
```http
DELETE /users/{id}
```

---

## Prokers

### List Prokers
```http
GET /prokers?division_id=1&status=ongoing&search=mpls&per_page=15
```

### Create Proker
```http
POST /prokers
```

**Request Body:**
```json
{
  "division_id": 1,
  "title": "MPLS 2024",
  "description": "Masa Pengenalan Lingkungan Sekolah",
  "date": "2024-07-15",
  "location": "Aula Sekolah",
  "status": "planned",
  "anggota": [
    {
      "user_id": 2,
      "role": "Ketua Panitia"
    },
    {
      "user_id": 3,
      "role": "Sekretaris"
    }
  ]
}
```

### Get Proker
```http
GET /prokers/{id}
```

### Update Proker
```http
PUT /prokers/{id}
```

### Delete Proker
```http
DELETE /prokers/{id}
```

### Add Anggota to Proker
```http
POST /prokers/{id}/anggota
```

**Request Body:**
```json
{
  "user_id": 4,
  "role": "Bendahara"
}
```

### Remove Anggota from Proker
```http
DELETE /prokers/{prokerId}/anggota/{anggotaId}
```

### Add Media to Proker
```http
POST /prokers/{id}/media
```

**Request Body:**
```json
{
  "media_type": "image",
  "media_url": "/storage/proker/photo.jpg",
  "caption": "Dokumentasi kegiatan"
}
```

### Remove Media from Proker
```http
DELETE /prokers/{prokerId}/media/{mediaId}
```

---

## Messages

### List Messages
```http
GET /messages?status=unread&search=john&per_page=15
```

### Get Message Statistics
```http
GET /messages/statistics
```

**Response:**
```json
{
  "total": 50,
  "unread": 10,
  "read": 35,
  "archived": 5
}
```

### Get Message
```http
GET /messages/{id}
```

### Update Message Status
```http
PUT /messages/{id}/status
```

**Request Body:**
```json
{
  "status": "read"
}
```

### Delete Message
```http
DELETE /messages/{id}
```

---

## Transactions

### List Transactions
```http
GET /transactions?type=income&start_date=2024-01-01&end_date=2024-12-31&search=iuran&per_page=15
```

### Create Transaction
```http
POST /transactions
```

**Request Body:**
```json
{
  "title": "Iuran Bulanan",
  "amount": 500000,
  "type": "income",
  "description": "Iuran anggota bulan Oktober",
  "date": "2024-10-31"
}
```

### Get Transaction
```http
GET /transactions/{id}
```

### Update Transaction
```http
PUT /transactions/{id}
```

### Delete Transaction
```http
DELETE /transactions/{id}
```

### Get Transaction Statistics
```http
GET /transactions-statistics?start_date=2024-01-01&end_date=2024-12-31
```

**Response:**
```json
{
  "total_income": 10000000,
  "total_expense": 5000000,
  "balance": 5000000,
  "transaction_count": 50
}
```

### Get Monthly Transaction Data
```http
GET /transactions-monthly?year=2024
```

**Response:**
```json
[
  {
    "month": 1,
    "income": 1000000,
    "expense": 500000,
    "balance": 500000
  },
  {
    "month": 2,
    "income": 1200000,
    "expense": 600000,
    "balance": 600000
  }
]
```

---

## Settings

### Get All Settings
```http
GET /settings
```

**Response:**
```json
{
  "school_name": "SMKN 6 Surakarta",
  "theme_color": "#FFD700",
  "primary_color": "#1E3A8A",
  "logo_url": "/uploads/logo.png",
  "osis_vision": "...",
  "osis_mission": "...",
  "contact_email": "osis@smkn6solo.sch.id",
  "contact_phone": "(0271) 123456",
  "contact_address": "Jl. LU Adisucipto No. 42, Surakarta"
}
```

### Update Settings
```http
PUT /settings
```

**Request Body:**
```json
{
  "settings": [
    {
      "key": "school_name",
      "value": "SMKN 6 Surakarta"
    },
    {
      "key": "osis_vision",
      "value": "Visi baru..."
    }
  ]
}
```

### Get All Roles
```http
GET /roles
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Admin",
    "description": "Administrator dengan akses penuh",
    "permissions": [
      {
        "id": 1,
        "role_id": 1,
        "module_name": "Dashboard",
        "can_view": true,
        "can_create": true,
        "can_edit": true,
        "can_delete": true
      }
    ]
  }
]
```

### Update Role Permissions
```http
PUT /roles/{id}/permissions
```

**Request Body:**
```json
{
  "permissions": [
    {
      "module_name": "Dashboard",
      "can_view": true,
      "can_create": false,
      "can_edit": false,
      "can_delete": false
    },
    {
      "module_name": "Prokers",
      "can_view": true,
      "can_create": true,
      "can_edit": true,
      "can_delete": false
    }
  ]
}
```

### Get Audit Logs
```http
GET /audit-logs?user_id=1&action=login&start_date=2024-01-01&end_date=2024-12-31&per_page=50
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "action": "login",
      "description": "User logged in",
      "created_at": "2024-10-31T10:00:00.000000Z",
      "user": {
        "id": 1,
        "name": "Administrator"
      }
    }
  ],
  "current_page": 1,
  "per_page": 50,
  "total": 100
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Unauthenticated"
}
```

### 403 Forbidden
```json
{
  "message": "You do not have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 422 Validation Error
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": [
      "The email field is required."
    ],
    "password": [
      "The password must be at least 8 characters."
    ]
  }
}
```

### 500 Server Error
```json
{
  "message": "Server Error"
}
```

---

## Rate Limiting

- Public endpoints: 60 requests per minute
- Authenticated endpoints: 120 requests per minute

## Pagination

List endpoints return paginated results:

```json
{
  "data": [...],
  "current_page": 1,
  "per_page": 15,
  "total": 100,
  "last_page": 7,
  "from": 1,
  "to": 15
}
```

---

**Last Updated:** 2024-10-31
