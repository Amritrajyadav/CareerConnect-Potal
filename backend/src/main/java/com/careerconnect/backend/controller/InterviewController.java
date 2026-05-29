package com.careerconnect.backend.controller;

import com.careerconnect.backend.entity.Interview;
import com.careerconnect.backend.entity.JobApplication;
import com.careerconnect.backend.entity.Notification;
import com.careerconnect.backend.enums.ApplicationStatus;
import com.careerconnect.backend.repository.InterviewRepository;
import com.careerconnect.backend.repository.JobApplicationRepository;
import com.careerconnect.backend.repository.NotificationRepository;
import com.careerconnect.backend.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin
public class InterviewController {

    private final InterviewRepository interviewRepository;
    private final JobApplicationRepository applicationRepository;
    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    public InterviewController(
            InterviewRepository interviewRepository,
            JobApplicationRepository applicationRepository,
            NotificationRepository notificationRepository,
            EmailService emailService
    ) {
        this.interviewRepository = interviewRepository;
        this.applicationRepository = applicationRepository;
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
    }

    @GetMapping
    public List<Interview> allInterviews() {
        return interviewRepository.findAll();
    }

    @GetMapping("/student/{studentId}")
    public List<Interview> studentInterviews(@PathVariable Long studentId) {
        return interviewRepository.findByStudentIdOrderByCreatedAtDesc(studentId);
    }

    @GetMapping("/company/{companyId}")
    public List<Interview> companyInterviews(@PathVariable Long companyId) {
        return interviewRepository.findByCompanyIdOrderByCreatedAtDesc(companyId);
    }

    @PostMapping("/schedule")
    public Interview scheduleInterview(@RequestBody Interview interview) {

        JobApplication application = applicationRepository
                .findById(interview.getApplicationId())
                .orElseThrow();

        interview.setStudentId(application.getStudentId());
        interview.setJobId(application.getJobId());

        application.setStatus(ApplicationStatus.SHORTLISTED);
        application.setInterviewDate(interview.getInterviewDateTime());
        application.setCompanyNote(interview.getHrNote());

        applicationRepository.save(application);

        Interview saved = interviewRepository.save(interview);

        String message =
                "Your interview is scheduled on " +
                        interview.getInterviewDateTime() +
                        ". Meeting Link: " +
                        (interview.getMeetingLink() == null ? "Not added" : interview.getMeetingLink());

        notificationRepository.save(new Notification(
                application.getStudentId(),
                "Interview Scheduled",
                message,
                "INTERVIEW"
        ));

        emailService.sendEmail(
                "student-" + application.getStudentId() + "@demo.com",
                "Interview Scheduled",
                message
        );

        return saved;
    }

    @PatchMapping("/{id}/status")
    public Interview updateInterviewStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        Interview interview = interviewRepository.findById(id).orElseThrow();

        interview.setStatus(status);

        Interview saved = interviewRepository.save(interview);

        notificationRepository.save(new Notification(
                interview.getStudentId(),
                "Interview Status Updated",
                "Your interview status is now: " + status,
                "INTERVIEW"
        ));

        return saved;
    }

    @DeleteMapping("/{id}")
    public String deleteInterview(@PathVariable Long id) {
        interviewRepository.deleteById(id);
        return "Interview deleted successfully";
    }
}