package com.ad.ad.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/careers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CareerController {

    private final JavaMailSender mailSender;

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitApplication(
            @RequestParam("roles") String roles,
            @RequestParam("name") String name,
            @RequestParam("nationality") String nationality,
            @RequestParam("email") String email,
            @RequestParam(value = "notes", required = false) String notes,
            @RequestParam(value = "portfolio", required = false) MultipartFile portfolio,
            @RequestParam(value = "resume", required = false) MultipartFile resume) {

        Map<String, Object> response = new HashMap<>();
        try {
            MimeMessage message = mailSender.createMimeMessage();
            // Enable multipart mode for attachments
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo("james42286910@gmail.com");
            helper.setSubject("New Career Application from " + name + " [" + roles + "]");

            StringBuilder text = new StringBuilder();
            text.append("[VERARVO 직원 채용 지원서 수신]\n\n")
                .append("■ 지원자 이름: ").append(name).append("\n")
                .append("■ 이메일: ").append(email).append("\n")
                .append("■ 국적: ").append(nationality).append("\n")
                .append("■ 지원 희망 직무: ").append(roles).append("\n\n")
                .append("■ 기타 붙임말:\n").append(notes != null ? notes : "없음").append("\n");

            helper.setText(text.toString());

            // Attach files if present
            if (portfolio != null && !portfolio.isEmpty()) {
                helper.addAttachment(portfolio.getOriginalFilename(), portfolio);
            }
            if (resume != null && !resume.isEmpty()) {
                helper.addAttachment(resume.getOriginalFilename(), resume);
            }

            mailSender.send(message);

            response.put("success", true);
            response.put("message", "Application submitted successfully.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
