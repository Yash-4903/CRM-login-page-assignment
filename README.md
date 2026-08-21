# CRM Auth Suite

A production-grade, full-stack CRM Authentication module — **React 18 + Vite + Tailwind CSS** frontend backed by a **Node.js + Express + MySQL 2** REST API with JWT auth.

The backend follows a strict, minimal specification: exactly 4 authentication endpoints, raw parameterized SQL (no ORM), bcrypt hashing, Zod validation, and centralized error handling. The frontend is a **pixel-perfect premium SaaS auth page** — DM Sans typography, deep navy `#14249C` throughout, a true 50/50 split with no whitespace gaps, a realistic CRM dashboard preview (stats, bar chart, contacts table) inside a glass-morphism container on the right panel, a clean white left panel with no card box, and subtle modern micro-interactions (input glow, button press, link shift, icon color change). Pure Tailwind CSS — no icon or animation libraries, no runtime asset downloads (fonts are self-hosted).

---

## ✨ Features

- 🔐 **JWT Authentication** — register, login, session validation (`/me`), logout
- 🛡️ **Secure by default** — bcrypt (12 rounds), helmet, CORS-restricted to the frontend origin, rate limiting (5 req / 15 min per IP), parameterized queries only
- 🧪 **Real-time validation** — Zod schemas mirrored on frontend and backend, validation on blur + submit, card shake on failed submit
- 💼 **Pixel-perfect 50/50 split** — left `lg:w-1/2` + right `lg:w-1/2` with no whitespace gaps; right panel touches the viewport edge
- 🎨 **DM Sans** — minimal modern geometric font, self-hosted locally (zero runtime network requests)
- 📊 **Realistic CRM preview** — right panel shows stats (Contacts 2,847 · Deals 156 · Revenue $48.2K), Pipeline bar chart, and Recent Contacts table inside a `bg-white/[0.06] backdrop-blur-sm` glass container
- ✨ **Micro-interactions** — input focus glow (`ring-[3px]`), hover border, icon color change (`group-focus-within`), button press scale (`active:scale-[0.98]`), link shift, logo hover lift
- 📱 **Card-stack mobile** — navy header + overlapping white card (`rounded-t-[28px]` `-mt-2`) with drag handle
- 📱 **Fully responsive** — centered form on tablets, full-width on mobile, split screen on desktop, hamburger menu + overlay sidebar on smaller screens
- 🎨 **No external libraries** — every icon is an inline SVG component, every animation is a Tailwind transition/keyframe

---

## 🧰 Tech Stack

| Layer    | Technology |
| -------- | ---------- |
| Frontend | React 18, Vite 5, Tailwind CSS 3.4, React Hook Form, Zod, Axios, React Router v6 — **no animation/icon libraries**; DM Sans self-hosted |
| Design | Deep navy `#14249C` throughout · DM Sans · `rounded-xl` inputs/buttons · 50/50 split · micro-interactions |
| Backend  | Node.js 20+ (LTS), Express 4, mysql2 (promise pool), jsonwebtoken, bcryptjs, zod, helmet, cors, express-rate-limit, dotenv |
| Database | MySQL 8.0 (Docker Compose) |

---

## 📁 Project Structure

```
crm-auth-suite/
├── apps/
│   ├── web/                    # React frontend (Vite + Tailwind CSS only)
│   └── api/                    # Node backend (Express + MySQL2)
├── docs/                       # Screenshots for the README
├── postman/                    # Postman collection export
├── docker-compose.yml          # MySQL 8.0 service
└── README.md
```

---

## ✅ Prerequisites

- Node.js **20+** (LTS) — tested on Node 24
- Docker + Docker Compose (for MySQL) — or a local MySQL 8.0 instance
- npm

---

## 🚀 Setup

### 1. Start MySQL

```bash
docker compose up -d
```

This starts `mysql:8.0` on `localhost:3306` with database `crm_auth` and root password `your_mysql_password`.

> **Note for macOS users:** if the API can't bind to port `5000` because macOS "AirPlay Receiver" is already using it (common), set `PORT=5001` in `apps/api/.env` and `VITE_API_URL=http://localhost:5001/api` in `apps/web/.env`. The provided `.env` files already do this.

### 2. Configure the API

```bash
cd apps/api
cp .env.example .env   # already created; edit values if needed
npm install
npm run dev            # or: npm start
```

The server seeds the test user automatically on first boot.

### 3. Configure the Frontend

```bash
cd apps/web
cp .env.example .env   # already created; edit values if needed
npm install
npm run dev            # serves on http://localhost:5173
```

---

## 🔑 Test User

| Field    | Value                 |
| -------- | --------------------- |
| Name     | Test CRM User         |
| Email    | `testcrm@example.com` |
| Phone    | `9876543210`          |
| Password | `Test@12345`          |

---

## 🌐 API Endpoints

Base URL: `http://localhost:5001/api` (`.env.example` uses `5000`)

