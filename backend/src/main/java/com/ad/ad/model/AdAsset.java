package com.ad.ad.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ad_assets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long campaignId;

    @Column(nullable = false)
    private Long conceptId;

    @Column(nullable = false, length = 3000)
    private String scriptJson; // Storyboard scenes JSON string

    @Column(nullable = false, length = 1000)
    private String primaryCopy;

    @Column(nullable = false)
    private String headlineCopy;

    @Column(nullable = false)
    private String ctaText;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String videoUrl;
}
