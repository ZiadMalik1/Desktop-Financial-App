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

    @PostMapping()
    public void addAsset(@RequestBody Asset asset) {
        System.out.println(asset);
        this.assetService.addAsset(asset);
    }

    @PutMapping(path = "{assetId}")
    public void updateAsset(@PathVariable("assetId") Long assetId,
                            @RequestParam(required = false) String label,
                            @RequestParam(required = false) String date,
                            @RequestParam(required = false) Double price,
                            @RequestParam(required = false) Double shares) {
        System.out.println(assetId);
        assetService.updateAsset(assetId, label, date, price, shares);
    }

    @DeleteMapping(path = "{assetId}")
    public void deleteAsset(@PathVariable("assetId") Long assetId) {
        assetService.deleteAsset(assetId);
    }
}


