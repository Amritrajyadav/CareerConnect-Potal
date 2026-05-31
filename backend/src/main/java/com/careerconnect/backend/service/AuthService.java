package com.careerconnect.backend.service;

import com.careerconnect.backend.dto.AuthResponse;
import com.careerconnect.backend.dto.LoginRequest;
import com.careerconnect.backend.dto.RegisterRequest;
import com.careerconnect.backend.entity.User;
import com.careerconnect.backend.enums.Role;
import com.careerconnect.backend.repository.UserRepository;
import com.careerconnect.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(
            UserRepository repo,
            PasswordEncoder encoder,
            JwtService jwt
    ) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public AuthResponse register(RegisterRequest r) {

        if (r.getEmail() == null || r.getEmail().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        if (r.getPassword() == null || r.getPassword().isBlank()) {
            throw new RuntimeException("Password is required");
        }

        if (repo.existsByEmail(r.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        Role role = r.getRole() == null ? Role.STUDENT : r.getRole();

        boolean approved = role == Role.STUDENT || role == Role.ADMIN;

        User user = new User(
                r.getFullName(),
                r.getEmail(),
                encoder.encode(r.getPassword()),
                role,
                r.getPhone(),
                approved
        );

        User saved = repo.save(user);

        return new AuthResponse(
                jwt.generateToken(saved),
                saved.getId(),
                saved.getFullName(),
                saved.getEmail(),
                saved.getRole(),
                saved.isApproved()
        );
    }

    public AuthResponse login(LoginRequest r) {

        User user = repo.findByEmail(r.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!encoder.matches(r.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.isActive()) {
            throw new RuntimeException("Your account is blocked");
        }

        return new AuthResponse(
                jwt.generateToken(user),
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.isApproved()
        );
    }
}