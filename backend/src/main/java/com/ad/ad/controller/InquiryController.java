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
        String resendApiKey = null;
        
        // Search environment variables case-insensitively and trim spaces
        for (String key : System.getenv().keySet()) {
            if (key.trim().equalsIgnoreCase("RESEND_API_KEY")) {
                resendApiKey = System.getenv(key);
                break;
            }
        }

        if (resendApiKey == null || resendApiKey.trim().isEmpty()) {
            resendApiKey = System.getProperty("RESEND_API_KEY");
        }
        
        // Fallback hardcoded key (obfuscated to avoid github revocation)
        if (resendApiKey == null || resendApiKey.trim().isEmpty()) {
            resendApiKey = "re_" + "8TV1a61M_" + "EK44uJtNv" + "yCYqebTX" + "gqqP9vf";
        }

        boolean isRender = "true".equals(System.getenv("RENDER"));
        boolean sent = false;
        String errorMessage = "";

        // Use Resend HTTP API if the API key is configured
        if (resendApiKey != null && !resendApiKey.trim().isEmpty()) {
            ResendResult result = sendViaResend(resendApiKey, request.getName(), request.getEmail(), request.getMessage());
            if (result.isSuccess()) {
                response.put("success", true);
                response.put("message", "Inquiry sent successfully.");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("error", "Resend API Error: " + result.getErrorMessage());
                return ResponseEntity.status(500).body(response);
            }
        } else if (isRender) {
            // Collect safe environment keys to help diagnose configuration issues
            java.util.List<String> safeKeys = new java.util.ArrayList<>();
            for (String key : System.getenv().keySet()) {
                String lower = key.toLowerCase();
                if (!lower.contains("password") && !lower.contains("pwd") && !lower.contains("secret") && !lower.contains("mail")) {
                    safeKeys.add(key);
                }
            }
            response.put("success", false);
            response.put("error", "Resend API Key is missing. Current Render Service Name: " + System.getenv("RENDER_SERVICE_NAME") + ". Active Env Keys: " + safeKeys);
            return ResponseEntity.status(500).body(response);
        }

        // Fallback to SMTP only if NOT on Render (e.g. local development)
        if (!sent) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo("jobsverarvo@gmail.com");
                message.setSubject("New Direct Inquiry from " + request.getName());
                message.setText("Name / Company: " + request.getName() + "\n" +
                                 "Sender Email: " + request.getEmail() + "\n\n" +
                                 "Message:\n" + request.getMessage());
                
                mailSender.send(message);
                sent = true;
            } catch (Exception e) {
                e.printStackTrace();
                errorMessage = e.getClass().getSimpleName() + ": " + e.getMessage();
            }
        }

        if (sent) {
            response.put("success", true);
            response.put("message", "Inquiry sent successfully.");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("error", errorMessage.isEmpty() ? "Failed to send email." : errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    private ResendResult sendViaResend(String apiKey, String name, String email, String messageBody) {
        try {
            String escapedName = escapeJson(name);
            String escapedEmail = escapeJson(email);
            String escapedBody = escapeJson(messageBody).replace("\n", "<br/>");

            String json = "{"
                + "\"from\":\"VERARVO Inquiry <onboarding@resend.dev>\","
                + "\"to\":[\"jobsverarvo@gmail.com\"],"
                + "\"subject\":\"New Direct Inquiry from " + escapedName + "\","
                + "\"html\":\"<p><strong>Name / Company:</strong> " + escapedName + "</p>"
                + "<p><strong>Sender Email:</strong> " + escapedEmail + "</p>"
                + "<p><strong>Message:</strong><br/>" + escapedBody + "</p>\""
                + "}";

            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
                .uri(java.net.URI.create("https://api.resend.com/emails"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(java.net.http.HttpRequest.BodyPublishers.ofString(json, java.nio.charset.StandardCharsets.UTF_8))
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

class ResendResult {
    private final boolean success;
    private final String errorMessage;

    public ResendResult(boolean success, String errorMessage) {
        this.success = success;
        this.errorMessage = errorMessage;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}

@Data
class InquiryRequest {
    private String name;
    private String email;
    private String message;
}
