package com.careerconnect.backend.repository;

import com.careerconnect.backend.entity.PlacementOffer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlacementOfferRepository extends JpaRepository<PlacementOffer, Long> {

    List<PlacementOffer> findByStudentIdOrderByCreatedAtDesc(Long studentId);

    List<PlacementOffer> findByCompanyIdOrderByCreatedAtDesc(Long companyId);

    long countByStatus(String status);
}