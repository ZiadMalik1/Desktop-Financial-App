package com.financeapp.api.services.stock_price_fetcher;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.oscerd.finnhub.client.Endpoint;
import com.github.oscerd.finnhub.model.*;
import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ParseException;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import java.io.IOException;
import java.util.List;

public class FinnhubClient {

    private CloseableHttpClient httpClient = HttpClients.createDefault();
    private String token;
    private ObjectMapper objectMapper;

    public FinnhubClient() {
    }

    public FinnhubClient(String token) {
        this.token = token;
        this.objectMapper = new ObjectMapper();
    }

    public FinnhubClient(String token, ObjectMapper objectMapper) {
        this.token = token;
        this.objectMapper = objectMapper;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public ObjectMapper getObjectMapper() {
        return objectMapper;
    }

    public void setObjectMapper(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public CloseableHttpClient getHttpClient() {
        return httpClient;
    }

    public void setHttpClient(CloseableHttpClient httpClient) {
        this.httpClient = httpClient;
    }

    public Quote getQuote(String symbol) throws IOException, ParseException {
        HttpGet get = new HttpGet(Endpoint.QUOTE.url() + "?token=" + token + "&symbol=" + symbol);

        String result = null;
        try (CloseableHttpResponse response = httpClient.execute(get)) {
            result = EntityUtils.toString(response.getEntity());
        }

        return objectMapper.readValue(result, Quote.class);
    }

    /**
     *  Get the Stock Candle object for a date or a range. Set startEpoch equal to the endEpoch for one day.
     * @param symbol Ticker symbol
     * @param resolution Supported resolution includes 1, 5, 15, 30, 60, D, W, M.
     * Some timeframes might not be available depending on the exchange.
     * @param startEpoch In seconds, not milliseconds.
     * @param endEpoch As above.
     * @return JSON object with arrays for the close, low, high, open, volume. status is a String.
     * @throws IOException
     * @throws ParseException
     */
    public Candle getCandle(String symbol, String resolution, long startEpoch, long endEpoch) throws IOException, ParseException {
        HttpGet get = new HttpGet(Endpoint.CANDLE.url() + "?token=" + token
                + "&symbol=" + symbol.toUpperCase() + "&resolution=" + resolution + "&from=" + startEpoch + "&to=" + endEpoch);

        String result = null;
        try (CloseableHttpResponse response = httpClient.execute(get)) {
            result = EntityUtils.toString(response.getEntity());
        }

        return objectMapper.readValue(result, Candle.class);
    }

    public CompanyProfile getCompanyProfile(String symbol) throws IOException, ParseException {
        HttpGet get = new HttpGet(Endpoint.COMPANY_PROFILE.url() + "?token=" + token + "&symbol=" + symbol);

        String result = null;
        try (CloseableHttpResponse response = httpClient.execute(get)) {
            result = EntityUtils.toString(response.getEntity());
        }

        return objectMapper.readValue(result, CompanyProfile.class);
    }

    public List<EnrichedSymbol> getSymbols(String exchange) throws IOException, ParseException {
        HttpGet get = new HttpGet(Endpoint.SYMBOL.url() + "?token=" + token + "&exchange=" + Exchange.valueOf(exchange).code());

        String result = null;
        try (CloseableHttpResponse response = httpClient.execute(get)) {
            result = EntityUtils.toString(response.getEntity());
        }

        return objectMapper.readValue(result, new TypeReference<List<EnrichedSymbol>>(){});
    }

    public SymbolLookup searchSymbol(String query) throws IOException, ParseException {
        HttpGet get = new HttpGet(Endpoint.SYMBOL_LOOKUP.url() + "?token=" + token + "&q=" + query);

        String result = null;
        try (CloseableHttpResponse response = httpClient.execute(get)) {
            result = EntityUtils.toString(response.getEntity());
        }

        return objectMapper.readValue(result, SymbolLookup.class);
    }

    public static class Builder {

        private final FinnhubClient client;

        public Builder() {
            client = new FinnhubClient();
        }

        public Builder token(String token) {
            client.setToken(token);
            return this;
        }

        public Builder to(CloseableHttpClient httpClient) {
            client.setHttpClient(httpClient);
            return this;
        }

        public Builder mapper(ObjectMapper mapper) {
            client.setObjectMapper(mapper);
            return this;
        }

        public FinnhubClient build() {
            if (client.getObjectMapper() == null) {
                client.setObjectMapper(new ObjectMapper());
            }
            return client;
        }
    }
}