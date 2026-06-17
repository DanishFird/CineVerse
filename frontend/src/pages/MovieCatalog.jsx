import { useState, useMemo } from 'react';
import { STATIC_MOVIES } from '../utils/helpers';
import MovieCard from '../components/MovieCard';
import './MovieCatalog.css';

export default function MovieCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  const allGenres = useMemo(() => {
    const genres = new Set();
    STATIC_MOVIES.forEach(m => m.genre.forEach(g => genres.add(g)));
    return ['All', ...Array.from(genres).sort()];
  }, []);

  const filteredMovies = useMemo(() => {
    let movies = [...STATIC_MOVIES];

    if (searchQuery) {
      movies = movies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.director.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre !== 'All') {
      movies = movies.filter(m => m.genre.includes(selectedGenre));
    }

    movies.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'duration') return b.duration - a.duration;
      if (sortBy === 'date') return new Date(b.releaseDate) - new Date(a.releaseDate);
      return 0;
    });

    return movies;
  }, [searchQuery, selectedGenre, sortBy]);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header animate-fade-in">
          <h1 className="page-title">Movie Catalog</h1>
          <p className="page-subtitle">Discover and book your favorite movies</p>
        </div>

        <div className="catalog-filters animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="form-input search-input"
              placeholder="Search movies or directors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="movie-search-input"
            />
          </div>

          <div className="filter-controls">
            <div className="genre-pills">
              {allGenres.map(genre => (
                <button
                  key={genre}
                  className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
                  onClick={() => setSelectedGenre(genre)}
                  id={`genre-${genre.toLowerCase()}`}
                >
                  {genre}
                </button>
              ))}
            </div>

            <select
              className="form-select sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              id="sort-select"
            >
              <option value="rating">Sort by Rating</option>
              <option value="title">Sort by Title</option>
              <option value="duration">Sort by Duration</option>
              <option value="date">Sort by Release Date</option>
            </select>
          </div>
        </div>

        <div className="catalog-results">
          <p className="results-count">{filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} found</p>

          {filteredMovies.length > 0 ? (
            <div className="movie-grid stagger-children">
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">🎬</span>
              <h3>No movies found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
