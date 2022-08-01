package com.financeapp.api.services.YahooService;

import com.financeapp.api.model.StockWrapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class YahooServiceTest {

    @Autowired
    private YahooService yahooService;

    @Test
    void invoke() throws IOException {
        final StockWrapper stock = yahooService.findStock("AAPL");
        System.out.println(stock.getStock());

        final BigDecimal price = yahooService.findPrice(stock);
        System.out.println(price);

        final BigDecimal change = yahooService.findLastChangePercent(stock);
        System.out.println(change);

        final BigDecimal mean200 = yahooService.findChangeFrom200MeanPercent(stock);
        System.out.println(mean200);

    }

    @Test
    void multipleStocks() throws IOException, InterruptedException {
        final List<StockWrapper> stocks = yahooService.findStocks(Arrays.asList("GOOG", "AMZN"));
        findPrices(stocks);

        Thread.sleep(16000);

        final StockWrapper aa = yahooService.findStock("AAPL");
        stocks.add(aa);

        System.out.println(yahooService.findPrice(aa).getClass());

        findPrices(stocks);
    }

    private void findPrices(List<StockWrapper> stocks) {
        stocks.forEach(stock -> {
            try {
                System.out.println(yahooService.findPrice(stock));
            } catch (IOException e) {
                // ignore
            }
        });
    }

}