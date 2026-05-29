package com.careerconnect.backend.controller;

import com.careerconnect.backend.entity.JobApplication;
import com.careerconnect.backend.entity.Notification;
import com.careerconnect.backend.entity.PlacementOffer;
import com.careerconnect.backend.enums.ApplicationStatus;
import com.careerconnect.backend.repository.JobApplicationRepository;
import com.careerconnect.backend.repository.NotificationRepository;
import com.careerconnect.backend.repository.PlacementOfferRepository;
import com.careerconnect.backend.service.CertificateService;
import com.careerconnect.backend.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placement-offers")
@CrossOrigin
public class PlacementOfferController {

    private final PlacementOfferRepository offerRepository;
    private final JobApplicationRepository applicationRepository;
    private final NotificationRepository notificationRepository;
    private final EmailService emailService;
    private final CertificateService certificateService;

    public PlacementOfferController(
            PlacementOfferRepository offerRepository,
            JobApplicationRepository applicationRepository,
            NotificationRepository notificationRepository,
            EmailService emailService,
            CertificateService certificateService
    ) {
        this.offerRepository = offerRepository;
        this.applicationRepository = applicationRepository;
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
        this.certificateService = certificateService;
    }

    @GetMapping
    public List<PlacementOffer> allOffers() {
        return offerRepository.findAll();
    }

    @GetMapping("/student/{studentId}")
    public List<PlacementOffer> studentOffers(@PathVariable Long studentId) {
        return offerRepository.findByStudentIdOrderByCreatedAtDesc(studentId);
    }

    @GetMapping("/company/{companyId}")
    public List<PlacementOffer> companyOffers(@PathVariable Long companyId) {
        return offerRepository.findByCompanyIdOrderByCreatedAtDesc(companyId);
    }

    @PostMapping("/send")
    public PlacementOffer sendOffer(@RequestBody PlacementOffer offer) {
        JobApplication application = applicationRepository
                .findById(offer.getApplicationId())
                .orElseThrow();

        offer.setStudentId(application.getStudentId());
        offer.setJobId(application.getJobId());
        offer.setStatus("PENDING");

        application.setStatus(ApplicationStatus.SELECTED);
        application.setCompanyNote("Offer letter sent: " + offer.getOfferTitle());
        applicationRepository.save(application);

        PlacementOffer saved = offerRepository.save(offer);

        String message =
                "Congratulations! You received an offer: " +
                        offer.getOfferTitle() +
                        ". Package: " +
                        offer.getPackageAmount() +
                        ". Joining Date: " +
                        offer.getJoiningDate();

        notificationRepository.save(new Notification(
                application.getStudentId(),
                "Offer Letter Received",
                message,
                "PLACEMENT_OFFER"
        ));

        emailService.sendEmail(
                "student-" + application.getStudentId() + "@demo.com",
                "Offer Letter Received",
                message
        );

        return saved;
    }

    @PatchMapping("/{id}/status")
    public PlacementOffer updateOfferStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) throws Exception {
        PlacementOffer offer = offerRepository.findById(id).orElseThrow();

        offer.setStatus(status);

        if ("ACCEPTED".equalsIgnoreCase(status)) {
            String certificateUrl = certificateService.generateCertificate(offer);
            offer.setCertificateUrl(certificateUrl);
        }

        PlacementOffer saved = offerRepository.save(offer);

        notificationRepository.save(new Notification(
                offer.getStudentId(),
                "Offer Status Updated",
                "Your offer status is now: " + status,
                "PLACEMENT_OFFER"
        ));

        return saved;
    }

    @DeleteMapping("/{id}")
    public String deleteOffer(@PathVariable Long id) {
        offerRepository.deleteById(id);
        return "Placement offer deleted successfully";
    }
}