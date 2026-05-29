package com.careerconnect.backend.service;
import com.careerconnect.backend.dto.*; import com.careerconnect.backend.entity.User; import com.careerconnect.backend.enums.Role; import com.careerconnect.backend.repository.UserRepository; import com.careerconnect.backend.security.JwtService; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.stereotype.Service;
@Service
public class AuthService {
 private final UserRepository repo; private final PasswordEncoder encoder; private final JwtService jwt;
 public AuthService(UserRepository repo,PasswordEncoder encoder,JwtService jwt){this.repo=repo;this.encoder=encoder;this.jwt=jwt;}
 public AuthResponse register(RegisterRequest r){if(repo.existsByEmail(r.getEmail()))throw new RuntimeException("Email already registered"); boolean approved=r.getRole()==Role.STUDENT||r.getRole()==Role.ADMIN; User u=new User(r.getFullName(),r.getEmail(),encoder.encode(r.getPassword()),r.getRole(),r.getPhone(),approved); User s=repo.save(u); return new AuthResponse(jwt.generateToken(s),s.getId(),s.getFullName(),s.getEmail(),s.getRole(),s.isApproved());}
 public AuthResponse login(LoginRequest r){User u=repo.findByEmail(r.getEmail()).orElseThrow(()->new RuntimeException("Invalid email or password")); if(!encoder.matches(r.getPassword(),u.getPassword()))throw new RuntimeException("Invalid email or password"); return new AuthResponse(jwt.generateToken(u),u.getId(),u.getFullName(),u.getEmail(),u.getRole(),u.isApproved());}
}
