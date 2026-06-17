package com.cineverse.movie.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "movies")
public class Movie {
    @Id
    private String id;
    private String title;
    private List<String> genre;
    private double rating;
    private String language;
    private int duration;
    private String releaseDate;
    private String posterUrl;
    private String description;
    private String director;

    public Movie() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public List<String> getGenre() { return genre; }
    public void setGenre(List<String> genre) { this.genre = genre; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }
    public String getReleaseDate() { return releaseDate; }
    public void setReleaseDate(String releaseDate) { this.releaseDate = releaseDate; }
    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }
}
