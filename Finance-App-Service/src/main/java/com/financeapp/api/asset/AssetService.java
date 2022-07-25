package com.financeapp.api.asset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    @Autowired
    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public void addAsset(Asset asset) {
        Optional<Asset> assetOptional = assetRepository.findAssetByLabel(asset.getLabel());
        if (assetOptional.isPresent()) {
            throw new IllegalStateException("Label already Exists");
        }
        assetRepository.save(asset);
    }

    public void deleteAsset(Long assetId) {
        if (!assetRepository.existsById(assetId)) {
            throw new IllegalStateException("Asset with ID: " + assetId + " Does Not Exist");
        }
        assetRepository.deleteById(assetId);
    }

    @Transactional
    public void updateAsset(Long assetId,
                            String label,
                            String stringDate,
                            Double price) {
        Asset asset = assetRepository.findAssetById(assetId)
                .orElseThrow(() -> new IllegalStateException(
                        "Asset with ID: " + assetId + " Does Not Exist"
                ));
        if (label != null && label.length() > 0 && !Objects.equals(asset.getLabel(), label)) {
            asset.setLabel(label);
        }

        if (stringDate != null) {
            LocalDate date = LocalDate.parse(stringDate);
            if (!date.equals(asset.getPurchased())) {
                asset.setPurchased(date);
            }
        }

        if (price != null && price != 0 && asset.getInitialPrice() != price) {
            asset.setInitialPrice(price);
        }
    }
}
