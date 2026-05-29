package com.careerconnect.backend.dto;

import com.careerconnect.backend.entity.Job;

import java.util.List;

public class CompanyPublicDTO {

    private Long companyId;

    private String companyName;

    private String description;

    private String website;

    private String location;

    private String industry;

    private String logo;

    private String bannerImage;

    private String tagline;

    private String companySize;

    private String foundedYear;

    private List<Job> jobs;

    public CompanyPublicDTO() {
    }

    public Long getCompanyId() {
        return companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getDescription() {
        return description;
    }

    public String getWebsite() {
        return website;
    }

    public String getLocation() {
        return location;
    }

    public String getIndustry() {
        return industry;
    }

    public String getLogo() {
        return logo;
    }

    public String getBannerImage() {
        return bannerImage;
    }

    public String getTagline() {
        return tagline;
    }

    public String getCompanySize() {
        return companySize;
    }

    public String getFoundedYear() {
        return foundedYear;
    }

    public List<Job> getJobs() {
        return jobs;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public void setBannerImage(String bannerImage) {
        this.bannerImage = bannerImage;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public void setCompanySize(String companySize) {
        this.companySize = companySize;
    }

    public void setFoundedYear(String foundedYear) {
        this.foundedYear = foundedYear;
    }

    public void setJobs(List<Job> jobs) {
        this.jobs = jobs;
    }
}