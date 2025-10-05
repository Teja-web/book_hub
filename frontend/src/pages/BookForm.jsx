import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/api.js';

export default function BookForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', description: '', genre: 'General', year: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await api.get(`/books/${id}`);
      setForm({ title: data.title, author: data.author, description: data.description || '', genre: data.genre || 'General', year: data.year || '' });
    })();
  }, [id]);

  function update(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      if (id) await api.put(`/books/${id}`, { ...form, year: form.year ? Number(form.year) : undefined });
      else await api.post('/books', { ...form, year: form.year ? Number(form.year) : undefined });
      nav('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '24px auto' }}>
      <h2>{id ? 'Edit' : 'Add'} Book</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={submit}>
        <Input label="Title" value={form.title} onChange={v=>update('title', v)} required />
        <Input label="Author" value={form.author} onChange={v=>update('author', v)} required />
        <Input label="Description" value={form.description} onChange={v=>update('description', v)} />
        <Input label="Genre" value={form.genre} onChange={v=>update('genre', v)} />
        <Input label="Published Year" type="number" value={form.year} onChange={v=>update('year', v)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, type='text', ...rest }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', marginBottom: 8 }}>
      <label>{label}</label>
      <input value={value} onChange={e=>onChange(e.target.value)} type={type} {...rest} />
    </div>
  );
}


