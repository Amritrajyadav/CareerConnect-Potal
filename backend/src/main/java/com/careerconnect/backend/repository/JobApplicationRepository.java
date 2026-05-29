package com.careerconnect.backend.repository;

import com.careerconnect.backend.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    boolean existsByStudentIdAndJobId(Long studentId, Long jobId);

}