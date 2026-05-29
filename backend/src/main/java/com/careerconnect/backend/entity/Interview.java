package com.careerconnect.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long applicationId;
    private Long studentId;
    private Long jobId;
    private Long companyId;

    private String interviewDateTime;

    @Column(length = 1000)
    private String meetingLink;

    @Column(length = 2000)
    private String hrNote;

    private String status = "SCHEDULED";

    private LocalDateTime createdAt = LocalDateTime.now();

    public Interview() {}

    public Long getId() { return id; }
    public Long getApplicationId() { return applicationId; }
    public Long getStudentId() { return studentId; }
    public Long getJobId() { return jobId; }
    public Long getCompanyId() { return companyId; }
    public String getInterviewDateTime() { return interviewDateTime; }
    public String getMeetingLink() { return meetingLink; }
    public String getHrNote() { return hrNote; }
    public String getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
    public void setInterviewDateTime(String interviewDateTime) { this.interviewDateTime = interviewDateTime; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }
    public void setHrNote(String hrNote) { this.hrNote = hrNote; }
    public void setStatus(String status) { this.status = status; }
}