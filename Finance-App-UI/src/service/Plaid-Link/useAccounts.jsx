import { useEffect, useState } from "react";

const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    let promise = new Promise(async (resolve, reject) => {
      await fetch("http://localhost:8080/api/v1/plaid/getAccounts")
        .then((response) => response.json())
        .then((response) => {
          setAccounts(response.accounts);
        });
    });

    promise.then(
      function (message) {
        console.log("Resolve: " + message);
      },
      function (error) {
        console.log("Reject: " + error);
      }
    );
  };

  return [accounts];
};

export default useAccounts;
