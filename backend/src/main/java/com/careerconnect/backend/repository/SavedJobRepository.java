package com.careerconnect.backend.repository;

import com.careerconnect.backend.entity.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {

    List<SavedJob> findByStudentId(Long studentId);

    boolean existsByStudentIdAndJobId(Long studentId, Long jobId);

}