package com.cineverse.movie.controller;

import com.cineverse.movie.dto.ApiResponse;
import com.cineverse.movie.model.Movie;
import com.cineverse.movie.service.MovieService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Movie>> createMovie(@RequestBody Movie movie) {
        Movie created = movieService.createMovie(movie);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Movie created successfully", created));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<Movie>>> getAllMovies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "rating") String sortBy) {
        Page<Movie> movies = movieService.getAllMovies(page, size, sortBy);
        return ResponseEntity.ok(ApiResponse.success("Movies retrieved", movies));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Movie>> getMovieById(@PathVariable String id) {
        Movie movie = movieService.getMovieById(id);
        return ResponseEntity.ok(ApiResponse.success("Movie found", movie));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Movie>> updateMovie(@PathVariable String id, @RequestBody Movie movie) {
        Movie updated = movieService.updateMovie(id, movie);
        return ResponseEntity.ok(ApiResponse.success("Movie updated", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMovie(@PathVariable String id) {
        movieService.deleteMovie(id);
        return ResponseEntity.ok(ApiResponse.success("Movie deleted", null));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Movie>>> searchByTitle(@RequestParam String title) {
        List<Movie> movies = movieService.searchByTitle(title);
        return ResponseEntity.ok(ApiResponse.success("Search results", movies));
    }

    @GetMapping("/genre")
    public ResponseEntity<ApiResponse<List<Movie>>> filterByGenre(@RequestParam String genre) {
        List<Movie> movies = movieService.filterByGenre(genre);
        return ResponseEntity.ok(ApiResponse.success("Filtered results", movies));
    }

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<String>> uploadPoster(@RequestParam MultipartFile file) throws IOException {
        String url = movieService.uploadPoster(file);
        return ResponseEntity.ok(ApiResponse.success("File uploaded", url));
    }
}
