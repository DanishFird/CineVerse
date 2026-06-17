package com.cineverse.movie.service;

import com.cineverse.movie.exception.ResourceNotFoundException;
import com.cineverse.movie.model.Movie;
import com.cineverse.movie.repository.MovieRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private static final String UPLOAD_DIR = "uploads/";

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Page<Movie> getAllMovies(int page, int size, String sortBy) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return movieRepository.findAll(pageRequest);
    }

    public Movie getMovieById(String id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));
    }

    public Movie updateMovie(String id, Movie movieDetails) {
        Movie movie = getMovieById(id);
        movie.setTitle(movieDetails.getTitle());
        movie.setGenre(movieDetails.getGenre());
        movie.setRating(movieDetails.getRating());
        movie.setLanguage(movieDetails.getLanguage());
        movie.setDuration(movieDetails.getDuration());
        movie.setReleaseDate(movieDetails.getReleaseDate());
        movie.setPosterUrl(movieDetails.getPosterUrl());
        movie.setDescription(movieDetails.getDescription());
        movie.setDirector(movieDetails.getDirector());
        return movieRepository.save(movie);
    }

    public void deleteMovie(String id) {
        getMovieById(id); // Verify exists
        movieRepository.deleteById(id);
    }

    public List<Movie> searchByTitle(String title) {
        return movieRepository.findByTitleRegexIgnoreCase(".*" + title + ".*");
    }

    public List<Movie> filterByGenre(String genre) {
        return movieRepository.findByGenreContaining(genre);
    }

    public String uploadPoster(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), uploadPath.resolve(filename));
        return "/" + UPLOAD_DIR + filename;
    }
}
