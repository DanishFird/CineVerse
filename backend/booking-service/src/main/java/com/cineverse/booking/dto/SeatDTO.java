package com.cineverse.booking.dto;

public class SeatDTO {
    private String seatNumber;
    private String type; // REGULAR, PREMIUM
    private String status; // AVAILABLE, BOOKED, LOCKED

    public SeatDTO() {}

    public SeatDTO(String seatNumber, String type, String status) {
        this.seatNumber = seatNumber;
        this.type = type;
        this.status = status;
    }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
