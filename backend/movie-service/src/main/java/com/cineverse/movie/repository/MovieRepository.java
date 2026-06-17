package com.cineverse.movie.repository;

import com.cineverse.movie.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {
    @Query("{'title': {$regex: ?0, $options: 'i'}}")
    List<Movie> findByTitleRegexIgnoreCase(String titleRegex);

    List<Movie> findByGenreContaining(String genre);
}
