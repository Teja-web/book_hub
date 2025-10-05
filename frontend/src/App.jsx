import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import BookList from './pages/BookList.jsx';
import BookDetails from './pages/BookDetails.jsx';
import BookForm from './pages/BookForm.jsx';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <nav className="app-nav">
        <Link to="/">Books</Link>
        <Link to="/add">Add Book</Link>
        <div style={{ marginLeft: 'auto' }}><AuthLinks /></div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add" element={<ProtectedRoute><BookForm /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><BookForm /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

function AuthLinks() {
  const { token, logout } = useAuth();
  if (token) return <button onClick={logout}>Logout</button>;
  return (
    <span style={{ display: 'flex', gap: 12 }}>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </span>
  );
}


