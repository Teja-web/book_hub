import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/books/${id}`);
      setBook(data);
    })();
  }, [id]);

  if (!book) return <div style={{ padding: 24 }}>Loading...</div>;
  return (
    <div style={{ maxWidth: 800, margin: '24px auto' }}>
      <h2>{book.title}</h2>
      <div>by {book.author} · {book.genre} · {book.year || '—'}</div>
      <p>{book.description}</p>
      <div>Average Rating: {book.averageRating?.toFixed?.(2) || 0} ({book.reviewsCount || 0})</div>

      <h3>Reviews</h3>
      <ReviewForm bookId={book._id} canPost={!!token} onUpdated={() => api.get(`/books/${id}`).then(r=>setBook(r.data))} />
      {(book.reviews || []).map(r => (
        <div key={r._id} style={{ borderTop: '1px solid #eee', padding: '8px 0' }}>
          <div>Rating: {r.rating} · by {r.userId?.name || 'You'}</div>
          <div>{r.reviewText}</div>
        </div>
      ))}
    </div>
  );
}

function ReviewForm({ bookId, canPost, onUpdated }) {
  const { token } = useAuth();
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      await api.post(`/books/${bookId}/reviews`, { rating, reviewText });
      setReviewText('');
      onUpdated?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed');
    }
  }

  if (!canPost) return <div>Login to write a review.</div>;
  return (
    <form onSubmit={submit} style={{ margin: '8px 0' }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <label>Rating
        <select value={rating} onChange={e=>setRating(Number(e.target.value))}>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <label>Review
        <input value={reviewText} onChange={e=>setReviewText(e.target.value)} placeholder="Your thoughts" />
      </label>
      <button type="submit" disabled={!token}>Post</button>
    </form>
  );
}


