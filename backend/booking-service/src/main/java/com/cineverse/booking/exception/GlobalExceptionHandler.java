package com.cineverse.booking.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(ResourceNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "status", "error", "message", e.getMessage(), "timestamp", LocalDateTime.now().toString()));
    }

    @ExceptionHandler(SeatUnavailableException.class)
    public ResponseEntity<Map<String, Object>> handleSeatUnavailable(SeatUnavailableException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                "status", "error", "message", e.getMessage(), "timestamp", LocalDateTime.now().toString()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneral(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "status", "error", "message", "An unexpected error occurred", "timestamp", LocalDateTime.now().toString()));
    }
}
