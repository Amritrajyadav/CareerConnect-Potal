package com.careerconnect.backend.controller;

import com.careerconnect.backend.entity.Job;
import com.careerconnect.backend.entity.User;
import com.careerconnect.backend.enums.Role;
import com.careerconnect.backend.repository.InterviewRepository;
import com.careerconnect.backend.repository.JobApplicationRepository;
import com.careerconnect.backend.repository.JobRepository;
import com.careerconnect.backend.repository.PlacementOfferRepository;
import com.careerconnect.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final UserRepository users;
    private final JobRepository jobs;
    private final JobApplicationRepository apps;
    private final InterviewRepository interviews;
    private final PlacementOfferRepository placementOffers;

    public AdminController(
            UserRepository users,
            JobRepository jobs,
            JobApplicationRepository apps,
            InterviewRepository interviews,
            PlacementOfferRepository placementOffers
    ) {
        this.users = users;
        this.jobs = jobs;
        this.apps = apps;
        this.interviews = interviews;
        this.placementOffers = placementOffers;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        Map<String, Object> data = new LinkedHashMap<>();

        long totalUsers = users.count();
        long totalStudents = users.findByRole(Role.STUDENT).size();
        long totalCompanies = users.findByRole(Role.COMPANY).size();
        long totalOffers = placementOffers.count();
        long acceptedOffers = placementOffers.countByStatus("ACCEPTED");

        data.put("totalUsers", totalUsers);
        data.put("students", totalStudents);
        data.put("companies", totalCompanies);
        data.put("jobs", jobs.count());
        data.put("applications", apps.count());
        data.put("interviews", interviews.count());
        data.put("placementOffers", totalOffers);
        data.put("acceptedOffers", acceptedOffers);
        data.put("placementRatio", totalStudents == 0 ? 0 : Math.round((acceptedOffers * 100.0) / totalStudents));

        return data;
    }

    @GetMapping("/users")
    public List<User> allUsers() {
        return users.findAll();
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        users.deleteById(id);
        return "User deleted successfully";
    }

    @PatchMapping("/users/{id}/block")
    public User block(@PathVariable Long id) {
        User user = users.findById(id).orElseThrow();
        user.setActive(false);
        return users.save(user);
    }

    @PatchMapping("/users/{id}/unblock")
    public User unblock(@PathVariable Long id) {
        User user = users.findById(id).orElseThrow();
        user.setActive(true);
        return users.save(user);
    }

    @PatchMapping("/companies/{id}/approve")
    public User approve(@PathVariable Long id) {
        User user = users.findById(id).orElseThrow();
        user.setApproved(true);
        return users.save(user);
    }

    @GetMapping("/jobs")
    public List<Job> allJobs() {
        return jobs.findAll();
    }

    @PutMapping("/jobs/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job data) {
        Job job = jobs.findById(id).orElseThrow();

        job.setTitle(data.getTitle());
        job.setDescription(data.getDescription());
        job.setLocation(data.getLocation());
        job.setSalary(data.getSalary());
        job.setExperience(data.getExperience());
        job.setSkillsRequired(data.getSkillsRequired());
        job.setJobType(data.getJobType());
        job.setActive(data.isActive());

        return jobs.save(job);
    }

    @DeleteMapping("/jobs/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobs.deleteById(id);
        return "Job deleted successfully";
    }
}