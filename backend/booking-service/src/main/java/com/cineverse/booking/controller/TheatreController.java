package com.cineverse.booking.controller;

import com.cineverse.booking.model.Theatre;
import com.cineverse.booking.repository.TheatreRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/theatres")
@CrossOrigin(origins = "*")
public class TheatreController {

    private final TheatreRepository theatreRepository;

    public TheatreController(TheatreRepository theatreRepository) {
        this.theatreRepository = theatreRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllTheatres() {
        List<Theatre> theatres = theatreRepository.findAll();
        return ResponseEntity.ok(Map.of("status", "success", "data", theatres));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createTheatre(@RequestBody Theatre theatre) {
        Theatre saved = theatreRepository.save(theatre);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("status", "success", "data", saved));
    }
}
