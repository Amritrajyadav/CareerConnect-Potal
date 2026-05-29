package com.careerconnect.backend.service;

import java.io.File;
import java.io.FileWriter;

import org.springframework.stereotype.Service;

import com.careerconnect.backend.entity.PlacementOffer;

@Service
public class CertificateService {

    public String generateCertificate(PlacementOffer offer) throws Exception {
        String folderPath = "uploads/certificates";
        File folder = new File(folderPath);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        String fileName = "placement-certificate-" + offer.getId() + ".html";
        String filePath = folderPath + "/" + fileName;

        String html =
                "<html><head><title>Placement Certificate</title>" +
                "<style>" +
                "body{font-family:Arial;text-align:center;padding:60px;background:#f8fafc;}" +
                ".cert{border:8px solid #2563eb;padding:60px;background:white;}" +
                "h1{font-size:42px;color:#1e3a8a;}" +
                "h2{font-size:32px;color:#111827;}" +
                "p{font-size:20px;color:#334155;line-height:1.6;}" +
                ".badge{margin-top:30px;font-weight:bold;color:#16a34a;}" +
                "</style></head><body>" +
                "<div class='cert'>" +
                "<h1>Placement Certificate</h1>" +
                "<p>This is to certify that</p>" +
                "<h2>Student ID #" + offer.getStudentId() + "</h2>" +
                "<p>has successfully accepted the placement offer for</p>" +
                "<h2>" + offer.getOfferTitle() + "</h2>" +
                "<p>Package: <b>" + offer.getPackageAmount() + "</b></p>" +
                "<p>Joining Date: <b>" + offer.getJoiningDate() + "</b></p>" +
                "<p>Offer ID: #" + offer.getId() + "</p>" +
                "<p class='badge'>CareerConnect Pro Advanced</p>" +
                "</div></body></html>";

        FileWriter writer = new FileWriter(filePath);
        writer.write(html);
        writer.close();

        return "/certificates/" + fileName;
    }
}