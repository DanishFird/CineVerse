import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { STATIC_SHOWS, STATIC_MOVIES, generateSeatLayout, formatCurrency, formatTime } from '../utils/helpers';
import SeatGrid from '../components/SeatGrid';
import './BookingPage.css';

export default function BookingPage() {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null); // null | 'processing' | 'confirmed'

  const show = STATIC_SHOWS.find(s => s.id === parseInt(showId));
  const movie = show ? STATIC_MOVIES.find(m => m.id === show.movieId) : null;

  const bookedSeats = ['A3', 'A4', 'B2', 'C5', 'D1', 'D6', 'E3'];

  const seatLayout = useMemo(() => {
    if (!show) return [];
    return generateSeatLayout(5, 8, bookedSeats);
  }, [show]);

  const handleSeatToggle = (seatNumber) => {
    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const totalAmount = selectedSeats.length * (show?.ticketPrice || 0);

  const handleBooking = async () => {
    if (selectedSeats.length === 0) return;
    setBookingStatus('processing');

    // Simulate booking process
    setTimeout(() => {
      setBookingStatus('confirmed');
    }, 2000);
  };

  if (!show || !movie) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="empty-state">
            <span className="empty-icon">🎟️</span>
            <h3>Show not found</h3>
            <button className="btn btn-primary" onClick={() => navigate('/movies')}>Browse Movies</button>
          </div>
        </div>
      </div>
    );
  }

  if (bookingStatus === 'confirmed') {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="booking-confirmed animate-fade-in-up" id="booking-confirmation">
            <div className="confirm-icon">✅</div>
            <h1 className="confirm-title">Booking Confirmed!</h1>
            <div className="confirm-ticket glass-card">
              <div className="ticket-header">
                <span className="ticket-brand">🎬 CineVerse</span>
                <span className="badge badge-green">CONFIRMED</span>
              </div>
              <div className="ticket-movie">{movie.title}</div>
              <div className="ticket-details">
                <div><strong>Theatre:</strong> {show.theatreName}</div>
                <div><strong>Screen:</strong> {show.screenName}</div>
                <div><strong>Time:</strong> {formatTime(show.startTime)}</div>
                <div><strong>Seats:</strong> {selectedSeats.join(', ')}</div>
                <div><strong>Total:</strong> {formatCurrency(totalAmount)}</div>
              </div>
              <div className="ticket-barcode">
                {'|'.repeat(40)}
              </div>
            </div>
            <div className="confirm-actions">
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
              <button className="btn btn-secondary" onClick={() => navigate('/movies')}>Book Another</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="booking-layout">
          <div className="booking-main animate-fade-in">
            <div className="booking-show-info glass-card">
              <div className="show-movie-info">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="show-movie-poster"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/80x120/1a2235/f59e0b?text=${encodeURIComponent(movie.title)}`;
                  }}
                />
                <div>
                  <h2 className="show-movie-title">{movie.title}</h2>
                  <p className="show-movie-meta">{movie.genre.join(', ')} • {movie.duration} min</p>
                  <p className="show-venue">{show.theatreName} — {show.screenName}</p>
                  <p className="show-timing">{formatTime(show.startTime)} • {formatCurrency(show.ticketPrice)} per seat</p>
                </div>
              </div>
            </div>

            <div className="booking-seat-section">
              <h3 className="seat-section-title">Select Your Seats</h3>
              <SeatGrid
                rows={seatLayout}
                selectedSeats={selectedSeats}
                onSeatToggle={handleSeatToggle}
              />
            </div>
          </div>

          <div className="booking-sidebar animate-slide-in-left">
            <div className="booking-summary glass-card">
              <h3 className="summary-title">Booking Summary</h3>

              <div className="summary-item">
                <span className="summary-label">Movie</span>
                <span className="summary-value">{movie.title}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Show Time</span>
                <span className="summary-value">{formatTime(show.startTime)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Seats</span>
                <span className="summary-value">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Quantity</span>
                <span className="summary-value">{selectedSeats.length}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-item summary-total">
                <span className="summary-label">Total Amount</span>
                <span className="summary-value total-price">{formatCurrency(totalAmount)}</span>
              </div>

              <button
                className="btn btn-primary btn-lg booking-btn"
                onClick={handleBooking}
                disabled={selectedSeats.length === 0 || bookingStatus === 'processing'}
                id="btn-confirm-booking"
              >
                {bookingStatus === 'processing' ? (
                  <>Processing...</>
                ) : (
                  <>🎟️ Book {selectedSeats.length > 0 ? `${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''}` : 'Now'}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
