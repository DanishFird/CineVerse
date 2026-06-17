package com.cineverse.auth.service;

import com.cineverse.auth.dto.AuthResponse;
import com.cineverse.auth.dto.LoginDTO;
import com.cineverse.auth.dto.RegisterDTO;
import com.cineverse.auth.exception.BadRequestException;
import com.cineverse.auth.model.Role;
import com.cineverse.auth.model.User;
import com.cineverse.auth.repository.UserRepository;
import com.cineverse.auth.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        Role role;
        try {
            role = dto.getRole() != null ? Role.valueOf(dto.getRole().toUpperCase()) : Role.USER;
        } catch (IllegalArgumentException e) {
            role = Role.USER;
        }

        User user = new User(
                dto.getName(),
                dto.getEmail(),
                passwordEncoder.encode(dto.getPassword()),
                role
        );

        user = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().name());

        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }

    public AuthResponse login(LoginDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().name());

        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }
}
