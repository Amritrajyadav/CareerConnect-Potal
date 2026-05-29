package com.careerconnect.backend.controller;

import com.careerconnect.backend.entity.SavedJob;
import com.careerconnect.backend.repository.SavedJobRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-jobs")
@CrossOrigin
public class SavedJobController {

    private final SavedJobRepository repo;

    public SavedJobController(SavedJobRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/{studentId}")
    public List<SavedJob> studentSavedJobs(@PathVariable Long studentId) {
        return repo.findByStudentId(studentId);
    }

    @PostMapping
    public SavedJob saveJob(@RequestBody SavedJob savedJob) {
        boolean exists = repo.existsByStudentIdAndJobId(
                savedJob.getStudentId(),
                savedJob.getJobId()
        );

        if (exists) {
            throw new RuntimeException("Job already saved.");
        }

        return repo.save(savedJob);
    }

    @DeleteMapping("/{id}")
    public String deleteSavedJob(@PathVariable Long id) {
        repo.deleteById(id);
        return "Saved job removed";
    }
}