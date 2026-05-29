package com.careerconnect.backend.entity;
import com.careerconnect.backend.enums.JobType;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
public class Job {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 private Long companyId; private String title; @Column(length=3000) private String description;
 private String location; private String salary; private String experience; private String skillsRequired;
 @Enumerated(EnumType.STRING) private JobType jobType;
 private boolean active=true; private LocalDateTime createdAt=LocalDateTime.now();
 public Job(){}
 public Long getId(){return id;} public Long getCompanyId(){return companyId;} public void setCompanyId(Long v){companyId=v;}
 public String getTitle(){return title;} public void setTitle(String v){title=v;} public String getDescription(){return description;} public void setDescription(String v){description=v;}
 public String getLocation(){return location;} public void setLocation(String v){location=v;} public String getSalary(){return salary;} public void setSalary(String v){salary=v;}
 public String getExperience(){return experience;} public void setExperience(String v){experience=v;} public String getSkillsRequired(){return skillsRequired;} public void setSkillsRequired(String v){skillsRequired=v;}
 public JobType getJobType(){return jobType;} public void setJobType(JobType v){jobType=v;} public boolean isActive(){return active;} public void setActive(boolean v){active=v;}
}
