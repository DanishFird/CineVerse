package com.cineverse.booking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "screens")
public class Screen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // "Audi 1"

    private int totalRows;

    private int seatsPerRow;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "theatre_id")
    @JsonIgnore
    private Theatre theatre;

    public Screen() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getTotalRows() { return totalRows; }
    public void setTotalRows(int totalRows) { this.totalRows = totalRows; }
    public int getSeatsPerRow() { return seatsPerRow; }
    public void setSeatsPerRow(int seatsPerRow) { this.seatsPerRow = seatsPerRow; }
    public Theatre getTheatre() { return theatre; }
    public void setTheatre(Theatre theatre) { this.theatre = theatre; }
}
