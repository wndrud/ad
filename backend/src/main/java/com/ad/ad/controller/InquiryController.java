package com.ad.ad.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiry")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InquiryController {

    private final JavaMailSender mailSender;

    @PostMapping
    public ResponseEntity<Map<String, Object>> sendInquiry(@RequestBody InquiryRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("jobsverarvo@gmail.com");
            message.setSubject("New Direct Inquiry from " + request.getName());
            message.setText("Name / Company: " + request.getName() + "\n" +
                             "Sender Email: " + request.getEmail() + "\n\n" +
                             "Message:\n" + request.getMessage());
            
            mailSender.send(message);
            
            response.put("success", true);
            response.put("message", "Inquiry sent successfully.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}

@Data
class InquiryRequest {
    private String name;
    private String email;
    private String message;
}
