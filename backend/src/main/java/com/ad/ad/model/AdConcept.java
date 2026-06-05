package com.ad.ad.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ad_concepts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdConcept {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long campaignId;

    @Column(nullable = false)
    private String slogan;

    @Column(nullable = false, length = 1000)
    private String coreMessage;

    @Column(nullable = false)
    private String targetPlatform;

    @Column(nullable = false)
    private String mood;

    @Column(nullable = false)
    private Double estimatedCTR;

    @Column(nullable = false)
    private Double estimatedROAS;
}
