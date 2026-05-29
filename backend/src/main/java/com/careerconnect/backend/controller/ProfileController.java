package com.careerconnect.backend.controller;

import com.careerconnect.backend.dto.CompanyPublicDTO;
import com.careerconnect.backend.dto.StudentPublicDTO;
import com.careerconnect.backend.entity.CompanyProfile;
import com.careerconnect.backend.entity.Job;
import com.careerconnect.backend.entity.ResumeAnalysis;
import com.careerconnect.backend.entity.StudentProfile;
import com.careerconnect.backend.repository.CompanyProfileRepository;
import com.careerconnect.backend.repository.JobRepository;
import com.careerconnect.backend.repository.ResumeAnalysisRepository;
import com.careerconnect.backend.repository.StudentProfileRepository;
import com.careerconnect.backend.service.CloudinaryService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin
public class ProfileController {

    private final StudentProfileRepository students;
    private final CompanyProfileRepository companies;
    private final JobRepository jobs;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final CloudinaryService cloudinaryService;

    public ProfileController(
            StudentProfileRepository students,
            CompanyProfileRepository companies,
            JobRepository jobs,
            ResumeAnalysisRepository resumeAnalysisRepository,
            CloudinaryService cloudinaryService
    ) {
        this.students = students;
        this.companies = companies;
        this.jobs = jobs;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping("/students")
    public List<StudentProfile> allStudents() {
        return students.findAll();
    }

    @PostMapping("/student")
    public StudentProfile saveStudent(@RequestBody StudentProfile profile) {
        if (profile.getUserId() == null && profile.getId() != null) {
            profile.setUserId(profile.getId());
        }

        StudentProfile existingProfile = null;

        if (profile.getUserId() != null) {
            existingProfile = students.findByUserId(profile.getUserId()).orElse(null);
        }

        if (existingProfile != null) {
            existingProfile.setFullName(profile.getFullName());
            existingProfile.setCollege(profile.getCollege());
            existingProfile.setDegree(profile.getDegree());
            existingProfile.setSkills(profile.getSkills());
            existingProfile.setBio(profile.getBio());
            existingProfile.setGithubUrl(profile.getGithubUrl());
            existingProfile.setLinkedinUrl(profile.getLinkedinUrl());
            existingProfile.setPortfolioUrl(profile.getPortfolioUrl());

            if (profile.getProfilePhoto() != null) {
                existingProfile.setProfilePhoto(profile.getProfilePhoto());
            }

            if (profile.getResumePath() != null) {
                existingProfile.setResumePath(profile.getResumePath());
            }

            return students.save(existingProfile);
        }

        return students.save(profile);
    }

    @GetMapping("/student/{userId}")
    public StudentProfile getStudentProfile(@PathVariable Long userId) {
        return students.findByUserId(userId)
                .orElseGet(() -> {
                    StudentProfile profile = new StudentProfile();
                    profile.setUserId(userId);
                    return students.save(profile);
                });
    }

    @PostMapping("/student/{userId}/resume")
    public StudentProfile uploadResume(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file
    ) throws Exception {
        StudentProfile profile = students.findByUserId(userId)
                .orElseGet(() -> {
                    StudentProfile newProfile = new StudentProfile();
                    newProfile.setUserId(userId);
                    return newProfile;
                });

        String resumeUrl = cloudinaryService.uploadResume(file);
        profile.setResumePath(resumeUrl);

        return students.save(profile);
    }

    @PostMapping("/student/{userId}/photo")
    public StudentProfile uploadStudentPhoto(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file
    ) throws Exception {
        StudentProfile profile = students.findByUserId(userId)
                .orElseGet(() -> {
                    StudentProfile newProfile = new StudentProfile();
                    newProfile.setUserId(userId);
                    return newProfile;
                });

        String photoUrl = cloudinaryService.uploadStudentPhoto(file);
        profile.setProfilePhoto(photoUrl);

        return students.save(profile);
    }

    @GetMapping("/student/public/{userId}")
    public StudentPublicDTO getPublicStudent(@PathVariable Long userId) {
        StudentProfile profile = students.findByUserId(userId).orElseThrow();

        List<ResumeAnalysis> analysisList =
                resumeAnalysisRepository.findByStudentIdOrderByCreatedAtDesc(userId);

        ResumeAnalysis latest = analysisList.isEmpty() ? null : analysisList.get(0);

        StudentPublicDTO dto = new StudentPublicDTO();

        dto.setStudentId(profile.getUserId());
        dto.setFullName(profile.getFullName());
        dto.setCollege(profile.getCollege());
        dto.setDegree(profile.getDegree());
        dto.setSkills(profile.getSkills());
        dto.setBio(profile.getBio());
        dto.setResumePath(profile.getResumePath());

        if (latest != null) {
            dto.setAtsScore(latest.getAtsScore());
            dto.setRecommendedRole(latest.getRecommendedRole());
            dto.setMissingSkills(latest.getMissingSkills());
            dto.setSuggestions(latest.getSuggestions());
        } else {
            dto.setAtsScore(0);
            dto.setRecommendedRole("Software Developer");
            dto.setMissingSkills("Run resume analyzer to detect missing skills.");
            dto.setSuggestions("Upload and analyze your resume to generate AI suggestions.");
        }

        return dto;
    }

    @GetMapping("/companies")
    public List<CompanyProfile> allCompanies() {
        return companies.findAll();
    }

    @PostMapping("/company")
    public CompanyProfile saveCompany(@RequestBody CompanyProfile profile) {
        CompanyProfile existingProfile = null;

        if (profile.getUserId() != null) {
            existingProfile = companies.findAll()
                    .stream()
                    .filter(c -> c.getUserId() != null && c.getUserId().equals(profile.getUserId()))
                    .findFirst()
                    .orElse(null);
        }

        if (existingProfile != null) {
            existingProfile.setCompanyName(profile.getCompanyName());
            existingProfile.setWebsite(profile.getWebsite());
            existingProfile.setIndustry(profile.getIndustry());
            existingProfile.setDescription(profile.getDescription());
            existingProfile.setLocation(profile.getLocation());
            existingProfile.setTagline(profile.getTagline());
            existingProfile.setCompanySize(profile.getCompanySize());
            existingProfile.setFoundedYear(profile.getFoundedYear());

            if (profile.getLogo() != null) {
                existingProfile.setLogo(profile.getLogo());
            }

            if (profile.getBannerImage() != null) {
                existingProfile.setBannerImage(profile.getBannerImage());
            }

            return companies.save(existingProfile);
        }

        return companies.save(profile);
    }

    @GetMapping("/company/{id}")
    public CompanyProfile getCompanyProfile(@PathVariable Long id) {
        return companies.findById(id)
                .orElseGet(() -> {
                    CompanyProfile profile = new CompanyProfile();
                    profile.setUserId(id);
                    return companies.save(profile);
                });
    }

    @PostMapping("/company/{id}/logo")
    public CompanyProfile uploadCompanyLogo(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws Exception {
        CompanyProfile profile = companies.findById(id)
                .orElseGet(() -> {
                    CompanyProfile newProfile = new CompanyProfile();
                    newProfile.setUserId(id);
                    return newProfile;
                });

        String logoUrl = cloudinaryService.uploadCompanyLogo(file);
        profile.setLogo(logoUrl);

        return companies.save(profile);
    }

    @PostMapping("/company/{id}/banner")
    public CompanyProfile uploadCompanyBanner(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws Exception {
        CompanyProfile profile = companies.findById(id)
                .orElseGet(() -> {
                    CompanyProfile newProfile = new CompanyProfile();
                    newProfile.setUserId(id);
                    return newProfile;
                });

        String bannerUrl = cloudinaryService.uploadCompanyBanner(file);
        profile.setBannerImage(bannerUrl);

        return companies.save(profile);
    }

    @GetMapping("/company/public/{id}")
    public CompanyPublicDTO getPublicCompany(@PathVariable Long id) {
        CompanyProfile company = companies.findById(id).orElseThrow();

        List<Job> companyJobs = jobs.findByCompanyId(id);

        CompanyPublicDTO dto = new CompanyPublicDTO();

        dto.setCompanyId(company.getId());
        dto.setCompanyName(company.getCompanyName());
        dto.setDescription(company.getDescription());
        dto.setWebsite(company.getWebsite());
        dto.setLocation(company.getLocation());
        dto.setIndustry(company.getIndustry());
        dto.setLogo(company.getLogo());
        dto.setBannerImage(company.getBannerImage());
        dto.setTagline(company.getTagline());
        dto.setCompanySize(company.getCompanySize());
        dto.setFoundedYear(company.getFoundedYear());
        dto.setJobs(companyJobs);

        return dto;
    }
}