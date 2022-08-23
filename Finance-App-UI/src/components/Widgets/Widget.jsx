import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import "./Widget.scss";

const Widget = ({ type, apiData, accounts }) => {
  const [data, setData] = useState({});
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  let dollarUSLocale = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    setParams(type);
    if (apiData.length !== 0) {
      setLoading(false);
    }
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
          link: (
            <Link className="stockLink" to="/stocks">
              See all Stocks
            </Link>
          ),
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
        setAmount(319.16);
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
            let settingAmount = accounts.find(
              (account) => account.name === "CHASE COLLEGE"
            ).balances.current;
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

  const show = (
    <>
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
    </>
  );

  return (
    <>
      {loading ? (
        <div className="loading">
          <Spinner className="loading-spinner" animation="grow" />
        </div>
      ) : (
        show
      )}
    </>
  );
};

export default Widget;
