package com.ad.ad.repository;

import com.ad.ad.model.AdConcept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AdConceptRepository extends JpaRepository<AdConcept, Long> {
    List<AdConcept> findByCampaignId(Long campaignId);
}
