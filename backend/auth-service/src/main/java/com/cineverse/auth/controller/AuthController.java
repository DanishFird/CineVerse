package com.cineverse.auth.controller;

import com.cineverse.auth.dto.AuthResponse;
import com.cineverse.auth.dto.LoginDTO;
import com.cineverse.auth.dto.RegisterDTO;
import com.cineverse.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterDTO dto) {
        AuthResponse response = authService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "status", "success",
                "message", "User registered successfully",
                "data", response
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginDTO dto) {
        AuthResponse response = authService.login(dto);
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Login successful",
                "data", response
        ));
    }

    @GetMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout() {
        // JWT is stateless — logout is handled client-side by discarding the token
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Logged out successfully"
        ));
    }
}
