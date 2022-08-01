package com.financeapp.api.services.AlphaVantage;

import io.github.mainstringargs.alphavantagescraper.AlphaVantageConnector;
import io.github.mainstringargs.alphavantagescraper.StockQuotes;
import io.github.mainstringargs.alphavantagescraper.output.AlphaVantageException;
import io.github.mainstringargs.alphavantagescraper.output.quote.StockQuotesResponse;
import io.github.mainstringargs.alphavantagescraper.output.quote.data.StockQuote;
import org.springframework.stereotype.Service;

@Service
public class AlphaService {

    private AlphaVantageConnector apiConnector;

    private StockQuotes stockQuotes;

    public AlphaService() {
        String apiKey = "RD7UQQS33V45F84N";
        int timeout = 0;
        this.apiConnector = new AlphaVantageConnector(apiKey, timeout);
        this.stockQuotes = new StockQuotes(apiConnector);
    }

    public Double getQuote(String Label) {
        double price = 0.0;
        try {
            String symbol = Label;
            System.out.println("Stock: " + symbol);
            StockQuotesResponse response = stockQuotes.quote("KR");
            System.out.println("CHECKED");
            StockQuote stock = response.getStockQuote();
            price = stock.getPrice();
            System.out.println("STOCK: " + Label + " PRICE: " + price);
        } catch (AlphaVantageException e) {
            System.out.println("something went wrong");
        }
        return price;
    }

}
