package com.ad.ad.repository;

import com.ad.ad.model.AdCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdCampaignRepository extends JpaRepository<AdCampaign, Long> {
}
