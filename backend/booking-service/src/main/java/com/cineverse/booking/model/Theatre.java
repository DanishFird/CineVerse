package com.cineverse.booking.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "theatres")
public class Theatre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String location;

    @OneToMany(mappedBy = "theatre", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Screen> screens;

    public Theatre() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public List<Screen> getScreens() { return screens; }
    public void setScreens(List<Screen> screens) { this.screens = screens; }
}
