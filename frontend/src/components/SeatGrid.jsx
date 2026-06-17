import { useState } from 'react';
import './SeatGrid.css';

export default function SeatGrid({ rows, selectedSeats, onSeatToggle }) {
  return (
    <div className="seat-grid-container" id="seat-grid">
      <div className="screen-indicator">
        <div className="screen-curve"></div>
        <span className="screen-label">SCREEN</span>
      </div>

      <div className="seat-grid">
        {rows.map((row) => (
          <div key={row.label} className="seat-row">
            <span className="row-label">{row.label}</span>
            <div className="seat-row-seats">
              {row.seats.map((seat) => {
                const isSelected = selectedSeats.includes(seat.seatNumber);
                const isBooked = seat.status === 'BOOKED';
                const isLocked = seat.status === 'LOCKED';
                const isDisabled = isBooked || isLocked;

                return (
                  <button
                    key={seat.seatNumber}
                    className={`seat ${seat.type.toLowerCase()} ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''} ${isLocked ? 'locked' : ''}`}
                    onClick={() => !isDisabled && onSeatToggle(seat.seatNumber)}
                    disabled={isDisabled}
                    title={`${seat.seatNumber} - ${seat.type}${isBooked ? ' (Booked)' : isLocked ? ' (Locked)' : ''}`}
                    id={`seat-${seat.seatNumber}`}
                  >
                    {seat.seatNumber}
                  </button>
                );
              })}
            </div>
            <span className="row-label">{row.label}</span>
          </div>
        ))}
      </div>

      <div className="seat-legend">
        <div className="legend-item">
          <span className="legend-box available"></span>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <span className="legend-box selected"></span>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <span className="legend-box booked"></span>
          <span>Booked</span>
        </div>
        <div className="legend-item">
          <span className="legend-box premium-legend"></span>
          <span>Premium</span>
        </div>
      </div>
    </div>
  );
}
