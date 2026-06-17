import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthPages.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Static login simulation — replace with API call when backend is ready
      // await api.post('/auth/login', { email, password });

      // Simulate login based on email
      const staticUsers = {
        'admin@cineverse.com': { name: 'Admin User', role: 'ADMIN' },
        'owner@theatre.com': { name: 'Theatre Owner', role: 'THEATRE_OWNER' },
      };

      const matchedUser = staticUsers[email];
      const userData = matchedUser || { name: email.split('@')[0], role: 'USER' };

      if (password.length < 3) {
        throw new Error('Invalid credentials');
      }

      login({
        ...userData,
        email,
        token: 'dev-jwt-token-' + Date.now(),
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-effects">
        <div className="auth-bg-orb orb-1"></div>
        <div className="auth-bg-orb orb-2"></div>
        <div className="auth-bg-orb orb-3"></div>
      </div>

      <div className="auth-container animate-fade-in-up">
        <div className="auth-header">
          <div className="auth-brand">
            <span className="auth-brand-icon">🎬</span>
            <h1 className="auth-brand-name">CineVerse</h1>
          </div>
          <p className="auth-subtitle">Welcome back! Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" id="login-form">
          {error && <div className="auth-error" id="login-error">{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <input
              type="email"
              id="login-email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg auth-submit" id="btn-login" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Create one</Link></p>
          </div>

          <div className="auth-demo-creds">
            <p className="demo-title">Demo Credentials:</p>
            <div className="demo-list">
              <span><strong>Admin:</strong> admin@cineverse.com</span>
              <span><strong>Owner:</strong> owner@theatre.com</span>
              <span><strong>User:</strong> any email</span>
              <span>Password: any (3+ chars)</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
