package com.careerconnect.backend.entity;

import jakarta.persistence.*;

@Entity
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String fullName;

    private String college;

    private String degree;

    private String skills;

    @Column(length = 3000)
    private String bio;

    @Column(length = 2000)
    private String resumePath;

    @Column(length = 2000)
    private String profilePhoto;

    private String githubUrl;

    private String linkedinUrl;

    private String portfolioUrl;

    public StudentProfile() {
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getCollege() {
        return college;
    }

    public String getDegree() {
        return degree;
    }

    public String getSkills() {
        return skills;
    }

    public String getBio() {
        return bio;
    }

    public String getResumePath() {
        return resumePath;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public String getPortfolioUrl() {
        return portfolioUrl;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public void setPortfolioUrl(String portfolioUrl) {
        this.portfolioUrl = portfolioUrl;
    }
}