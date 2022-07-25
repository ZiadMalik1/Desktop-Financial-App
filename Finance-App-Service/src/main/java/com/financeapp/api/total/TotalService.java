package com.financeapp.api.total;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TotalService {

    private TotalRepository totalRepository;

    @Autowired
    public TotalService(TotalRepository totalRepository) {
        this.totalRepository = totalRepository;
    }

    public List<Total> getAllTotals(){
        return totalRepository.findAll();
    }

    public void addTotal(Total total) {
        Optional<Total> totalOptional = totalRepository.findTotalByDate(LocalDate.now());

        if(totalOptional.isPresent() || total.getAmount() == 0.0) {
            throw new IllegalStateException("Total from Date: "+ total.getDate() + " already Exists");
        }

        totalRepository.save(total);
    }
}
