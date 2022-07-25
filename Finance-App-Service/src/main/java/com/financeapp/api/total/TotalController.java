package com.financeapp.api.total;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/totals")
@CrossOrigin
public class TotalController {

    private final TotalService totalService;

    @Autowired
    public TotalController(TotalService totalService) {
        this.totalService = totalService;
    }

    @GetMapping()
    public List<Total> getAll(){
        return totalService.getAllTotals();
    }

    @PostMapping()
    public void addTotal(@RequestBody Total total){
        Total addedTotal = new Total(total.getAmount());
        System.out.println(addedTotal.toString());
        this.totalService.addTotal(addedTotal);
    }

}
