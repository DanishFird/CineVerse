package com.cineverse.booking.controller;

import com.cineverse.booking.model.Show;
import com.cineverse.booking.repository.ShowRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/shows")
@CrossOrigin(origins = "*")
public class ShowController {

    private final ShowRepository showRepository;

    public ShowController(ShowRepository showRepository) {
        this.showRepository = showRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllShows() {
        List<Show> shows = showRepository.findAll();
        return ResponseEntity.ok(Map.of("status", "success", "data", shows));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createShow(@RequestBody Show show) {
        Show saved = showRepository.save(show);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("status", "success", "data", saved));
    }
}
