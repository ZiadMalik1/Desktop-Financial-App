package com.plaid;

import com.plaid.client.ApiClient;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Service
public class PlaidService {

    private final Tokens tokens = new Tokens();

    private final String CLIENT_ID = tokens.getSecret("Client");

    private final String DEVELOPMENT_SECRET = tokens.getSecret("Development");

    private final PlaidApi plaidClient = this.createPlaidClient();

    private String ACCESS_TOKEN = tokens.getSecret("Access_DEVELOPMENT");

    public LinkTokenCreateResponse createLinkToken() {
        LinkTokenCreateRequestUpdate updateRequest = new LinkTokenCreateRequestUpdate();
        updateRequest.setAccountSelectionEnabled(true);
        LinkTokenCreateRequestUser user = new LinkTokenCreateRequestUser().clientUserId("e127110");
        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
                .user(user)
                .clientName("malikBandit")
                .accessToken(this.ACCESS_TOKEN)
                .countryCodes(List.of(CountryCode.US))
                .language("en");

        try {
            Response<LinkTokenCreateResponse> response = plaidClient.linkTokenCreate(request).execute();
            return response.body();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ItemPublicTokenExchangeResponse exchangePublicToken(String token) throws IOException {
        ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest().publicToken(token);
        Response<ItemPublicTokenExchangeResponse> response = plaidClient.itemPublicTokenExchange(request).execute();

        assert response.body() != null;
        tokens.insertSecret(response.body().getAccessToken());
        this.ACCESS_TOKEN = response.body().getAccessToken();

        return response.body();
    }

    public AccountsGetResponse getAccounts() throws IOException {
        Response<AccountsGetResponse> accountsResponse = plaidClient.accountsBalanceGet(
                new AccountsBalanceGetRequest().accessToken(this.ACCESS_TOKEN)).execute();

        return accountsResponse.body();
    }

    private PlaidApi createPlaidClient() {

        HashMap<String, String> apiKeys = new HashMap<>();
        apiKeys.put("clientId", this.CLIENT_ID);
        apiKeys.put("secret", this.DEVELOPMENT_SECRET);
        ApiClient apiClient = new ApiClient(apiKeys);
        apiClient.setPlaidAdapter(ApiClient.Development);

        return apiClient.createService(PlaidApi.class);
    }

    public ResponseEntity<String> accessExists() {
        if (!Objects.equals(this.ACCESS_TOKEN, "")) {
            return ResponseEntity.status(HttpStatus.OK).body("ACCESS TOKEN EXISTS\n");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ACCESS TOKEN DOES NOT EXIST\n");
    }
}
