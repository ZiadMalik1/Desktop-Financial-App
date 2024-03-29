package com.financeapp.api.asset;

import com.financeapp.api.model.StockWrapper;
import com.financeapp.api.services.YahooService.YahooService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    private final YahooService yahooService;

    @Autowired
    public AssetService(AssetRepository assetRepository, YahooService yahooService) {
        this.assetRepository = assetRepository;
        this.yahooService = yahooService;
    }

    public List<Asset> getAllAssets() {
        AtomicReference<Double> updatedPrice = new AtomicReference<>(0.00);
        List<Asset> assetList = assetRepository.findAll();
        List<Asset> newList = assetList.stream()
                .map(asset -> {
                    StockWrapper stock = yahooService.findStock(asset.getLabel());
                    try {
                        updatedPrice.set(yahooService.findPrice(stock).doubleValue());
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    return new Asset(
                            asset.getId(),
                            asset.getLabel(),
                            asset.getShares(),
                            asset.getInitialPrice(),
                            asset.getPurchased(),
                            updatedPrice.get());
                }).toList();
        return newList;
    }

    public Double getTotal() {
        List<Asset> assets = this.getAllAssets();
        return assets.stream().mapToDouble(asset -> (asset.getShares() * asset.getUpdatedPrice())).sum();
    }

    public void addAsset(Asset asset) {
        Optional<Asset> assetOptional = assetRepository.findAssetByLabel(asset.getLabel());
        if (assetOptional.isPresent()) {
            throw new IllegalStateException("Label already Exists");
        }
        System.out.println(asset.toString());
        assetRepository.save(asset);
    }

    public void deleteAsset(Long assetId) {
        if (!assetRepository.existsById(assetId)) {
            throw new IllegalStateException("Asset with ID: " + assetId + " Does Not Exist");
        }
        assetRepository.deleteById(assetId);
    }

    @Transactional
    public void updateAsset(
            String label,
            String stringDate,
            Double price,
            Double shares) {
        Asset asset = assetRepository.findAssetByLabel(label)
                .orElseThrow(() -> new IllegalStateException(
                        "Asset with ID: " + label + " Does Not Exist"));
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

        if (shares != null && asset.getShares() != shares) {
            asset.setShares(shares);
        }
    }
}
