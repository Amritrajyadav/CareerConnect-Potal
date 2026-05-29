package com.careerconnect.backend.repository;

import com.careerconnect.backend.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

    List<Interview> findByStudentIdOrderByCreatedAtDesc(Long studentId);

    List<Interview> findByCompanyIdOrderByCreatedAtDesc(Long companyId);

    List<Interview> findByApplicationId(Long applicationId);
}