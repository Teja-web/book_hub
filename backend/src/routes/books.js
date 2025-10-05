import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController.js';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', authRequired, createBook);
router.put('/:id', authRequired, updateBook);
router.delete('/:id', authRequired, deleteBook);

export default router;


