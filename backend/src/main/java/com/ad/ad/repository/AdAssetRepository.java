package com.ad.ad.repository;

import com.ad.ad.model.AdAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdAssetRepository extends JpaRepository<AdAsset, Long> {
    Optional<AdAsset> findByCampaignId(Long campaignId);
    Optional<AdAsset> findByConceptId(Long conceptId);
}
