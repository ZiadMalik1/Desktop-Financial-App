package com.financeapp.api.asset;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public void updateAsset(@PathVariable("assetId") Long assetId,
            @RequestParam(required = false) String label,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) Double price,
            @RequestParam(required = false) Double shares) {
        assetService.updateAsset(assetId, label, date, price, shares);
    }

    @DeleteMapping(path = "{assetId}")
    public void deleteAsset(@PathVariable("assetId") Long assetId) {
        assetService.deleteAsset(assetId);
    }
}
