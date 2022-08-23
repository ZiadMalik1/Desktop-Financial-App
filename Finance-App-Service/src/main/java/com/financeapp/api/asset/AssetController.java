package com.financeapp.api.asset;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/assets")
@CrossOrigin()
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping()
    public List<Asset> getAll() {
        return assetService.getAllAssets();
    }

    @CrossOrigin()
    @PostMapping()
    public void addAsset(@RequestBody Asset asset) {
        Asset newAsset = new Asset(asset.getLabel(), asset.getShares(), asset.getInitialPrice());
        this.assetService.addAsset(newAsset);
    }

    @PutMapping(path = "{assetId}")
    public void updateAsset(@PathVariable("assetId") String label,
                            @RequestBody Asset asset) {
        assetService.updateAsset(label, null, asset.getInitialPrice(), asset.getShares());
    }

    @DeleteMapping(path = "{assetId}")
    public void deleteAsset(@PathVariable("assetId") Long assetId) {
        assetService.deleteAsset(assetId);
    }
}
