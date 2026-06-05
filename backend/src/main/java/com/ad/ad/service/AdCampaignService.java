package com.ad.ad.service;

import com.ad.ad.model.AdAsset;
import com.ad.ad.model.AdCampaign;
import com.ad.ad.model.AdConcept;
import com.ad.ad.repository.AdAssetRepository;
import com.ad.ad.repository.AdCampaignRepository;
import com.ad.ad.repository.AdConceptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AdCampaignService {

    private final AdCampaignRepository campaignRepository;
    private final AdConceptRepository conceptRepository;
    private final AdAssetRepository assetRepository;
    private final Random random = new Random();

    @Transactional
    public AdCampaign createCampaign(AdCampaign campaign) {
        // Save the campaign
        AdCampaign savedCampaign = campaignRepository.save(campaign);

        // Generate 3 unique concepts based on campaign details
        generateConcepts(savedCampaign);

        return savedCampaign;
    }

    public List<AdConcept> getConceptsByCampaignId(Long campaignId) {
        return conceptRepository.findByCampaignId(campaignId);
    }

    @Transactional
    public AdCampaign selectConcept(Long campaignId, Long conceptId) {
        AdCampaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new IllegalArgumentException("Campaign not found with id: " + campaignId));
        
        AdConcept concept = conceptRepository.findById(conceptId)
                .orElseThrow(() -> new IllegalArgumentException("Concept not found with id: " + conceptId));

        if (!concept.getCampaignId().equals(campaignId)) {
            throw new IllegalArgumentException("Concept does not belong to this campaign");
        }

        campaign.setSelectedConceptId(conceptId);
        return campaignRepository.save(campaign);
    }

    @Transactional
    public AdAsset generateAssets(Long campaignId) {
        AdCampaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new IllegalArgumentException("Campaign not found with id: " + campaignId));

        if (campaign.getSelectedConceptId() == null) {
            throw new IllegalStateException("No concept selected for this campaign");
        }

        AdConcept concept = conceptRepository.findById(campaign.getSelectedConceptId())
                .orElseThrow(() -> new IllegalArgumentException("Selected concept not found"));

        // Check if assets already generated
        Optional<AdAsset> existingAsset = assetRepository.findByCampaignId(campaignId);
        if (existingAsset.isPresent()) {
            return existingAsset.get();
        }

        // Generate script and copies based on concept and campaign details
        String brandName = campaign.getBrandName();
        String productDesc = campaign.getProductDescription();
        String slogan = concept.getSlogan();
        String target = campaign.getTargetAudience();

        // 1. Script Generation (JSON format for frontend parsing)
        String scriptJson = generateStoryboardJson(brandName, productDesc, slogan, target);

        // 2. Primary Copy, Headline, CTA
        String primaryCopy = String.format("📢 [%s] %s!\n\nCategory: %s | Mood: %s\nPlacements: %s\n\nCore Value: %s\n\nTargeting %s. Optimized to achieve maximum results under timeline: %s, with budget: %s.", 
                brandName, slogan, campaign.getProjectCategory(), campaign.getMood(), campaign.getPlacements(), productDesc, target, campaign.getTargetTimeline(), campaign.getBudgetRange());
        
        String headlineCopy = String.format("%s: %s", brandName, slogan);
        
        String ctaText = getCtaByGoal(campaign.getCampaignGoal());

        // 3. URLs
        // Set beautiful background visual suggestions
        String imageUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop";
        String videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-smartphone-with-a-loading-bar-41604-large.mp4";

        AdAsset asset = AdAsset.builder()
                .campaignId(campaignId)
                .conceptId(concept.getId())
                .scriptJson(scriptJson)
                .primaryCopy(primaryCopy)
                .headlineCopy(headlineCopy)
                .ctaText(ctaText)
                .imageUrl(imageUrl)
                .videoUrl(videoUrl)
                .build();

        return assetRepository.save(asset);
    }

    public Optional<AdCampaign> getCampaign(Long campaignId) {
        return campaignRepository.findById(campaignId);
    }

    public Optional<AdAsset> getAssetByCampaignId(Long campaignId) {
        return assetRepository.findByCampaignId(campaignId);
    }

    public List<AdCampaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    private void generateConcepts(AdCampaign campaign) {
        String brandName = campaign.getBrandName();
        String goal = campaign.getCampaignGoal();
        String mood = campaign.getMood();
        String target = campaign.getTargetAudience();
        String category = campaign.getProjectCategory() != null ? campaign.getProjectCategory() : "General";
        String placements = campaign.getPlacements() != null ? campaign.getPlacements() : "All Channels";

        List<AdConcept> concepts = new ArrayList<>();

        // Concept 1: Performance / Dynamic Hook (ROAS focus)
        concepts.add(AdConcept.builder()
                .campaignId(campaign.getId())
                .slogan(String.format("The ultimate solution for %s | %s", target, brandName))
                .coreMessage(String.format("%s solves complex challenges in %s. Specially optimized for %s placement with high-performance tracking and custom CTAs.", brandName, category, placements))
                .targetPlatform(placements)
                .mood(mood + " & Performance")
                .estimatedCTR(3.84)
                .estimatedROAS(245.5)
                .build());

        // Concept 2: Storytelling / Brand Equity
        concepts.add(AdConcept.builder()
                .campaignId(campaign.getId())
                .slogan(String.format("Crafting comfort in the era of %s, by %s", category, brandName))
                .coreMessage(String.format("Let %s deliver direct solutions to %s. A story-driven approach customized for %s to build brand equity.", brandName, target, placements))
                .targetPlatform(placements)
                .mood(mood + " & Authentic")
                .estimatedCTR(2.15)
                .estimatedROAS(188.0)
                .build());

        // Concept 3: Trendy / Shortform Viral
        concepts.add(AdConcept.builder()
                .campaignId(campaign.getId())
                .slogan(String.format("Why everyone in %s is choosing %s", category, brandName))
                .coreMessage(String.format("Stop wasting time. Dynamic, trend-setting viral video optimized for %s. Designed to capture %s's attention within the first 3 seconds.", placements, target))
                .targetPlatform(placements)
                .mood(mood + " & High Energy")
                .estimatedCTR(5.12)
                .estimatedROAS(310.2)
                .build());

        conceptRepository.saveAll(concepts);
    }

    private String generateStoryboardJson(String brandName, String productDesc, String slogan, String target) {
        // Build JSON representation of storyboard
        return "[" +
                "{" +
                "  \"sceneNo\": 1," +
                "  \"time\": \"0s - 3s\"," +
                "  \"visual\": \"A hand touching a smartphone with a powerful text overlay. A logo rises quickly on the screen.\"," +
                "  \"audio\": \"(Upbeat and trendy beat starts) Are you still just worrying about it?\"," +
                "  \"description\": \"Opening Hook Scene\"" +
                "}," +
                "{" +
                "  \"sceneNo\": 2," +
                "  \"time\": \"3s - 8s\"," +
                "  \"visual\": \"Close-up of a user's realistic expression showing fatigue or difficulty in daily life.\"," +
                "  \"audio\": \"For busy people, time is their most valuable asset.\"," +
                "  \"description\": \"Problem Identification & Empathy\"" +
                "}," +
                "{" +
                "  \"sceneNo\": 3," +
                "  \"time\": \"8s - 12s\"," +
                "  \"visual\": \"Under bright lighting, a screen presenting a solution through a 3D graphic model or a sophisticated demonstration.\"," +
                "  \"audio\": \"Now, all these inconveniences are resolved at once with " + brandName + ".\"," +
                "  \"description\": \"Solution & Core Value Showcase\"" +
                "}," +
                "{" +
                "  \"sceneNo\": 4," +
                "  \"time\": \"12s - 15s\"," +
                "  \"visual\": \"Outro showing a dynamically smiling user feeling satisfied, alongside a discount benefit banner.\"," +
                "  \"audio\": \"Purchase now and start your special transformation! " + slogan + ".\"," +
                "  \"description\": \"Ending & Call to Action (CTA)\"" +
                "}" +
                "]";
    }

    private String getCtaByGoal(String goal) {
        if (goal == null) return "Learn More";
        switch (goal.toUpperCase()) {
            case "CONVERSIONS":
            case "SALES":
                return "Shop Now";
            case "CLICKS":
            case "TRAFFIC":
                return "Learn More";
            case "LEADS":
                return "Get Started";
            default:
                return "Learn More";
        }
    }

    @Transactional
    public AdCampaign saveCustomConcept(Long campaignId, String conceptText) {
        AdCampaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new IllegalArgumentException("Campaign not found with id: " + campaignId));
        
        AdConcept customConcept = AdConcept.builder()
                .campaignId(campaignId)
                .slogan(conceptText.length() > 50 ? conceptText.substring(0, 47) + "..." : conceptText)
                .coreMessage(conceptText)
                .targetPlatform(campaign.getPlacements() != null ? campaign.getPlacements() : "All Channels")
                .mood(campaign.getMood() != null ? campaign.getMood() : "General")
                .estimatedCTR(4.0)
                .estimatedROAS(250.0)
                .build();
        
        AdConcept savedConcept = conceptRepository.save(customConcept);
        campaign.setSelectedConceptId(savedConcept.getId());
        return campaignRepository.save(campaign);
    }
}
