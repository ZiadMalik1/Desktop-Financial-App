import { useEffect, useState } from "react";

const useTestConnection = () => {
  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    let promise = new Promise(async (resolve, reject) => {
      await fetch(
        "http://localhost:8080/api/v1/plaid/getAccessTokenExists"
      ).then((response) => {
        if (response.status === 200) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
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

  return [isConnected];
};

export default useTestConnection;
