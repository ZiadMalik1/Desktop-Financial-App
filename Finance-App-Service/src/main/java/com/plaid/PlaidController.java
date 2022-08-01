package com.plaid;

import com.plaid.client.model.AccountsGetResponse;
import com.plaid.client.model.ItemPublicTokenExchangeResponse;
import com.plaid.client.model.LinkTokenCreateResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping(path = "api/v1/plaid")
@CrossOrigin()
public class PlaidController {

    private final PlaidService plaidService;

    public PlaidController(PlaidService plaidService) {
        this.plaidService = plaidService;
    }

    @GetMapping(value = "/createLink")
    public LinkTokenCreateResponse createLinkToken() {
        return plaidService.createLinkToken();
    }

    @PostMapping(value = "/exchange")
    public ItemPublicTokenExchangeResponse exchangePublicToken(@RequestBody String token) throws IOException {
        return plaidService.exchangePublicToken(token);
    }

    @GetMapping(path = "/getAccounts")
    public AccountsGetResponse getAccounts() throws IOException {
        return plaidService.getAccounts();
    }

    @GetMapping(path = "/getAccessTokenExists")
    public ResponseEntity<String> accessExists() {
        return plaidService.accessExists();
    }

}
