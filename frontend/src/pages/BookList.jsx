import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../lib/api.js';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [params, setParams] = useSearchParams();
  const page = Number(params.get('page') || 1);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/books?page=${page}`);
      setBooks(data.items); setPages(data.pages); setTotal(data.total);
    })();
  }, [page]);

  function goto(p) { setParams({ page: String(p) }); }

  return (
    <div style={{ maxWidth: 800, margin: '24px auto' }}>
      <h2>Books</h2>
      <div>
        {books.map(b => (
          <div key={b._id} style={{ padding: 12, border: '1px solid #eee', marginBottom: 8 }}>
            <h3><Link to={`/books/${b._id}`}>{b.title}</Link></h3>
            <div>by {b.author}</div>
            <div>Genre: {b.genre} · Year: {b.year || '—'}</div>
            <div>Avg Rating: {b.averageRating?.toFixed?.(2) || 0} ({b.reviewsCount || 0})</div>
          </div>
        ))}
      </div>
      <Pagination page={page} pages={pages} onChange={goto} />
      <div>Total: {total}</div>
    </div>
  );
}

function Pagination({ page, pages, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button disabled={page<=1} onClick={() => onChange(page-1)}>Prev</button>
      <span>{page} / {pages}</span>
      <button disabled={page>=pages} onClick={() => onChange(page+1)}>Next</button>
    </div>
  );
}


