# 🚀 Muhammad Hassan Iqbal - Portfolio Backend API

A secure, scalable, and production-ready REST API backend built with **Node.js**, **Express.js**, and **MySQL** for Muhammad Hassan Iqbal's personal Full Stack Developer portfolio website.

---

## 🏛️ System Architecture

```
┌──────────────────────────────────────────────┐
│             Next.js 14 Frontend              │
│       (App Router, React, JavaScript)        │
│          Runs on http://localhost:3001        │
└──────────────────────┬───────────────────────┘
                       │ REST API (JSON / Cookies / JWT)
                       ▼
┌──────────────────────────────────────────────┐
│       Node.js + Express.js Backend API       │
│        (Security, Rate Limiting, Auth)       │
│          Runs on http://localhost:5000        │
└──────────────────────┬───────────────────────┘
                       │ Connection Pool (mysql2/promise)
                       ▼
┌──────────────────────────────────────────────┐
│                MySQL Database                │
│    (8 Normalized Tables, utf8mb4 collation)  │
│          Default: portfolio_db:3306          │
└──────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MySQL 8.x (`mysql2/promise` connection pooling with parameterized statements)
- **Authentication**: JWT (`jsonwebtoken`) via HTTP-only secure cookies with `Authorization: Bearer` fallback
- **Password Hashing**: `bcryptjs` with salt work factor = 10
- **Security**:
  - `helmet`: Strict Content Security Policy, X-Frame-Options, DNS prefetching controls, and HTTP Strict Transport Security
  - `cors`: Configured with credentials support for frontend origins (`http://localhost:3000`, `http://localhost:3001`)
  - `cookie-parser`: Secure HTTP-only cookies
  - `express-rate-limit`: Multi-tiered rate limiters:
    - General API: 200 requests / 15 mins
    - AI Chatbot: 20 queries / 10 mins
    - Admin Authentication: 10 login attempts / 15 mins
  - `express-validator`: Input validation & sanitization for every endpoint
- **Resilience**:
  - Automatic non-blocking database connection testing
  - Zero-crash fallback cache if MySQL is temporarily offline
  - Centralized global error handling and 404 router

---

## 📁 Directory Structure

```
backend/
├── .env                  # Environment configurations (DB, JWT, Ports)
├── .env.example          # Environment variables template
├── package.json          # Dependencies and automation scripts
├── database/
│   ├── schema.sql        # 8 normalized SQL tables
│   └── seed.sql          # Initial bootstrap records
├── scripts/
│   └── initDb.js         # Automated DB creation, migration & bcrypt seeding
└── src/
    ├── app.js            # Express app assembly & middleware pipeline
    ├── server.js         # HTTP server listener & graceful shutdown
    ├── config/
    │   ├── db.js         # mysql2 connection pool with parameterized queries
    │   └── env.js        # Validated environment settings
    ├── controllers/
    │   ├── authController.js
    │   ├── chatController.js
    │   ├── contactController.js
    │   ├── educationController.js
    │   ├── experienceController.js
    │   ├── profileController.js
    │   ├── projectController.js
    │   └── skillController.js
    ├── middleware/
    │   ├── adminMiddleware.js       # Admin role validation
    │   ├── authMiddleware.js        # JWT token extraction & verification
    │   ├── errorMiddleware.js       # Centralized error handler & 404
    │   ├── rateLimiter.js           # Multi-tiered IP rate limiting
    │   └── validationMiddleware.js  # express-validator response formatter
    ├── routes/
    │   ├── index.js                 # Central API route mounter
    │   ├── authRoutes.js
    │   ├── chatRoutes.js
    │   ├── contactRoutes.js
    │   ├── educationRoutes.js
    │   ├── experienceRoutes.js
    │   ├── profileRoutes.js
    │   ├── projectRoutes.js
    │   └── skillRoutes.js
    ├── services/
    │   ├── aiService.js             # Knowledge engine + optional Gemini/OpenAI
    │   ├── authService.js
    │   ├── contactService.js
    │   ├── educationService.js
    │   ├── experienceService.js
    │   ├── profileService.js
    │   ├── projectService.js
    │   └── skillService.js
    ├── utils/
    │   ├── jwt.js                   # Token generation, cookie options & verify
    │   ├── logger.js                # Formatted logger with sensitive data masking
    │   └── response.js              # Standardized API response formatters
    └── validators/                  # Express-validator rule definitions
```

---

