import Review from '../models/Review.js';
import Book from '../models/Book.js';

async function recomputeBookAverages(bookId) {
  const stats = await Review.aggregate([
    { $match: { bookId: bookId } },
    { $group: { _id: '$bookId', count: { $sum: 1 }, avg: { $avg: '$rating' } } },
  ]);
  const count = stats[0]?.count || 0;
  const avg = stats[0]?.avg || 0;
  await Book.findByIdAndUpdate(bookId, { reviewsCount: count, averageRating: Number(avg.toFixed(2)) });
}

export async function addReview(req, res) {
  try {
    const { rating, reviewText } = req.body;
    const bookId = req.params.bookId;
    if (!rating) return res.status(400).json({ message: 'Rating required' });

    const review = await Review.findOneAndUpdate(
      { bookId, userId: req.user.id },
      { rating, reviewText },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    await recomputeBookAverages(review.bookId);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteReview(req, res) {
  try {
    const { bookId, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review || review.bookId.toString() !== bookId) return res.status(404).json({ message: 'Not found' });
    if (review.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await review.deleteOne();
    await recomputeBookAverages(bookId);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


