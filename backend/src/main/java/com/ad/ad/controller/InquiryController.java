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
        String resendApiKey = System.getenv("RESEND_API_KEY");
        if (resendApiKey == null || resendApiKey.trim().isEmpty()) {
            resendApiKey = System.getProperty("RESEND_API_KEY");
        }

        boolean sent = false;
        String errorMessage = "";

        // Use Resend HTTP API if the API key is configured (avoids port blocks on platforms like Render Free tier)
        if (resendApiKey != null && !resendApiKey.trim().isEmpty()) {
            sent = sendViaResend(resendApiKey, request.getName(), request.getEmail(), request.getMessage());
            if (!sent) {
                errorMessage = "Resend API call failed. Check server logs.";
            }
        }

        // Fallback to SMTP if Resend is not configured or fails
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

    private boolean sendViaResend(String apiKey, String name, String email, String messageBody) {
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
                return true;
            } else {
                System.err.println("Resend API failed: " + response.statusCode() + " - " + response.body());
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
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

@Data
class InquiryRequest {
    private String name;
    private String email;
    private String message;
}
