import { useEffect, useState } from "react";

const useTestConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    testConnection();
  }, []);

  console.log("je");

  const testConnection = async () => {
    let promise = new Promise(async (resolve, reject) => {
      await fetch("https://localhost:8080/api/v1/assets/accessToken").then(
        (response) => {
          if (response.status === 200) {
            setIsConnected(true);
            console.log("TRUE");
          } else {
            console.log("BOOO");
          }
        }
      );
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
