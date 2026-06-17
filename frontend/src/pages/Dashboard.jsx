import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { STATIC_MOVIES, STATIC_BOOKINGS, formatCurrency } from '../utils/helpers';
import MovieCard from '../components/MovieCard';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (user.role === 'ADMIN') {
    return <AdminQuickView user={user} />;
  }
  if (user.role === 'THEATRE_OWNER') {
    return <OwnerQuickView user={user} />;
  }

  const userBookings = STATIC_BOOKINGS.filter(b => b.userId === 2);
  const trending = STATIC_MOVIES.slice(0, 4);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="dashboard-hero animate-fade-in-up">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome back, <span className="hero-name">{user.name}</span>
            </h1>
            <p className="hero-subtitle">Discover movies, book shows, and enjoy the cinematic experience.</p>
            <div className="hero-actions">
              <Link to="/movies" className="btn btn-primary btn-lg" id="btn-browse-movies">
                🎬 Browse Movies
              </Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card glass-card">
              <span className="stat-icon">🎫</span>
              <span className="stat-value">{userBookings.length}</span>
              <span className="stat-label">Bookings</span>
            </div>
            <div className="stat-card glass-card">
              <span className="stat-icon">🎬</span>
              <span className="stat-value">{STATIC_MOVIES.length}</span>
              <span className="stat-label">Movies</span>
            </div>
            <div className="stat-card glass-card">
              <span className="stat-icon">⭐</span>
              <span className="stat-value">4.8</span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
        </div>

        <section className="dashboard-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="section-header">
            <h2 className="section-title">🔥 Trending Now</h2>
            <Link to="/movies" className="section-link">View all →</Link>
          </div>
          <div className="movie-grid stagger-children">
            {trending.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {userBookings.length > 0 && (
          <section className="dashboard-section animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="section-title">🎫 Recent Bookings</h2>
            <div className="bookings-list">
              {userBookings.map(booking => (
                <div key={booking.id} className="booking-item glass-card">
                  <div className="booking-info">
                    <span className="booking-id">Booking #{booking.id}</span>
                    <span className={`badge ${booking.status === 'CONFIRMED' ? 'badge-green' : 'badge-red'}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-details">
                    <span>Seats: {booking.seatNumbers.join(', ')}</span>
                    <span>Amount: {formatCurrency(booking.totalAmount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function AdminQuickView({ user }) {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="dashboard-hero animate-fade-in-up">
          <div className="hero-content">
            <h1 className="hero-title">Admin Dashboard</h1>
            <p className="hero-subtitle">Welcome, {user.name}. Manage the CineVerse platform.</p>
            <div className="hero-actions">
              <Link to="/admin" className="btn btn-primary btn-lg">⚙️ Admin Panel</Link>
              <Link to="/movies" className="btn btn-secondary btn-lg">🎬 Movies</Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card glass-card"><span className="stat-icon">👥</span><span className="stat-value">5</span><span className="stat-label">Users</span></div>
            <div className="stat-card glass-card"><span className="stat-icon">🎬</span><span className="stat-value">{STATIC_MOVIES.length}</span><span className="stat-label">Movies</span></div>
            <div className="stat-card glass-card"><span className="stat-icon">🎫</span><span className="stat-value">{STATIC_BOOKINGS.length}</span><span className="stat-label">Bookings</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OwnerQuickView({ user }) {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="dashboard-hero animate-fade-in-up">
          <div className="hero-content">
            <h1 className="hero-title">Theatre Owner Dashboard</h1>
            <p className="hero-subtitle">Welcome, {user.name}. Manage your theatres and shows.</p>
            <div className="hero-actions">
              <Link to="/theatre-owner" className="btn btn-primary btn-lg">🎭 Manage Shows</Link>
              <Link to="/movies" className="btn btn-secondary btn-lg">🎬 Movies</Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card glass-card"><span className="stat-icon">🏟️</span><span className="stat-value">2</span><span className="stat-label">Theatres</span></div>
            <div className="stat-card glass-card"><span className="stat-icon">📽️</span><span className="stat-value">5</span><span className="stat-label">Shows</span></div>
            <div className="stat-card glass-card"><span className="stat-icon">💰</span><span className="stat-value">₹1,950</span><span className="stat-label">Revenue</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
