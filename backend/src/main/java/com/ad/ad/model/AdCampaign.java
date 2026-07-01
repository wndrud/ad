package com.ad.ad.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "ad_campaigns")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brandName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String productDescription;

    @Column(nullable = false)
    private String targetAudience;

    @Column(nullable = false)
    private String campaignGoal;

    @Column(nullable = false)
    private String mood;

    private String projectCategory;
    private String placements;
    private String budgetRange;
    private String targetTimeline;
    private String email;

    private Long selectedConceptId;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
