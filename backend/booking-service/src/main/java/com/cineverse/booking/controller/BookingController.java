package com.cineverse.booking.controller;

import com.cineverse.booking.dto.BookingRequest;
import com.cineverse.booking.dto.SeatDTO;
import com.cineverse.booking.model.Booking;
import com.cineverse.booking.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/booking")
    public ResponseEntity<Map<String, Object>> createBooking(
            @RequestBody BookingRequest request,
            @RequestHeader(value = "X-User-Id", defaultValue = "1") String userId,
            @RequestHeader(value = "X-User-Email", defaultValue = "user@example.com") String userEmail) {

        Booking booking = bookingService.createBooking(Long.parseLong(userId), userEmail, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "status", "success",
                "message", "Booking confirmed",
                "data", booking
        ));
    }

    @GetMapping("/booking/{id}")
    public ResponseEntity<Map<String, Object>> getBooking(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(Map.of("status", "success", "data", booking));
    }

    @PutMapping("/booking/{id}/cancel")
    public ResponseEntity<Map<String, Object>> cancelBooking(@PathVariable Long id) {
        Booking booking = bookingService.cancelBooking(id);
        return ResponseEntity.ok(Map.of("status", "success", "message", "Booking cancelled", "data", booking));
    }

    @GetMapping("/seats/{showId}")
    public ResponseEntity<Map<String, Object>> getSeatLayout(@PathVariable Long showId) {
        List<SeatDTO> seats = bookingService.getSeatLayout(showId);
        return ResponseEntity.ok(Map.of("status", "success", "data", seats));
    }
}
