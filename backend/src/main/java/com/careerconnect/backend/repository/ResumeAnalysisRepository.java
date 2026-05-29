package com.careerconnect.backend.repository;

import com.careerconnect.backend.entity.ResumeAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeAnalysisRepository extends JpaRepository<ResumeAnalysis, Long> {

    List<ResumeAnalysis> findByStudentIdOrderByCreatedAtDesc(Long studentId);

}