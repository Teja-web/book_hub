# Book Hub (MERN) – Book Review Platform

This repository contains a full-stack MERN application for managing books and reviews with JWT authentication.

## Quick Start

Backend
- cd backend
- copy .env.example .env (create .env if missing)
- Set MONGODB_URI and JWT_SECRET
- npm i
- npm run dev

Frontend
- cd frontend
- npm i
- npm run dev

Vite runs at http://localhost:5173 and proxies /api to http://localhost:5000.

## API
Base: /api
- POST /auth/signup { name, email, password }
- POST /auth/login { email, password }
- GET /books?page=1
- GET /books/:id
- POST /books (auth)
- PUT /books/:id (auth, owner)
- DELETE /books/:id (auth, owner)
- POST /books/:bookId/reviews (auth)
- DELETE /books/:bookId/reviews/:reviewId (auth, owner)

## Notes
- Pagination: 5 per page
- Average rating recalculated on review upsert/delete
- JWT: Bearer token via Authorization header; stored in localStorage on the client
