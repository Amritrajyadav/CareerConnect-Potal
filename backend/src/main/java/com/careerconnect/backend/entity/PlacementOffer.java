package com.careerconnect.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class PlacementOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long applicationId;
    private Long studentId;
    private Long jobId;
    private Long companyId;

    private String offerTitle;
    private String packageAmount;
    private String joiningDate;

    @Column(length = 3000)
    private String offerMessage;

    private String status = "PENDING";

    @Column(length = 2000)
    private String certificateUrl;

    private LocalDateTime createdAt = LocalDateTime.now();

    public PlacementOffer() {}

    public Long getId() { return id; }
    public Long getApplicationId() { return applicationId; }
    public Long getStudentId() { return studentId; }
    public Long getJobId() { return jobId; }
    public Long getCompanyId() { return companyId; }
    public String getOfferTitle() { return offerTitle; }
    public String getPackageAmount() { return packageAmount; }
    public String getJoiningDate() { return joiningDate; }
    public String getOfferMessage() { return offerMessage; }
    public String getStatus() { return status; }
    public String getCertificateUrl() { return certificateUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
    public void setOfferTitle(String offerTitle) { this.offerTitle = offerTitle; }
    public void setPackageAmount(String packageAmount) { this.packageAmount = packageAmount; }
    public void setJoiningDate(String joiningDate) { this.joiningDate = joiningDate; }
    public void setOfferMessage(String offerMessage) { this.offerMessage = offerMessage; }
    public void setStatus(String status) { this.status = status; }
    public void setCertificateUrl(String certificateUrl) { this.certificateUrl = certificateUrl; }
}