package com.financeapp.api.asset;

import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/assets")
@CrossOrigin
public class AssetController {

    private final AssetService assetService;

    @Autowired
    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping()
    public List<Asset> getAll() throws IOException, ParseException {
        return assetService.getAllAssets();
    }

    @PostMapping()
    public void addAsset(@RequestBody Asset asset){
        this.assetService.addAsset(asset);
    }

    @PutMapping(path = "{assetId}")
    public void updateAsset(
            @PathVariable("assetId") Long assetId,
            @RequestParam(required = false) String label,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) Double price){
        System.out.println(assetId);
        assetService.updateAsset(assetId, label, date, price);
    }

    @DeleteMapping(path = "{assetId}")
    public void deleteAsset(@PathVariable("assetId") Long assetId){
        assetService.deleteAsset(assetId);
    }
}
