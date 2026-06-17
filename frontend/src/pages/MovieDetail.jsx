import { useParams, Link, useNavigate } from 'react-router-dom';
import { STATIC_MOVIES, STATIC_REVIEWS, STATIC_SHOWS, formatDate, formatTime, formatCurrency, getStarRating } from '../utils/helpers';
import './MovieDetail.css';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = STATIC_MOVIES.find(m => m.id === id);
  const reviews = STATIC_REVIEWS.filter(r => r.movieId === id);
  const shows = STATIC_SHOWS.filter(s => s.movieId === id);

  if (!movie) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="empty-state">
            <span className="empty-icon">🎬</span>
            <h3>Movie not found</h3>
            <Link to="/movies" className="btn btn-primary">Back to Movies</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="movie-detail-hero">
        <div className="detail-hero-bg" style={{ backgroundImage: `url(${movie.posterUrl})` }}></div>
        <div className="detail-hero-overlay"></div>
        <div className="container detail-hero-content">
          <div className="detail-poster-wrap animate-fade-in">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="detail-poster"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/300x450/1a2235/f59e0b?text=${encodeURIComponent(movie.title)}`;
              }}
            />
          </div>
          <div className="detail-info animate-fade-in-up">
            <h1 className="detail-title">{movie.title}</h1>
            <div className="detail-meta">
              <span className="detail-rating">
                <span className="rating-star">★</span> {movie.rating}/10
              </span>
              <span className="detail-duration">⏱ {movie.duration} min</span>
              <span className="detail-lang">{movie.language}</span>
              <span className="detail-date">📅 {formatDate(movie.releaseDate)}</span>
            </div>
            <div className="detail-genres">
              {movie.genre.map(g => (
                <span key={g} className="badge badge-gold">{g}</span>
              ))}
            </div>
            <p className="detail-description">{movie.description}</p>
            <p className="detail-director">
              <span className="director-label">Director:</span> {movie.director}
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {shows.length > 0 && (
          <section className="detail-section animate-fade-in-up" id="shows-section">
            <h2 className="section-title">🎟️ Available Shows</h2>
            <div className="shows-grid">
              {shows.map(show => (
                <div key={show.id} className="show-card glass-card" id={`show-${show.id}`}>
                  <div className="show-theatre">
                    <span className="show-theatre-name">{show.theatreName}</span>
                    <span className="show-screen-name">{show.screenName}</span>
                  </div>
                  <div className="show-time">
                    <span className="show-date">{formatDate(show.startTime)}</span>
                    <span className="show-clock">{formatTime(show.startTime)}</span>
                  </div>
                  <div className="show-price">{formatCurrency(show.ticketPrice)}</div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/booking/${show.id}`)}
                    id={`btn-book-show-${show.id}`}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="detail-section animate-fade-in-up" style={{ animationDelay: '0.2s' }} id="reviews-section">
          <h2 className="section-title">💬 Reviews ({reviews.length})</h2>
          {reviews.length > 0 ? (
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-card glass-card">
                  <div className="review-header">
                    <div className="review-avatar">{review.userName.charAt(0)}</div>
                    <div className="review-meta">
                      <span className="review-author">{review.userName}</span>
                      <span className="review-date">{formatDate(review.createdAt)}</span>
                    </div>
                    <span className="review-rating">{getStarRating(review.rating * 2)}</span>
                  </div>
                  <p className="review-text">{review.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          )}
        </section>
      </div>
    </div>
  );
}
