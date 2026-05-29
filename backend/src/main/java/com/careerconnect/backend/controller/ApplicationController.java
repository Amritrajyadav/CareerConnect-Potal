package com.careerconnect.backend.controller;

import com.careerconnect.backend.entity.JobApplication;
import com.careerconnect.backend.entity.Notification;
import com.careerconnect.backend.enums.ApplicationStatus;
import com.careerconnect.backend.repository.JobApplicationRepository;
import com.careerconnect.backend.repository.NotificationRepository;
import com.careerconnect.backend.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin
public class ApplicationController {

    private final JobApplicationRepository repo;
    private final NotificationRepository notificationRepo;
    private final EmailService emailService;

    public ApplicationController(
            JobApplicationRepository repo,
            NotificationRepository notificationRepo,
            EmailService emailService
    ) {
        this.repo = repo;
        this.notificationRepo = notificationRepo;
        this.emailService = emailService;
    }

    @GetMapping
    public List<JobApplication> all() {
        return repo.findAll();
    }

    @PostMapping
    public JobApplication apply(@RequestBody JobApplication application) {

        boolean alreadyApplied = repo.existsByStudentIdAndJobId(
                application.getStudentId(),
                application.getJobId()
        );

        if (alreadyApplied) {
            throw new RuntimeException("You have already applied for this job.");
        }

        application.setStatus(ApplicationStatus.PENDING);

        JobApplication saved = repo.save(application);

        notificationRepo.save(new Notification(
                application.getStudentId(),
                "Application Submitted",
                "Your job application has been submitted successfully.",
                "APPLICATION"
        ));

        emailService.sendEmail(
                "student-" + application.getStudentId() + "@demo.com",
                "Application Submitted Successfully",
                "Your application for Job ID " + application.getJobId() + " has been submitted successfully."
        );

        return saved;
    }

    @PatchMapping("/{id}/status")
    public JobApplication status(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status,
            @RequestParam(required = false) String note,
            @RequestParam(required = false) String interviewDate
    ) {
        JobApplication app = repo.findById(id).orElseThrow();

        app.setStatus(status);

        if (note != null) {
            app.setCompanyNote(note);
        }

        if (interviewDate != null) {
            app.setInterviewDate(interviewDate);
        }

        JobApplication saved = repo.save(app);

        String message = "Your application status is now: " + status.name();

        if (interviewDate != null && !interviewDate.isBlank()) {
            message += ". Interview scheduled on: " + interviewDate;
        }

        notificationRepo.save(new Notification(
                app.getStudentId(),
                "Application Status Updated",
                message,
                "STATUS_UPDATE"
        ));

        emailService.sendEmail(
                "student-" + app.getStudentId() + "@demo.com",
                "Application Status Updated",
                message
        );

        return saved;
    }

    @DeleteMapping("/{id}")
    public String deleteApplication(@PathVariable Long id) {
        repo.deleteById(id);
        return "Application deleted";
    }
}