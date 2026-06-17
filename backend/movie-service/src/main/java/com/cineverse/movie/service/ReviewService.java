package com.cineverse.movie.service;

import com.cineverse.movie.model.Review;
import com.cineverse.movie.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByMovieId(String movieId) {
        return reviewRepository.findByMovieId(movieId);
    }
}
