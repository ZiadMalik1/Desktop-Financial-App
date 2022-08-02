import React, { useEffect, useState } from "react";
import { PlaidLink } from "react-plaid-link";
import "./PlaidLink.scss";

const PlaidLinkComponent = () => {
  const [linkToken, setLinkToken] = useState(null);

  const generateToken = async () => {
    const response = await fetch(
      "http://localhost:8080/api/v1/plaid/createLink"
    );
    const data = await response.json();
    setLinkToken(data.linkToken);
  };
  useEffect(() => {
    generateToken();
  }, []);

  const onSuccess = async (token, metadata) => {
    await fetch("http://localhost:8080/api/v1/plaid/exchange", {
      method: "POST",
      body: token,
      header: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <PlaidLink
      token={linkToken}
      clientName="malikBandit"
      env="development"
      product={["auth", "transactions"]}
      onSuccess={onSuccess}
      className="connect-button"
    >
      Connect your Bank Accounts
    </PlaidLink>
  );
};
export default PlaidLinkComponent;
