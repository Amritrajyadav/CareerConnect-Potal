package com.careerconnect.backend.controller;

import com.careerconnect.backend.entity.ResumeAnalysis;
import com.careerconnect.backend.repository.ResumeAnalysisRepository;
import com.careerconnect.backend.service.ResumeParserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resume-analysis")
@CrossOrigin
public class ResumeAnalysisController {

    private final ResumeAnalysisRepository repository;
    private final ResumeParserService parserService;

    public ResumeAnalysisController(
            ResumeAnalysisRepository repository,
            ResumeParserService parserService
    ) {
        this.repository = repository;
        this.parserService = parserService;
    }

    @GetMapping("/{studentId}")
    public List<ResumeAnalysis> getStudentAnalysis(@PathVariable Long studentId) {
        return repository.findByStudentIdOrderByCreatedAtDesc(studentId);
    }

    @PostMapping("/analyze")
    public ResumeAnalysis analyzeResume(@RequestBody ResumeAnalysis request) {
        ResumeAnalysis analysis = buildAnalysis(
                request.getStudentId(),
                "java spring boot react mysql rest api javascript html css"
        );

        return repository.save(analysis);
    }

    @PostMapping("/analyze-pdf/{studentId}")
    public ResumeAnalysis analyzePdfResume(
            @PathVariable Long studentId,
            @RequestParam("file") MultipartFile file
    ) throws Exception {
        String resumeText = parserService.extractTextFromPdf(file);
        ResumeAnalysis analysis = buildAnalysis(studentId, resumeText);
        return repository.save(analysis);
    }

    private ResumeAnalysis buildAnalysis(Long studentId, String resumeText) {
        String text = resumeText == null ? "" : resumeText.toLowerCase();

        String[] importantSkills = {
                "java",
                "spring boot",
                "spring security",
                "react",
                "javascript",
                "mysql",
                "rest api",
                "jwt",
                "docker",
                "aws",
                "git",
                "github",
                "html",
                "css",
                "testing"
        };

        int matched = 0;
        StringBuilder missing = new StringBuilder();

        for (String skill : importantSkills) {
            if (text.contains(skill)) {
                matched++;
            } else {
                if (missing.length() > 0) {
                    missing.append(", ");
                }
                missing.append(skill);
            }
        }

        int score = 45 + (matched * 4);
        if (text.length() > 1200) {
            score += 8;
        }
        if (text.contains("project")) {
            score += 5;
        }
        if (text.contains("github")) {
            score += 4;
        }
        if (text.contains("deployment") || text.contains("deployed")) {
            score += 4;
        }

        if (score > 96) {
            score = 96;
        }

        ResumeAnalysis analysis = new ResumeAnalysis();
        analysis.setStudentId(studentId);
        analysis.setAtsScore(score);
        analysis.setRecommendedRole(getRecommendedRole(text));
        analysis.setMissingSkills(missing.toString());
        analysis.setSuggestions(buildSuggestions(score, missing.toString()));

        return analysis;
    }

    private String getRecommendedRole(String text) {
        if (text.contains("react") && text.contains("spring")) {
            return "Java Full Stack Developer";
        }

        if (text.contains("java") && text.contains("spring boot")) {
            return "Backend Java Developer";
        }

        if (text.contains("react") || text.contains("javascript")) {
            return "Frontend React Developer";
        }

        return "Software Developer";
    }

    private String buildSuggestions(int score, String missingSkills) {
        StringBuilder suggestions = new StringBuilder();

        if (score < 70) {
            suggestions.append("Your resume needs stronger project details, technical keywords, GitHub links, and deployment proof. ");
        } else if (score < 85) {
            suggestions.append("Your resume is good, but you should add measurable project impact and more industry keywords. ");
        } else {
            suggestions.append("Your resume is strong. Add advanced skills and production-level details to improve further. ");
        }

        suggestions.append("Recommended improvements: add skills like ");
        suggestions.append(missingSkills.isBlank() ? "Docker, AWS, CI/CD and testing" : missingSkills);
        suggestions.append(". Also include live project links, GitHub repository, REST API details, database design, authentication, and deployment.");

        return suggestions.toString();
    }
}