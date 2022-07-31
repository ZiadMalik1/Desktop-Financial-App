package com.financeapp.api.asset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {

    @Query("SELECT s FROM Asset s WHERE s.label = ?1")
    Optional<Asset> findAssetByLabel(String label);

    Optional<Asset> findAssetById(Long Id);

}
