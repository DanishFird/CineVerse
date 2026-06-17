import { useState } from 'react';
import { STATIC_USERS, STATIC_MOVIES, STATIC_BOOKINGS, formatCurrency } from '../utils/helpers';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header animate-fade-in">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Manage users, movies, and platform operations</p>
        </div>

        <div className="admin-stats stagger-children">
          <div className="admin-stat glass-card">
            <span className="stat-icon">👥</span>
            <div className="stat-info">
              <span className="stat-value">{STATIC_USERS.length}</span>
              <span className="stat-label">Total Users</span>
            </div>
          </div>
          <div className="admin-stat glass-card">
            <span className="stat-icon">🎬</span>
            <div className="stat-info">
              <span className="stat-value">{STATIC_MOVIES.length}</span>
              <span className="stat-label">Movies</span>
            </div>
          </div>
          <div className="admin-stat glass-card">
            <span className="stat-icon">🎫</span>
            <div className="stat-info">
              <span className="stat-value">{STATIC_BOOKINGS.length}</span>
              <span className="stat-label">Bookings</span>
            </div>
          </div>
          <div className="admin-stat glass-card">
            <span className="stat-icon">💰</span>
            <div className="stat-info">
              <span className="stat-value">{formatCurrency(STATIC_BOOKINGS.reduce((sum, b) => sum + b.totalAmount, 0))}</span>
              <span className="stat-label">Revenue</span>
            </div>
          </div>
        </div>

        <div className="admin-tabs animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')} id="tab-users">
            👥 Users
          </button>
          <button className={`tab-btn ${activeTab === 'movies' ? 'active' : ''}`} onClick={() => setActiveTab('movies')} id="tab-movies">
            🎬 Movies
          </button>
          <button className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')} id="tab-bookings">
            🎫 Bookings
          </button>
        </div>

        <div className="admin-content glass-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {activeTab === 'users' && (
            <table className="data-table" id="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {STATIC_USERS.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'ADMIN' ? 'badge-red' : user.role === 'THEATRE_OWNER' ? 'badge-blue' : 'badge-green'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-secondary btn-sm">Edit</button>
                        <button className="btn btn-danger btn-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'movies' && (
            <table className="data-table" id="movies-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Rating</th>
                  <th>Language</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {STATIC_MOVIES.map(movie => (
                  <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{movie.title}</td>
                    <td>{movie.genre.join(', ')}</td>
                    <td><span className="badge badge-gold">★ {movie.rating}</span></td>
                    <td>{movie.language}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-secondary btn-sm">Edit</button>
                        <button className="btn btn-danger btn-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'bookings' && (
            <table className="data-table" id="bookings-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Show</th>
                  <th>Seats</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {STATIC_BOOKINGS.map(booking => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{STATIC_USERS.find(u => u.id === booking.userId)?.name || 'Unknown'}</td>
                    <td>Show #{booking.showId}</td>
                    <td>{booking.seatNumbers.join(', ')}</td>
                    <td style={{ fontWeight: 600 }}>{formatCurrency(booking.totalAmount)}</td>
                    <td>
                      <span className={`badge ${booking.status === 'CONFIRMED' ? 'badge-green' : 'badge-red'}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
