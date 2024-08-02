package com.coldOutreachApp.emailService.controller;

import com.coldOutreachApp.emailService.service.EmailService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/readEmails")
    public ResponseEntity<List<String>> getEmails(@RequestParam String username, @RequestParam String password, @RequestParam String folder) {
        int numberOfEmails = 10;

        try {
            List<String> emails = emailService.getEmails(username, password, numberOfEmails,folder);
            return ResponseEntity.ok(emails);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/sendEmails")
    public void sendEmail(@RequestBody EmailRequest emailRequest)  {

        emailService.sendEmail(emailRequest.senderEmail,emailRequest.senderPassword,emailRequest.subject,
                emailRequest.message,emailRequest.csvFilePath,emailRequest.date,emailRequest.time);
    }

    @Data
    public static class EmailRequest {
        private String senderEmail;
        private String senderPassword;
        private String subject;
        private String message;
        private String csvFilePath;
        private String date;
        private String time;
    }




}

