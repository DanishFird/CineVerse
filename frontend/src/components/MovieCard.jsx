import { Link } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} className="movie-card glass-card" id={`movie-card-${movie.id}`}>
      <div className="movie-poster-wrap">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/300x450/1a2235/f59e0b?text=${encodeURIComponent(movie.title)}`;
          }}
        />
        <div className="movie-poster-overlay">
          <span className="movie-play-btn">▶</span>
        </div>
        <div className="movie-rating-badge">
          <span className="rating-star">★</span>
          <span>{movie.rating}</span>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-genre">{movie.genre.slice(0, 2).join(' • ')}</span>
          <span className="movie-duration">{movie.duration} min</span>
        </div>
        <div className="movie-language">{movie.language}</div>
      </div>
    </Link>
  );
}
