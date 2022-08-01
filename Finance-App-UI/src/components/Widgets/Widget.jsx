import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useEffect, useState } from "react";
import "./Widget.scss";

const Widget = ({ type, apiData, accounts }) => {
  const [data, setData] = useState({});
  const [amount, setAmount] = useState(0);

  let dollarUSLocale = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    setParams(type);
  }, [apiData, accounts]);

  function setParams(type) {
    switch (type) {
      case "stock":
        let sum = 0;
        apiData.forEach((object) => {
          if (object.label !== "BTC-USD" && object.label !== "ETH-USD") {
            sum += object.updatedPrice * object.shares;
          }
        });
        setAmount(sum);
        setData({
          title: "Stock",
          isMoney: true,
          link: "See all Users",
          icon: (
            <ShowChartIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        });
        break;

      case "crypto":
        let cryptoSum = 0;
        apiData.forEach((object) => {
          if (object.label == "BTC-USD" || object.label === "ETH-USD") {
            cryptoSum += object.updatedPrice * object.shares;
          }
        });
        setAmount(cryptoSum);
        setData({
          title: "Crypto",
          isMoney: true,
          link: "See all Cryptocurrency Holdings",
          icon: (
            <CurrencyBitcoinOutlinedIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        });
        break;

      case "property":
        setData({
          title: "Property",
          isMoney: true,
          link: "See all Properties",
          icon: (
            <HomeWorkOutlinedIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        });
        break;

      case "balance":
        if (accounts) {
          if (accounts.length !== 0) {
            accounts.map((element) => console.log(element.balances.current));
            let settingAmount = accounts[0].balances.current;
            setAmount(settingAmount);
          }
        }

        setData({
          title: "Account Balance",
          isMoney: true,
          link: "See all Accounts",
          icon: (
            <AccountBalanceWalletOutlinedIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        });
        break;

      default:
        break;
    }
  }

  //Temporary Data
  const diff = 20;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney}
          {dollarUSLocale.format(amount)}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <ArrowDropUpOutlinedIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
