# 🚀 Muhammad Hassan Iqbal — Full Stack Developer Portfolio & CMS

A production-grade, end-to-end Full Stack Developer portfolio and administrative content management system built with **Next.js 14 (App Router)**, **Node.js / Express.js REST API**, and **MySQL 8+**.

Features high-end glassmorphic aesthetics, fluid micro-interactions, dark/light theme switching, interactive project filters, an intelligent AI Chatbot, real-time contact form processing with email notifications, and an authenticated Admin Dashboard to manage all portfolio data in real time.

---

## 🏛️ Monorepo Architecture Overview

This project is organized as a unified full-stack monorepo:

```
Hassan-DEV/
├── frontend/                  # Next.js 14 App Router client application
│   ├── public/                # Static assets, images, and ATS CV PDF
│   └── src/
│       ├── app/               # Public pages, dynamic routes, and /admin suite
│       ├── components/        # Glassmorphic UI components & interactive widgets
│       ├── context/           # Theme and Toast notification state providers
│       ├── data/              # Fallback mock data and AI Chatbot knowledge
│       └── services/          # Centralized Axios API service layer (with LAN detection)
│
├── backend/                   # Express.js REST API server
│   ├── src/
│   │   ├── config/            # MySQL connection pool, environment, and security
│   │   ├── controllers/       # Route controllers (Auth, Profile, Skills, Projects, etc.)
│   │   ├── middleware/        # JWT auth, error handlers, and rate limiters
│   │   ├── routes/            # REST API endpoints (/api/*)
│   │   └── services/          # Business logic & MySQL query layer
│   └── scripts/               # Database initialization and admin account seeds
│
├── database/                  # Master MySQL database schemas and initial seeds
│   ├── schema.sql             # 11 normalized table definitions (InnoDB, utf8mb4)
│   └── seed.sql               # Authentic seed data based on Hassan's ATS CV
│
└── DB Queries/                # Interactive SQL Workbench scripts
    └── Hassan.sql             # Consolidated queries, DDL, DML, and verification checks
```

---

## 💻 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router, React 18)
- **Styling**: Vanilla CSS Design Tokens, responsive glassmorphism, glowing ambient gradients
- **Icons**: Lucide React
- **HTTP Client**: Axios with dynamic local network (LAN) IP resolution
- **Network Support**: Configured to bind on `0.0.0.0` for multi-device mobile testing on the same Wi-Fi

### Backend
- **Runtime**: Node.js & Express.js
- **Database Driver**: `mysql2/promise` (connection pooling with keep-alive)
- **Security**: Helmet security headers, CORS origin filtering, Express Rate Limiting
- **Authentication**: JWT (JSON Web Tokens) with HttpOnly cookies & bcryptjs hashing
- **Email Delivery**: Nodemailer integration for automated contact notifications

### Database
- **RDBMS**: MySQL 8.0+ (`portfolio_db`)
- **Tables**: `admins`, `profile`, `skills`, `experiences`, `education`, `projects`, `technologies`, `project_technologies`, `contact_messages`, `chat_conversations`, `chat_messages`

---

## ⚡ Quick Start & Running Locally

### 1. Prerequisites
- **Node.js**: v18.0 or higher
- **MySQL Server**: Running on `localhost:3306`

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:3000,http://127.0.0.1:3000
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Initialize Database & Seed CV Data
Run the automated initialization script from the root or `backend/` directory to create all 11 tables and populate initial CV records:
```bash
npm run db:init --prefix backend
```

### 4. Run Both Frontend & Backend Concurrently
From the root directory:
```bash
npm run dev:all
```
This runs both:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🌐 Local Network Sharing (Test on Mobile / Other Devices)

The frontend is pre-configured with `-H 0.0.0.0` and dynamic client-side IP routing.

1. Find your computer's local IP address (e.g. `10.10.18.31` or `192.168.1.X`).
2. Anyone connected to the same Wi-Fi network can visit:
   ```
   http://<YOUR_LOCAL_IP>:3000
   ```
3. All interactive features (Contact form, AI Chatbot, and Admin Panel) will automatically route API calls to `http://<YOUR_LOCAL_IP>:5000/api`.

---

## 🔐 Administrator Panel

Manage all live portfolio data through the built-in Admin CMS:

| Admin Route | Purpose |
|---|---|
| `/admin/login` | Secure administrator login with JWT tokens |
| `/admin` | Main CMS dashboard, system metrics, and quick shortcuts |
| `/admin/profile` | Update personal biography, title, status, and contact URLs |
| `/admin/skills` | Add, reorder, or delete categorized developer skills |
| `/admin/experience` | Manage work history timeline (7KingsCode, Icommunix, etc.) |
| `/admin/education` | Manage academic degrees and relevant coursework |
| `/admin/projects` | Manage showcase projects, descriptions, slugs, and tech stacks |
| `/admin/messages` | View, inspect, mark read, or delete visitor contact inquiries |

**Default Admin Credentials:**
- **Email**: `admin@portfolio.dev`
- **Password**: `admin123`

---

## 📡 REST API Reference

| Endpoint | Method | Description | Auth Required |
|---|---|---|---|
| `/api/health` | GET | Check backend health and MySQL connectivity | No |
| `/api/auth/login` | POST | Authenticate administrator and receive JWT token | No |
| `/api/auth/me` | GET | Verify active administrator session | Yes |
| `/api/profile` | GET / PUT | Fetch or update profile information | PUT requires Auth |
| `/api/skills` | GET / POST / PUT / DELETE | Manage developer skills & categories | Write requires Auth |
| `/api/experience`| GET / POST / PUT / DELETE | Manage work history records | Write requires Auth |
| `/api/education` | GET / POST / PUT / DELETE | Manage academic background | Write requires Auth |
| `/api/projects` | GET / POST / PUT / DELETE | Manage project catalog and slugs | Write requires Auth |
| `/api/contact` | POST | Submit visitor message (saves to DB + sends email) | No |
| `/api/messages` | GET / PUT / DELETE | View and manage contact messages | Yes |
| `/api/chat` | POST | Conversational AI assistant query & chat logging | No |

---

## 👤 Portfolio Owner Details

- **Engineer**: Muhammad Hassan Iqbal
- **Role**: Full Stack Software Engineer
- **Location**: Lahore, Pakistan
- **Email**: [mhassaniqbal18@gmail.com](mailto:mhassaniqbal18@gmail.com)
- **GitHub**: [github.com/hassaniqbalo3](https://github.com/hassaniqbalo3)
- **LinkedIn**: [linkedin.com/in/muhammad-hassan-iqbal](https://linkedin.com/in/muhammad-hassan-iqbal)
- **CV**: Accessible via `/M_HASSAN_IQBAL_ATS_CV.pdf` on the live site
