package com.careerconnect.backend.controller;

import com.careerconnect.backend.entity.Job;
import com.careerconnect.backend.repository.JobRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin
public class JobController {

    private final JobRepository repo;

    public JobController(JobRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Job> all() {
        return repo.findAll();
    }

    @GetMapping("/company/{companyId}")
    public List<Job> companyJobs(@PathVariable Long companyId) {
        return repo.findByCompanyId(companyId);
    }

    @PostMapping
    public Job create(@RequestBody Job job) {
        job.setActive(true);
        return repo.save(job);
    }

    @PutMapping("/{id}")
    public Job update(@PathVariable Long id, @RequestBody Job data) {
        Job job = repo.findById(id).orElseThrow();

        job.setTitle(data.getTitle());
        job.setDescription(data.getDescription());
        job.setLocation(data.getLocation());
        job.setSalary(data.getSalary());
        job.setExperience(data.getExperience());
        job.setSkillsRequired(data.getSkillsRequired());
        job.setJobType(data.getJobType());
        job.setActive(data.isActive());

        return repo.save(job);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        repo.deleteById(id);
        return "Job deleted successfully";
    }
}