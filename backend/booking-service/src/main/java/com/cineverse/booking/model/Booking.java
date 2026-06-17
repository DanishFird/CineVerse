package com.cineverse.booking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long showId;

    @ElementCollection
    @CollectionTable(name = "booking_seats", joinColumns = @JoinColumn(name = "booking_id"))
    @Column(name = "seat_number")
    private List<String> seatNumbers;

    private double totalAmount;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private LocalDateTime createdAt;

    @Version
    private Long version; // Optimistic locking

    public Booking() {
        this.createdAt = LocalDateTime.now();
        this.status = BookingStatus.INITIATED;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getShowId() { return showId; }
    public void setShowId(Long showId) { this.showId = showId; }
    public List<String> getSeatNumbers() { return seatNumbers; }
    public void setSeatNumbers(List<String> seatNumbers) { this.seatNumbers = seatNumbers; }
    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
}
