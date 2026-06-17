package com.cineverse.booking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shows")
public class Show {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String movieId; // Reference to Movie Service

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "screen_id")
    private Screen screen;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private double ticketPrice;

    public Show() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMovieId() { return movieId; }
    public void setMovieId(String movieId) { this.movieId = movieId; }
    public Screen getScreen() { return screen; }
    public void setScreen(Screen screen) { this.screen = screen; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public double getTicketPrice() { return ticketPrice; }
    public void setTicketPrice(double ticketPrice) { this.ticketPrice = ticketPrice; }
}
