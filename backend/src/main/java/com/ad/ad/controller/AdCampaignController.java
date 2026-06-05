package com.ad.ad.controller;

import com.ad.ad.model.AdAsset;
import com.ad.ad.model.AdCampaign;
import com.ad.ad.model.AdConcept;
import com.ad.ad.service.AdCampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdCampaignController {

    private final AdCampaignService campaignService;

    @PostMapping("/campaign")
    public ResponseEntity<Map<String, Object>> createCampaign(@RequestBody AdCampaign campaign) {
        try {
            AdCampaign savedCampaign = campaignService.createCampaign(campaign);
            List<AdConcept> concepts = campaignService.getConceptsByCampaignId(savedCampaign.getId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("campaign", savedCampaign);
            response.put("concepts", concepts);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/campaign/{id}/concepts")
    public ResponseEntity<List<AdConcept>> getConcepts(@PathVariable Long id) {
        List<AdConcept> concepts = campaignService.getConceptsByCampaignId(id);
        return ResponseEntity.ok(concepts);
    }

    @PostMapping("/campaign/{campaignId}/select-concept")
    public ResponseEntity<AdCampaign> selectConcept(
            @PathVariable Long campaignId,
            @RequestParam Long conceptId) {
        try {
            AdCampaign updatedCampaign = campaignService.selectConcept(campaignId, conceptId);
            return ResponseEntity.ok(updatedCampaign);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/campaign/{campaignId}/generate-assets")
    public ResponseEntity<AdAsset> generateAssets(@PathVariable Long campaignId) {
        try {
            AdAsset asset = campaignService.generateAssets(campaignId);
            return ResponseEntity.ok(asset);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/campaign/{campaignId}")
    public ResponseEntity<AdCampaign> getCampaign(@PathVariable Long campaignId) {
        return campaignService.getCampaign(campaignId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/campaign/{campaignId}/assets")
    public ResponseEntity<AdAsset> getAssets(@PathVariable Long campaignId) {
        return campaignService.getAssetByCampaignId(campaignId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/campaigns")
    public ResponseEntity<List<AdCampaign>> getAllCampaigns() {
        List<AdCampaign> campaigns = campaignService.getAllCampaigns();
        return ResponseEntity.ok(campaigns);
    }

    @PostMapping("/campaign/{campaignId}/custom-concept")
    public ResponseEntity<AdCampaign> saveCustomConcept(
            @PathVariable Long campaignId,
            @RequestBody Map<String, String> request) {
        try {
            String conceptText = request.get("conceptText");
            AdCampaign updatedCampaign = campaignService.saveCustomConcept(campaignId, conceptText);
            return ResponseEntity.ok(updatedCampaign);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
