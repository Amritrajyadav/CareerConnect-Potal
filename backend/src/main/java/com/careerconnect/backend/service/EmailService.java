package com.careerconnect.backend.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendEmail(String to, String subject, String message) {

        System.out.println("\n====================================");
        System.out.println("EMAIL NOTIFICATION");
        System.out.println("TO: " + to);
        System.out.println("SUBJECT: " + subject);
        System.out.println("MESSAGE: " + message);
        System.out.println("====================================\n");
    }
}