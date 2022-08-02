import React, { useEffect, useState } from "react";
import Chart from "../../components/Chart/Chart";
import Featured from "../../components/Featured/Featured";
import Table from "../../components/List/List";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import Widget from "../../components/Widgets/Widget";
import useAccounts from "../../service/Plaid-Link/useAccounts";
import Service from "../../service/useAPI/Service";
import "./Home.scss";

const Home = () => {
  const [apiData, setApiData] = useState([]);
  const [totalsData, setTotalsData] = useState([]);
  const [accounts, setAccounts] = useAccounts();

  const service = new Service();

  useEffect(() => {
    handleData();
    handleTotals();
  }, []);

  const handleData = async () => {
    await service.get("assets").then((res) => {
      setApiData(res);
    });
  };

  const handleTotals = async () => {
    await service.get("totals").then((res) => {
      setTotalsData(res);
    });
  };

  return (
    <div>
      <div className="home">
        <SideBar />
        <div className="homeContainer">
          <NavBar />
          <div className="widgets">
            <Widget type="stock" apiData={apiData} accounts={accounts} />
            <Widget type="crypto" apiData={apiData} accounts={accounts} />
            <Widget type="property" apiData={apiData} accounts={accounts} />
            <Widget type="balance" apiData={apiData} accounts={accounts} />
          </div>
          <div className="charts">
            <Featured />
            <Chart
              stocks={totalsData}
              aspect={2 / 1}
              title="Asset History over Year"
            />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
