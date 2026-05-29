package com.careerconnect.backend.controller;

import com.careerconnect.backend.dto.ForgotPasswordRequest;
import com.careerconnect.backend.dto.ResetPasswordRequest;
import com.careerconnect.backend.entity.PasswordResetOtp;
import com.careerconnect.backend.entity.User;
import com.careerconnect.backend.repository.PasswordResetOtpRepository;
import com.careerconnect.backend.repository.UserRepository;
import com.careerconnect.backend.service.EmailService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/password")
@CrossOrigin
public class PasswordResetController {

    private final UserRepository userRepository;
    private final PasswordResetOtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public PasswordResetController(
            UserRepository userRepository,
            PasswordResetOtpRepository otpRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @PostMapping("/forgot")
    public Map<String, String> forgotPassword(@RequestBody ForgotPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not registered"));

        String otp = String.valueOf(100000 + new Random().nextInt(900000));

        PasswordResetOtp resetOtp = new PasswordResetOtp(
                user.getEmail(),
                otp,
                LocalDateTime.now().plusMinutes(10)
        );

        otpRepository.save(resetOtp);

        emailService.sendEmail(
                user.getEmail(),
                "CareerConnect Password Reset OTP",
                "Hello " + user.getFullName() +
                        ", your password reset OTP is: " + otp +
                        ". This OTP is valid for 10 minutes."
        );

        return Map.of(
                "message", "OTP sent successfully. Check backend console/email."
        );
    }

    @PostMapping("/reset")
    public Map<String, String> resetPassword(@RequestBody ResetPasswordRequest request) {

        PasswordResetOtp otp = otpRepository
                .findTopByEmailAndOtpAndUsedFalseOrderByCreatedAtDesc(
                        request.getEmail(),
                        request.getOtp()
                )
                .orElseThrow(() -> new RuntimeException("Invalid OTP"));

        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        otp.setUsed(true);
        otpRepository.save(otp);

        emailService.sendEmail(
                user.getEmail(),
                "CareerConnect Password Changed",
                "Hello " + user.getFullName() +
                        ", your password has been changed successfully."
        );

        return Map.of(
                "message", "Password reset successful"
        );
    }
}