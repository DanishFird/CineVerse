package com.cineverse.movie.controller;

import com.cineverse.movie.dto.ApiResponse;
import com.cineverse.movie.model.Review;
import com.cineverse.movie.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Review>> addReview(@RequestBody Review review) {
        Review created = reviewService.addReview(review);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Review added", created));
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<ApiResponse<List<Review>>> getReviews(@PathVariable String movieId) {
        List<Review> reviews = reviewService.getReviewsByMovieId(movieId);
        return ResponseEntity.ok(ApiResponse.success("Reviews retrieved", reviews));
    }
}
