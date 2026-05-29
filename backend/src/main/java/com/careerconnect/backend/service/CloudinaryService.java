package com.careerconnect.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret
    ) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public String uploadResume(MultipartFile file) throws Exception {
        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "raw",
                        "folder", "careerconnect/resumes"
                )
        );

        return uploadResult.get("secure_url").toString();
    }

    public String uploadImage(MultipartFile file, String folder) throws Exception {
        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "image",
                        "folder", folder
                )
        );

        return uploadResult.get("secure_url").toString();
    }

    public String uploadCompanyLogo(MultipartFile file) throws Exception {
        return uploadImage(file, "careerconnect/company-logos");
    }

    public String uploadCompanyBanner(MultipartFile file) throws Exception {
        return uploadImage(file, "careerconnect/company-banners");
    }

    public String uploadStudentPhoto(MultipartFile file) throws Exception {
        return uploadImage(file, "careerconnect/student-photos");
    }
}