package com.financeapp.api.total;

import com.financeapp.api.asset.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
public class TotalService {

    private TotalRepository totalRepository;

    @Autowired
    private AssetService assetService;
    private final ZoneId easternTime = ZoneId.of("America/New_York");

    @Autowired
    public TotalService(TotalRepository totalRepository) {
        this.totalRepository = totalRepository;
    }

    public List<Total> getAllTotals() {
        if (LocalTime.now(easternTime).getHour() > 16) {
            this.addTotal(new Total(assetService.getTotal()));
        }
        return totalRepository.findAll();
    }

    public void addTotal(Total total) {
        Optional<Total> totalOptional = totalRepository.findTotalByDate(LocalDate.now());

        if (totalOptional.isPresent() || total.getAmount() == 0.0) {
            throw new IllegalStateException("Total from Date: " + total.getDate() + " already Exists");
        }

        totalRepository.save(total);
    }
}
