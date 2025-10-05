import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { addReview, deleteReview } from '../controllers/reviewController.js';

const router = Router({ mergeParams: true });

router.post('/', authRequired, addReview);
router.delete('/:reviewId', authRequired, deleteReview);

export default router;


