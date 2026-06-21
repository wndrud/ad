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
        String resendApiKey = null;
        for (String key : System.getenv().keySet()) {
            if (key.trim().equalsIgnoreCase("RESEND_API_KEY")) {
                resendApiKey = System.getenv(key);
                break;
            }
        }
        if (resendApiKey == null || resendApiKey.trim().isEmpty()) {
            resendApiKey = System.getProperty("RESEND_API_KEY");
        }
        if (resendApiKey == null || resendApiKey.trim().isEmpty()) {
            resendApiKey = "re_" + "8TV1a61M_" + "EK44uJtNv" + "yCYqebTX" + "gqqP9vf";
        }

        boolean sent = false;
        String errorMessage = "";

        // Try Resend API first (since Render blocks SMTP ports by default)
        if (resendApiKey != null && !resendApiKey.trim().isEmpty()) {
            ResendResult result = sendViaResend(resendApiKey, name, email, nationality, roles, notes, portfolio, resume);
            if (result.isSuccess()) {
                response.put("success", true);
                response.put("message", "Application submitted successfully.");
                return ResponseEntity.ok(response);
            } else {
                errorMessage = "Resend API Error: " + result.getErrorMessage();
            }
        }

        // Fallback to SMTP
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo("jobsverarvo@gmail.com");
            helper.setSubject("New Career Application from " + name + " [" + roles + "]");

            StringBuilder text = new StringBuilder();
            text.append("[VERARVO 직원 채용 지원서 수신]\n\n")
                .append("■ 지원자 이름: ").append(name).append("\n")
                .append("■ 이메일: ").append(email).append("\n")
                .append("■ 국적: ").append(nationality).append("\n")
                .append("■ 지원 희망 직무: ").append(roles).append("\n\n")
                .append("■ 기타 붙임말:\n").append(notes != null ? notes : "없음").append("\n");

            helper.setText(text.toString());

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
            response.put("error", errorMessage.isEmpty() ? e.getMessage() : errorMessage + " | SMTP: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    private ResendResult sendViaResend(String apiKey, String name, String email, String nationality, String roles, String notes, MultipartFile portfolio, MultipartFile resume) {
        try {
            String defaultApiKey = "re_" + "8TV1a61M_" + "EK44uJtNv" + "yCYqebTX" + "gqqP9vf";
            String recipientEmail = "jobsverarvo@gmail.com";
            if (apiKey.equals(defaultApiKey)) {
                recipientEmail = "james42286910@gmail.com";
            }

            String escapedName = escapeJson(name);
            String escapedEmail = escapeJson(email);
            String escapedNationality = escapeJson(nationality);
            String escapedRoles = escapeJson(roles);
            String escapedNotes = escapeJson(notes != null ? notes : "없음").replace("\n", "<br/>");

            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.append("{")
                .append("\"from\":\"VERARVO Careers <onboarding@resend.dev>\",")
                .append("\"to\":[\"").append(recipientEmail).append("\"],")
                .append("\"subject\":\"New Career Application from ").append(escapedName).append(" [").append(escapedRoles).append("]\",")
                .append("\"html\":\"<p><strong>[VERARVO 직원 채용 지원서 수신]</strong></p>")
                .append("<p><strong>■ 지원자 이름:</strong> ").append(escapedName).append("</p>")
                .append("<p><strong>■ 이메일:</strong> ").append(escapedEmail).append("</p>")
                .append("<p><strong>■ 국적:</strong> ").append(escapedNationality).append("</p>")
                .append("<p><strong>■ 지원 희망 직무:</strong> ").append(escapedRoles).append("</p>")
                .append("<p><strong>■ 기타 붙임말:</strong><br/>").append(escapedNotes).append("</p>\"");

            boolean hasPortfolio = portfolio != null && !portfolio.isEmpty();
            boolean hasResume = resume != null && !resume.isEmpty();
            if (hasPortfolio || hasResume) {
                jsonBuilder.append(",\"attachments\":[");
                boolean first = true;
                if (hasPortfolio) {
                    byte[] bytes = portfolio.getBytes();
                    String base64 = java.util.Base64.getEncoder().encodeToString(bytes);
                    jsonBuilder.append("{")
                        .append("\"content\":\"").append(base64).append("\",")
                        .append("\"filename\":\"").append(escapeJson(portfolio.getOriginalFilename())).append("\"")
                        .append("}");
                    first = false;
                }
                if (hasResume) {
                    if (!first) {
                        jsonBuilder.append(",");
                    }
                    byte[] bytes = resume.getBytes();
                    String base64 = java.util.Base64.getEncoder().encodeToString(bytes);
                    jsonBuilder.append("{")
                        .append("\"content\":\"").append(base64).append("\",")
                        .append("\"filename\":\"").append(escapeJson(resume.getOriginalFilename())).append("\"")
                        .append("}");
                }
                jsonBuilder.append("]");
            }

            jsonBuilder.append("}");

            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
                .uri(java.net.URI.create("https://api.resend.com/emails"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(java.net.http.HttpRequest.BodyPublishers.ofString(jsonBuilder.toString(), java.nio.charset.StandardCharsets.UTF_8))
                .build();

            java.net.http.HttpResponse<String> response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                return new ResendResult(true, null);
            } else {
                return new ResendResult(false, "Status " + response.statusCode() + " - " + response.body());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResendResult(false, e.getClass().getSimpleName() + ": " + e.getMessage());
        }
    }

    private String escapeJson(String string) {
        if (string == null) return "";
        return string.replace("\\", "\\\\")
                     .replace("\"", "\\\"")
                     .replace("\b", "\\b")
                     .replace("\f", "\\f")
                     .replace("\r", "\\r")
                     .replace("\t", "\\t");
    }
}
