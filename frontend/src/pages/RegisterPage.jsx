import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthPages.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (form.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      if (!form.name.trim()) {
        throw new Error('Name is required');
      }

      // Static registration — replace with API call when backend is ready
      // await api.post('/auth/register', form);

      login({
        name: form.name,
        email: form.email,
        role: form.role,
        token: 'dev-jwt-token-' + Date.now(),
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
          <p className="auth-subtitle">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" id="register-form">
          {error && <div className="auth-error" id="register-error">{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="register-name">Full Name</label>
            <input
              type="text"
              id="register-name"
              name="name"
              className="form-input"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">Email Address</label>
            <input
              type="email"
              id="register-email"
              name="email"
              className="form-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">Password</label>
            <input
              type="password"
              id="register-password"
              name="password"
              className="form-input"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-role">Role</label>
            <select
              id="register-role"
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
            >
              <option value="USER">User</option>
              <option value="THEATRE_OWNER">Theatre Owner</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-lg auth-submit" id="btn-register" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/">Sign in</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
