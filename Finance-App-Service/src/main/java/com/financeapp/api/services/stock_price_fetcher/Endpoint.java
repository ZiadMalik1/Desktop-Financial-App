package com.financeapp.api.services.stock_price_fetcher;


public enum Endpoint {

    QUOTE("https://finnhub.io/api/v1/quote"),
    COMPANY_PROFILE("https://finnhub.io/api/v1/stock/profile2"),
    SYMBOL("https://finnhub.io/api/v1/stock/symbol"),
    SYMBOL_LOOKUP("https://finnhub.io/api/v1/search"),
    CANDLE("https://finnhub.io/api/v1/stock/candle");

    private String url;

    Endpoint(String url) {
        this.url = url;
    }

    public String url() {
        return url;
    }

}