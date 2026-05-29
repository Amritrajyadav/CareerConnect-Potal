package com.careerconnect.backend.entity;

import jakarta.persistence.*;

@Entity
public class CompanyProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String companyName;

    private String website;

    private String industry;

    @Column(length = 3000)
    private String description;

    private String location;

    @Column(length = 2000)
    private String logo;

    @Column(length = 2000)
    private String bannerImage;

    @Column(length = 2000)
    private String tagline;

    @Column(length = 2000)
    private String companySize;

    @Column(length = 2000)
    private String foundedYear;

    public CompanyProfile() {
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getWebsite() {
        return website;
    }

    public String getIndustry() {
        return industry;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
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

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
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
}