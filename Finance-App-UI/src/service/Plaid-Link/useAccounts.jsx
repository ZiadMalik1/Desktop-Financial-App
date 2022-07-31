import { useEffect, useState } from "react";

const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    handleData();
  }, [accounts]);

  const handleData = async () => {
    let promise = new Promise(async (resolve, reject) => {
      await fetch("https://localhost:8080/api/v1/assets/hello")
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
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
