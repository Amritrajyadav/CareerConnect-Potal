package com.careerconnect.backend.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
@RequestMapping("/api/auth/certificates")
@CrossOrigin
public class CertificateController {

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> viewCertificate(@PathVariable String fileName) {

        File file = new File("uploads/certificates/" + fileName);

        System.out.println("Certificate path: " + file.getAbsolutePath());

        if (!file.exists()) {
            System.out.println("Certificate not found");
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(file);

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .body(resource);
    }
}