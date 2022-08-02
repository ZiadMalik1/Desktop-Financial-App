import { useEffect, useState, useRef } from "react";
import proto from "../../resources/YPricingData.proto";

const protobuf = require("protobufjs");
const { Buffer } = require("buffer/");

function useSocket(labelData) {
  const [stockInfo, setStockInfo] = useState(getStockInfo(labelData));
  const ws = useRef(null);

  useEffect(() => {
    const socket = new WebSocket("wss://streamer.finance.yahoo.com");

    protobuf.load(proto, (error, root) => {
      if (error) {
        return console.log(error);
      }
      const Yaticker = root.lookupType("yaticker");
      socket.onopen = () => {
        console.log("connected");
        socket.send(
          JSON.stringify({
            subscribe: labelData,
          })
        );
      };

      socket.onclose = () => {
        console.log("disconnected");
      };

      socket.onmessage = (message) => {
        const next = Yaticker.decode(new Buffer(message.data, "base64"));
        let newArr = Array.from(stockInfo);
        let obj = newArr.find((f) => f.Label === next.id);
        if (obj) {
          if (obj.Value > next.price) {
            obj.Status = "down";
          } else if (obj.Value < next.price) {
            obj.Status = "up";
          }
          obj.Value = next.price;
          obj.Net = next.change;
          obj.Change = next.changePercent;
        }
        setStockInfo(newArr);
      };
    });

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [labelData, stockInfo]);

  useEffect(() => {
    setStockInfo(getStockInfo(labelData));
  }, [labelData]);

  return [stockInfo];
}

const getStockInfo = (data) => {
  return data.map((element) => ({
    Label: element,
    Value: 0,
    Change: 0,
    Status: "",
    Net: 0,
  }));
};

export default useSocket;
