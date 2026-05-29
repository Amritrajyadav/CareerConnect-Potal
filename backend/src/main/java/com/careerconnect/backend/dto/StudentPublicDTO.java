package com.careerconnect.backend.dto;

public class StudentPublicDTO {

    private Long studentId;

    private String fullName;

    private String college;

    private String degree;

    private String skills;

    private String bio;

    private String resumePath;

    private Integer atsScore;

    private String recommendedRole;

    private String missingSkills;

    private String suggestions;

    public StudentPublicDTO() {
    }

    public Long getStudentId() {
        return studentId;
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

    public Integer getAtsScore() {
        return atsScore;
    }

    public String getRecommendedRole() {
        return recommendedRole;
    }

    public String getMissingSkills() {
        return missingSkills;
    }

    public String getSuggestions() {
        return suggestions;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
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

    public void setAtsScore(Integer atsScore) {
        this.atsScore = atsScore;
    }

    public void setRecommendedRole(String recommendedRole) {
        this.recommendedRole = recommendedRole;
    }

    public void setMissingSkills(String missingSkills) {
        this.missingSkills = missingSkills;
    }

    public void setSuggestions(String suggestions) {
        this.suggestions = suggestions;
    }
}