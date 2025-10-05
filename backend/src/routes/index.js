import { Router } from 'express';
import authRoutes from './auth.js';
import bookRoutes from './books.js';
import reviewRoutes from './reviews.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/books/:bookId/reviews', reviewRoutes);

export default router;


