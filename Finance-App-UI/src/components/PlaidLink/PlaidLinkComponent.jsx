import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
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

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      //
    },
  });

  const onSuccess = async (token, metadata) => {};

  return <div onClick={() => open()}>Connect Bank</div>;
};
export default PlaidLinkComponent;
