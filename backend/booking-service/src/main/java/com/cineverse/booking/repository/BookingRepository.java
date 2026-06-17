package com.cineverse.booking.repository;

import com.cineverse.booking.model.Booking;
import com.cineverse.booking.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByShowIdAndStatus(Long showId, BookingStatus status);

    @Query("SELECT DISTINCT s FROM Booking b JOIN b.seatNumbers s WHERE b.showId = :showId AND b.status IN ('CONFIRMED', 'LOCKED')")
    List<String> findBookedSeatsByShowId(@Param("showId") Long showId);
}
