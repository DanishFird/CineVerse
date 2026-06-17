package com.cineverse.booking.dto;

import java.io.Serializable;
import java.util.List;

public class BookingEvent implements Serializable {
    private Long bookingId;
    private Long userId;
    private String userEmail;
    private Long showId;
    private List<String> seatNumbers;
    private double totalAmount;
    private String status;

    public BookingEvent() {}

    public BookingEvent(Long bookingId, Long userId, String userEmail, Long showId,
                        List<String> seatNumbers, double totalAmount, String status) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.userEmail = userEmail;
        this.showId = showId;
        this.seatNumbers = seatNumbers;
        this.totalAmount = totalAmount;
        this.status = status;
    }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public Long getShowId() { return showId; }
    public void setShowId(Long showId) { this.showId = showId; }
    public List<String> getSeatNumbers() { return seatNumbers; }
    public void setSeatNumbers(List<String> seatNumbers) { this.seatNumbers = seatNumbers; }
    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
