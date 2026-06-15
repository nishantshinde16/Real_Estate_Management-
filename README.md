<<<<<<< Updated upstream
Real_Estate_Management
=======
# Real Estate Management System

Full-stack MERN Real Estate Management System with separated `backend` and `frontend` folders, JWT authentication, MongoDB schemas, property management, inquiries, user dashboard, and admin dashboard.

## Folder Structure

```text
backend/
  src/
    config/
    middleware/
    modules/
      auth/
      properties/
      inquiries/
      users/
    services/
    server.js
  uploads/
frontend/
  src/
    assets/
    components/
    context/
    hooks/
    pages/
      admin/
      public/
    routes/
    services/
    utils/
```

## Install

```bash
cd backend
npm install
cd ../frontend
npm install
```

## Environment

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/real_estate_management
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_API_ORIGIN=http://localhost:5000
```

## Run

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`; backend runs on `http://localhost:5000`.
>>>>>>> Stashed changes