## ⚙️ Installation & Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update your MySQL credentials in `.env`:
```ini
PORT=5000
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=portfolio_db

# Security & Authentication
JWT_SECRET=super_secret_jwt_key_hassan_portfolio_2026_dev
JWT_EXPIRES_IN=7d
COOKIE_SECRET=super_cookie_secret_key_2026

# Allowed Frontend Origins (comma-separated)
FRONTEND_URL=http://localhost:3000,http://localhost:3001

# Optional AI Key (Leave blank to use intelligent domain knowledge engine)
GEMINI_API_KEY=
```

### 3. Initialize & Seed Database
Run the automated initialization script to create `portfolio_db`, execute the schema, and seed default profile, skills, experiences, education, projects, and the initial admin user:
```bash
npm run db:init
```

Default seeded admin credentials:
- **Email**: `admin@portfolio.dev`
- **Password**: `admin123`

---

## 🚦 Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

Once started, the API is available at:
- **Base URL**: `http://localhost:5000/api`
- **Health Check**: `http://localhost:5000/api/health`

---

## 📡 REST API Reference

### Health & Information
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Server uptime, environment & database connection status |
| `GET` | `/api` | Public | API endpoint index directory |

### Authentication
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public (Rate limited) | Authenticate admin, returns JWT & sets HTTP-only cookie |
| `POST` | `/api/auth/logout` | Public | Clears JWT cookie |
| `GET` | `/api/auth/me` | Protected | Returns authenticated admin profile |

#### Example Login Request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.dev","password":"admin123"}'
```

---

### Profile
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/profile` | Public | Get full profile, statistics, and highlights |
| `PUT` | `/api/profile` | Protected | Update profile information |

---

### Skills
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/skills` | Public | List all skills (Optional: `?category=Frontend`) |
| `GET` | `/api/skills/:id` | Public | Get single skill |
| `POST` | `/api/skills` | Protected | Create new skill |
| `PUT` | `/api/skills/:id` | Protected | Update existing skill |
| `DELETE` | `/api/skills/:id` | Protected | Delete skill |

---

### Work Experience
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/experience` | Public | List all work experiences |
| `GET` | `/api/experience/:id` | Public | Get single experience item |
| `POST` | `/api/experience` | Protected | Create new experience |
| `PUT` | `/api/experience/:id` | Protected | Update experience |
| `DELETE` | `/api/experience/:id` | Protected | Delete experience |

---

### Education & Credentials
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/education` | Public | List education items |
| `GET` | `/api/education/:id` | Public | Get single education item |
| `POST` | `/api/education` | Protected | Create education item |
| `PUT` | `/api/education/:id` | Protected | Update education item |
| `DELETE` | `/api/education/:id` | Protected | Delete education item |

---

### Projects
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/projects` | Public | List projects (Optional: `?category=Full+Stack&featured=true`) |
| `GET` | `/api/projects/:slug` | Public | Get project details by slug or ID |
| `POST` | `/api/projects` | Protected | Create project with auto-generated slug |
| `PUT` | `/api/projects/:id` | Protected | Update project |
| `DELETE` | `/api/projects/:id` | Protected | Delete project |

---

### Contact Messages
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/contact` | Public (Rate limited) | Submit a contact message |
| `GET` | `/api/messages` | Protected | List all received messages |
| `GET` | `/api/contact/:id` | Protected | Get single message details |
| `PATCH` | `/api/contact/:id/status` | Protected | Update message status (`read`/`unread`) |
| `DELETE` | `/api/messages/:id` | Protected | Delete contact message |

#### Example Contact Submission:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@techcompany.com",
    "subject": "Full Stack Opportunity",
    "message": "Hi Hassan, we would love to discuss a project with you."
  }'
```

---

### AI Portfolio Assistant
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/chat` | Public (Strict rate limit) | Send message to AI assistant; logs to DB and returns answer |

#### Example Chat Request:
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are Hassan'\''s core skills?"}'
```

---

## 🔒 Security Best Practices Implemented

1. **Parameterization**: Every SQL query uses `mysql2` prepared statements (`?` parameters) to prevent SQL injection vulnerabilities.
2. **Password Security**: Passwords are never stored in plaintext. Hashed with `bcryptjs` (salt work factor 10).
3. **HTTP-only Cookies**: JWT tokens are issued with `httpOnly: true`, `sameSite: 'lax'`, and `secure` in production to mitigate XSS token theft.
4. **CORS Isolation**: Only authorized frontend origins are permitted with credentials.
5. **Rate Limiting**: Multi-tiered protection stops DDoS and brute-force attempts on sensitive endpoints.
6. **Data Masking**: Passwords, tokens, and secret keys are automatically redacted in server log output.
7. **Resilient Fallback**: Even if MySQL is temporarily undergoing maintenance, the API does not throw fatal unhandled errors and responds gracefully.
