package com.careerconnect.backend.repository;

import com.careerconnect.backend.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findByActiveTrue();

}