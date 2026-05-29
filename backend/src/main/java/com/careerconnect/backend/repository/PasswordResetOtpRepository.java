package com.careerconnect.backend.repository;

import com.careerconnect.backend.entity.PasswordResetOtp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetOtpRepository extends JpaRepository<PasswordResetOtp, Long> {

    Optional<PasswordResetOtp> findTopByEmailAndOtpAndUsedFalseOrderByCreatedAtDesc(
            String email,
            String otp
    );
}