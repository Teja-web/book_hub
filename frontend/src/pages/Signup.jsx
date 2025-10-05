import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const { setToken, setUser } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/signup', { name, email, password });
      setToken(data.token); setUser(data.user); nav('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '24px auto' }}>
      <h2>Signup</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required minLength={6} />
        </div>
        <button type="submit">Create account</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}


