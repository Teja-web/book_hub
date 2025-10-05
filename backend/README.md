# Book Hub Backend

Environment variables (copy `.env.example` to `.env`):

- PORT=5000
- MONGODB_URI=your_mongodb_atlas_connection_string
- JWT_SECRET=your_jwt_secret

Scripts:

- dev: nodemon src/server.js
- start: node src/server.js

Endpoints base: /api

- POST /api/auth/signup
- POST /api/auth/login
- GET /api/books?page=1
- GET /api/books/:id
- POST /api/books (auth)
- PUT /api/books/:id (auth, owner only)
- DELETE /api/books/:id (auth, owner only)
- POST /api/books/:bookId/reviews (auth)
- DELETE /api/books/:bookId/reviews/:reviewId (auth, owner only)


