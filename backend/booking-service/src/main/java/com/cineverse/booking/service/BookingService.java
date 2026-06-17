package com.cineverse.booking.service;

import com.cineverse.booking.config.RabbitConfig;
import com.cineverse.booking.dto.BookingEvent;
import com.cineverse.booking.dto.BookingRequest;
import com.cineverse.booking.dto.SeatDTO;
import com.cineverse.booking.exception.ResourceNotFoundException;
import com.cineverse.booking.exception.SeatUnavailableException;
import com.cineverse.booking.model.Booking;
import com.cineverse.booking.model.BookingStatus;
import com.cineverse.booking.model.Show;
import com.cineverse.booking.repository.BookingRepository;
import com.cineverse.booking.repository.ShowRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    private static final Logger log = LoggerFactory.getLogger(BookingService.class);

    private final BookingRepository bookingRepository;
    private final ShowRepository showRepository;
    private final SeatLockService seatLockService;
    private final RabbitTemplate rabbitTemplate;

    public BookingService(BookingRepository bookingRepository, ShowRepository showRepository,
                          SeatLockService seatLockService, RabbitTemplate rabbitTemplate) {
        this.bookingRepository = bookingRepository;
        this.showRepository = showRepository;
        this.seatLockService = seatLockService;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Transactional
    public Booking createBooking(Long userId, String userEmail, BookingRequest request) {
        // Validate show exists
        Show show = showRepository.findById(request.getShowId())
                .orElseThrow(() -> new ResourceNotFoundException("Show not found with id: " + request.getShowId()));

        // Check seat availability and lock seats
        List<String> bookedSeats = bookingRepository.findBookedSeatsByShowId(request.getShowId());
        List<String> lockedSeats = new ArrayList<>();

        for (String seat : request.getSeatNumbers()) {
            if (bookedSeats.contains(seat)) {
                // Release already locked seats
                lockedSeats.forEach(s -> seatLockService.releaseSeat(request.getShowId(), s));
                throw new SeatUnavailableException("Seat " + seat + " is already booked");
            }
            if (!seatLockService.lockSeat(request.getShowId(), seat)) {
                // Release already locked seats
                lockedSeats.forEach(s -> seatLockService.releaseSeat(request.getShowId(), s));
                throw new SeatUnavailableException("Seat " + seat + " is already locked by another user");
            }
            lockedSeats.add(seat);
        }

        // Create booking with LOCKED status
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setShowId(request.getShowId());
        booking.setSeatNumbers(request.getSeatNumbers());
        booking.setTotalAmount(request.getSeatNumbers().size() * show.getTicketPrice());
        booking.setStatus(BookingStatus.LOCKED);
        booking = bookingRepository.save(booking);

        // Simulate payment (always success)
        booking.setStatus(BookingStatus.CONFIRMED);
        booking = bookingRepository.save(booking);

        // Publish event to RabbitMQ
        publishBookingEvent(booking, userEmail);

        log.info("Booking confirmed: id={}, userId={}, showId={}, seats={}",
                booking.getId(), userId, request.getShowId(), request.getSeatNumbers());

        return booking;
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Transactional
    public Booking cancelBooking(Long id) {
        Booking booking = getBookingById(id);
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new SeatUnavailableException("Booking is already cancelled");
        }
        booking.setStatus(BookingStatus.CANCELLED);

        // Release seat locks
        for (String seat : booking.getSeatNumbers()) {
            seatLockService.releaseSeat(booking.getShowId(), seat);
        }

        return bookingRepository.save(booking);
    }

    @Cacheable(value = "shows", key = "#showId")
    public Show getShow(Long showId) {
        return showRepository.findById(showId)
                .orElseThrow(() -> new ResourceNotFoundException("Show not found"));
    }

    public List<SeatDTO> getSeatLayout(Long showId) {
        Show show = getShow(showId);
        int totalRows = show.getScreen().getTotalRows();
        int seatsPerRow = show.getScreen().getSeatsPerRow();

        List<String> bookedSeats = bookingRepository.findBookedSeatsByShowId(showId);
        List<SeatDTO> seatLayout = new ArrayList<>();
        String rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (int r = 0; r < totalRows; r++) {
            for (int s = 1; s <= seatsPerRow; s++) {
                String seatNumber = "" + rowLabels.charAt(r) + s;
                String type = r < 2 ? "PREMIUM" : "REGULAR";
                String status;

                if (bookedSeats.contains(seatNumber)) {
                    status = "BOOKED";
                } else if (seatLockService.isSeatLocked(showId, seatNumber)) {
                    status = "LOCKED";
                } else {
                    status = "AVAILABLE";
                }

                seatLayout.add(new SeatDTO(seatNumber, type, status));
            }
        }

        return seatLayout;
    }

    private void publishBookingEvent(Booking booking, String userEmail) {
        try {
            BookingEvent event = new BookingEvent(
                    booking.getId(),
                    booking.getUserId(),
                    userEmail,
                    booking.getShowId(),
                    booking.getSeatNumbers(),
                    booking.getTotalAmount(),
                    booking.getStatus().name()
            );
            rabbitTemplate.convertAndSend(RabbitConfig.BOOKING_QUEUE, event);
            log.info("Booking event published for bookingId: {}", booking.getId());
        } catch (Exception e) {
            log.error("Failed to publish booking event: {}", e.getMessage());
        }
    }
}
