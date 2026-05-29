package com.careerconnect.backend.controller;

import com.careerconnect.backend.entity.Notification;
import com.careerconnect.backend.entity.Offer;
import com.careerconnect.backend.entity.User;
import com.careerconnect.backend.repository.NotificationRepository;
import com.careerconnect.backend.repository.OfferRepository;
import com.careerconnect.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin
public class OfferController {

    private final OfferRepository offerRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public OfferController(
            OfferRepository offerRepository,
            UserRepository userRepository,
            NotificationRepository notificationRepository
    ) {
        this.offerRepository = offerRepository;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public List<Offer> activeOffers() {
        return offerRepository.findByActiveTrue();
    }

    @GetMapping("/admin")
    public List<Offer> allOffersForAdmin() {
        return offerRepository.findAll();
    }

    @PostMapping
    public Offer createOffer(@RequestBody Offer offer) {
        offer.setActive(true);
        Offer saved = offerRepository.save(offer);

        List<User> users = userRepository.findAll();

        for (User user : users) {
            if (
                    offer.getTargetRole() == null ||
                    offer.getTargetRole().equals("ALL") ||
                    offer.getTargetRole().equals(user.getRole().name())
            ) {
                notificationRepository.save(new Notification(
                        user.getId(),
                        "New Offer Available",
                        offer.getTitle(),
                        "OFFER"
                ));
            }
        }

        return saved;
    }

    @PutMapping("/{id}")
    public Offer updateOffer(@PathVariable Long id, @RequestBody Offer data) {
        Offer offer = offerRepository.findById(id).orElseThrow();

        offer.setTitle(data.getTitle());
        offer.setDescription(data.getDescription());
        offer.setImageUrl(data.getImageUrl());
        offer.setTargetRole(data.getTargetRole());
        offer.setActive(data.isActive());

        return offerRepository.save(offer);
    }

    @DeleteMapping("/{id}")
    public String deleteOffer(@PathVariable Long id) {
        offerRepository.deleteById(id);
        return "Offer deleted successfully";
    }
}