| Method | Endpoint          | Auth Required | Purpose                                   |
| ------ | ----------------- | ------------- | ----------------------------------------- |
| POST   | `/api/auth/register` | No            | Register a new user                       |
| POST   | `/api/auth/login`    | No            | Authenticate and return a JWT             |
| GET    | `/api/auth/me`       | Bearer JWT    | Return the authenticated user             |
| POST   | `/api/auth/logout`   | Bearer JWT    | Handle logout (frontend clears the token) |

### Response envelope

**Success:**
```json
{ "success": true, "message": "Operation successful", "token": "JWT", "data": {} }
```

**Error:**
```json
{ "success": false, "message": "Error description", "errors": {} }
```

### Example: Login

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testcrm@example.com","password":"Test@12345"}'
```

### Example: Get current user

```bash
curl http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer <YOUR_JWT>"
```

---

## 🧪 Testing

### Postman

Import `postman/crm-auth-suite.postman_collection.json` into Postman. The collection contains pre-configured requests for every scenario below. Use the "Register Success" request once, then the login/me/logout requests in sequence.

Expected results:

| Test                          | Status | Assertion                                      |
| ----------------------------- | ------ | ---------------------------------------------- |
| Register success              | 201    | `success: true`, no `password` in `data`       |
| Register duplicate email      | 409    | `message` mentions email is already registered |
| Register validation error     | 400    | `errors` object populated                      |
| Login success                 | 200    | `token` present, user data in `data`           |
| Login invalid credentials     | 401    | generic message "Invalid email or password"    |
| Get me (valid token)          | 200    | user data matches login user                   |
| Get me (no token)             | 401    |                                                  |
| Get me (invalid token)        | 401    |                                                  |
| Logout (valid token)          | 200    | `success: true`                                |
| Rate limit exceeded           | 429    | >5 requests in 15 minutes from one IP          |

### Verifying password hashing

```bash
docker exec crm_mysql mysql -uroot -pyour_mysql_password \
  -e "SELECT id, email, LEFT(password, 7), LENGTH(password) FROM crm_auth.users;"
```

All password hashes must start with `$2a$`/`$2b$` and be 60 chars — never plaintext.

### Frontend checklist

- [x] Register form validates in real-time on blur
- [x] Password strength meter only on the register page (never on login)
- [x] Password visibility toggle works on both pages
- [x] Register success → toast → redirect to login
- [x] Login success → token stored → redirect to dashboard
- [x] Dashboard shows user name from API
- [x] Refresh on dashboard keeps the session (token validated via `/me`)
- [x] Logout clears state → redirects to login
- [x] Corrupting the token in localStorage → refresh → redirect to login + "Session expired" toast
- [x] No card/box around the form on desktop — form sits directly on the white left panel
- [x] True 50/50 split (`lg:w-1/2` + `lg:w-1/2`) — no whitespace gap on the right side
- [x] Color is `#14249C` everywhere — right panel bg, buttons, links, focus rings, logo
- [x] Font is DM Sans (self-hosted — zero external font requests)
- [x] Right panel shows realistic CRM dashboard (stats 2,847/156/$48.2K, chart, contacts) — no generic marketing bullets; only tagline “Everything you need to manage customer relationships”
- [x] Right panel glass container `bg-white/[0.06] backdrop-blur-sm border-white/[0.08] rounded-2xl` with micro-interactions
- [x] Inputs and buttons are `rounded-xl` (12px) with micro-interactions (focus glow `ring-[3px]`, hover border, icon color, button press)
- [x] Mobile (<1024px): navy header + overlapping white card (`rounded-t-[28px]` `-mt-2`) with drag handle
- [x] Responsive at 414px / 768px / 1024px / 1440px (no overflow, no overlap, right panel hidden below `lg`)
- [x] No external UI/animation/icon libraries (Tailwind only)
- [x] All icons are inline SVG with stroke-width 1.5

> These checks were executed headlessly with Playwright against the running stack (64/64 assertions passed across three suites).

---

## 🔒 Security Notes

- Passwords are hashed with bcrypt at 12 salt rounds, never stored or returned in plain text
- All SQL uses parameterized queries — no string concatenation
- JWT secret must be 32+ characters (see `.env.example`)
- `helmet()` sets secure HTTP headers; CORS is locked to `CLIENT_URL`
- `express-rate-limit` throttles auth routes to 5 requests per 15 minutes per IP
- The token lives in `localStorage` (`crm_token`) for this assignment — production systems should use short-lived access tokens + httpOnly refresh cookies

---

## 📸 Screenshots

| Login (desktop, split screen) | Register (strength meter) | Dashboard |
| ----- | -------- | --------- |
| <img src="docs/login-desktop.png" width="320" alt="Login page"> | <img src="docs/register-filled.png" width="320" alt="Register page"> | <img src="docs/dashboard-desktop.png" width="320" alt="Dashboard"> |

| Mobile (414px) | Tablet dashboard (1024px) |
| ----- | -------- |
| <img src="docs/login-mobile.png" width="180" alt="Login mobile"> | <img src="docs/dashboard-tablet.png" width="320" alt="Dashboard tablet"> |

---

## 📜 License

MIT — assignment project.