import { useState } from 'react';
import { STATIC_THEATRES, STATIC_SHOWS, STATIC_MOVIES, formatTime, formatDate, formatCurrency } from '../utils/helpers';
import './TheatreOwnerDashboard.css';

export default function TheatreOwnerDashboard() {
  const [activeTab, setActiveTab] = useState('theatres');

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header animate-fade-in">
          <h1 className="page-title">Theatre Management</h1>
          <p className="page-subtitle">Manage your theatres, screens, and shows</p>
        </div>

        <div className="admin-stats stagger-children">
          <div className="admin-stat glass-card">
            <span className="stat-icon">🏟️</span>
            <div className="stat-info">
              <span className="stat-value">{STATIC_THEATRES.length}</span>
              <span className="stat-label">Theatres</span>
            </div>
          </div>
          <div className="admin-stat glass-card">
            <span className="stat-icon">📽️</span>
            <div className="stat-info">
              <span className="stat-value">{STATIC_THEATRES.reduce((sum, t) => sum + t.screens.length, 0)}</span>
              <span className="stat-label">Screens</span>
            </div>
          </div>
          <div className="admin-stat glass-card">
            <span className="stat-icon">🎬</span>
            <div className="stat-info">
              <span className="stat-value">{STATIC_SHOWS.length}</span>
              <span className="stat-label">Active Shows</span>
            </div>
          </div>
        </div>

        <div className="admin-tabs animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <button className={`tab-btn ${activeTab === 'theatres' ? 'active' : ''}`} onClick={() => setActiveTab('theatres')} id="tab-theatres">
            🏟️ Theatres
          </button>
          <button className={`tab-btn ${activeTab === 'shows' ? 'active' : ''}`} onClick={() => setActiveTab('shows')} id="tab-shows">
            📽️ Shows
          </button>
        </div>

        <div className="admin-content glass-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {activeTab === 'theatres' && (
            <div className="theatre-list">
              {STATIC_THEATRES.map(theatre => (
                <div key={theatre.id} className="theatre-card" id={`theatre-${theatre.id}`}>
                  <div className="theatre-header">
                    <div>
                      <h3 className="theatre-name">{theatre.name}</h3>
                      <p className="theatre-location">📍 {theatre.location}</p>
                    </div>
                    <button className="btn btn-secondary btn-sm">Edit</button>
                  </div>
                  <div className="screen-list">
                    {theatre.screens.map(screen => (
                      <div key={screen.id} className="screen-item">
                        <span className="screen-name">{screen.name}</span>
                        <span className="screen-capacity">{screen.totalRows * screen.seatsPerRow} seats ({screen.totalRows} rows × {screen.seatsPerRow})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="btn btn-primary add-btn" id="btn-add-theatre">+ Add Theatre</button>
            </div>
          )}

          {activeTab === 'shows' && (
            <>
              <table className="data-table" id="shows-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Movie</th>
                    <th>Theatre / Screen</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {STATIC_SHOWS.map(show => {
                    const movie = STATIC_MOVIES.find(m => m.id === show.movieId);
                    return (
                      <tr key={show.id}>
                        <td>{show.id}</td>
                        <td style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{movie?.title || 'Unknown'}</td>
                        <td>
                          <div>
                            <div style={{ fontWeight: 500 }}>{show.theatreName}</div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{show.screenName}</div>
                          </div>
                        </td>
                        <td>{formatDate(show.startTime)}</td>
                        <td style={{ color: 'var(--color-accent-gold)', fontWeight: 600 }}>{formatTime(show.startTime)}</td>
                        <td>{formatCurrency(show.ticketPrice)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-secondary btn-sm">Edit</button>
                            <button className="btn btn-danger btn-sm">Cancel</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <button className="btn btn-primary add-btn" id="btn-add-show">+ Add Show</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
