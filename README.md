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

## Shilpa - About & Customer Leads Management

This MERN module adds a public About page, Services, Why Choose Us, Testimonials, Contact lead form, and an admin customer leads dashboard.

### Lead APIs

- `POST /api/leads` public lead form
- `GET /api/leads` admin list with `search` and `status` filters
- `GET /api/leads/:id` admin customer details
- `PUT /api/leads/:id` admin edit/status update
- `DELETE /api/leads/:id` admin delete
- `POST /api/leads/:id/follow-ups` admin follow-up notes and history

### Pages

- `/about` public About Company page with lead form
- `/admin/leads` lead management dashboard
- `/admin/leads/:id` customer details and follow-up history

### Run

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```
