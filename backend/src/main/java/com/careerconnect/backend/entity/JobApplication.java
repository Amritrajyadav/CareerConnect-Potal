package com.careerconnect.backend.entity;
import com.careerconnect.backend.enums.ApplicationStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
public class JobApplication {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 private Long studentId; private Long jobId;
 @Enumerated(EnumType.STRING) private ApplicationStatus status=ApplicationStatus.PENDING;
 private String resumePath; private String companyNote; private String interviewDate; private LocalDateTime appliedAt=LocalDateTime.now();
 public JobApplication(){}
 public Long getId(){return id;} public Long getStudentId(){return studentId;} public void setStudentId(Long v){studentId=v;}
 public Long getJobId(){return jobId;} public void setJobId(Long v){jobId=v;} public ApplicationStatus getStatus(){return status;} public void setStatus(ApplicationStatus v){status=v;}
 public String getResumePath(){return resumePath;} public void setResumePath(String v){resumePath=v;} public String getCompanyNote(){return companyNote;} public void setCompanyNote(String v){companyNote=v;}
 public String getInterviewDate(){return interviewDate;} public void setInterviewDate(String v){interviewDate=v;}
}
