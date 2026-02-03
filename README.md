# SkillBridge 🎓

SkillBridge is a full-stack web application that connects learners with expert tutors. Students can browse tutor profiles, view availability, and book sessions instantly. Tutors can manage their profiles, set availability, and track their teaching sessions. Admins oversee the platform and manage users.

---

## Live API URL: https://skill-bridge-server-mu.vercel.app

## GitHub Repository: https://github.com/abdulbariks/SkillBridge-Server

---

## ✨ Features

## 🔐 Authentication & Authorization

- User registration and login with better auth.
- Role-based access: Admin, Student and Tutor.

## 🛠️ Technology Stack

- **Node.js** + **TypeScript**
- **Express.js** (web framework)
- **PostgreSQL** (database)
- **Prisma** (ORM)
- **better auth** ( authentication)

---

## 📁 Project Structure

```ts
src/
├── config/
│   └── db.ts
├── modules/
│   ├── auth/
│   ├── users/
│   ├── tutorProfile/
│   ├── categories/
│   ├── bookings/
├── middleware/
│   ├── auth.ts
├── app.ts
└── server.ts
```

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```ts
git clone https://github.com/abdulbariks/SkillBridge-Server
cd SkillBridge-Server
```

### 2️⃣ Install Dependencies

```ts
pnpm install
```

### 3️⃣ Create Environment Variables

```ts
DATABASE_URL="DB URL"
BETTER_AUTH_SECRET="Secret key for Better Auth ":
BETTER_AUTH_URL="Backend auth service URL"
SERVER_APP_URL="Backend SERVER URL "
APP_URL="APP_URL"
FRONTEND_APP_URL="FRONTEND_APP_URL"
APP_USER="Email account used for sending emails (DEMO)"
APP_PASS="App password generated from Gmail"
GOOGLE_CLIENT_ID="Google OAuth Client ID (DEMO)"
GOOGLE_CLIENT_SECRET="Google OAuth Client Secret (DEMO)"
```

### 5️⃣ Start Development Server

```ts
pnpm run dev
```

## ▶️ Usage Instructions

### Base URL

````ts
``` https://skill-bridge-server-mu.vercel.app/v1/api ```
````

### Authentication

- POST /api/auth/signup
- POST /api/auth/signin
- POST /api/auth/me

### Public Features

- Browse and search tutors by subject, rating, and price
- Filter tutors by category
- View detailed tutor profiles with reviews
- Landing page with featured tutors

### Student Features

- Register and login as student
- Book tutoring sessions
- View upcoming and past bookings
- Leave reviews after sessions
- Manage profile

### Tutor Features

- Register and login as tutor
- Create and update tutor profile
- Set availability slots
- View teaching sessions
- See ratings and reviews
  
### Admin Features

- View all users (students and tutors)
- Manage user status (ban/unban)
- View all bookings
- Manage categories

## 🚀 Deployment

- Vercel
