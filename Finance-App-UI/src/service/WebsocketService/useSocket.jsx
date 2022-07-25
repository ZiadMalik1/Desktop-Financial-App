import { useEffect, useState } from "react";
import proto from "../../resources/YPricingData.proto";

const protobuf = require("protobufjs");
const { Buffer } = require("buffer/");

const ws = new WebSocket("wss://streamer.finance.yahoo.com");

function useSocket(labelData) {
  const [stockInfo, setStockInfo] = useState([]);

  useEffect(() => {
    setStockInfo(getStockInfo(labelData));
    getPrice();
  }, [labelData]);

  const getPrice = () => {
    protobuf.load(proto, (error, root) => {
      if (error) {
        return console.log(error);
      }
      const Yaticker = root.lookupType("yaticker");

      ws.onopen = function open() {
        console.log("connected");
        ws.send(
          JSON.stringify({
            subscribe: labelData,
          })
        );
      };

      ws.onclose = function close() {
        console.log("disconnected");
      };

      ws.onmessage = function incoming(message) {
        const next = Yaticker.decode(new Buffer(message.data, "base64"));
        let newArr = Array.from(stockInfo);
        let obj = newArr.find((f) => f.Label === next.id);
        if (obj) obj.Value = next.price;
        setStockInfo(newArr);
      };
    });
  };
  return [stockInfo];
}

const getStockInfo = (data) => {
  return data.map((element) => ({
    Label: element,
    Value: 0,
  }));
};

export default useSocket;