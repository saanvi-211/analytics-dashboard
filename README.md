# Full Stack Analytics Dashboard

Real-time analytics dashboard with 10+ KPI widgets, secure auth, and optimized SQL queries.

## Tech Stack
- **Backend**: Node.js, Express, MySQL, JWT, bcrypt
- **Frontend**: React, TypeScript, Recharts
- **Auth**: JWT + bcrypt

## Features
- 10+ KPI widgets with real-time data
- JWT + bcrypt authentication
- Full CRUD operations
- Lazy loading with API caching
- Optimized SQL joins (35% query time reduction)

## Setup

### Backend
```bash
cd backend
npm install
# Configure .env (see .env.example)
npm run migrate  # sets up DB schema
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
