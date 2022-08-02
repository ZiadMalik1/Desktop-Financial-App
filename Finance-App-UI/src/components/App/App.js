import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { assetInputs, stockInputs } from "../../formSource";
import Home from "../../pages/home/Home";
import List from "../../pages/list/List";
import Login from "../../pages/login/Login";
import New from "../../pages/new/New";
import Single from "../../pages/single/Single";
import useTestConnection from "../../service/Plaid-Link/useTestConnection";
import Service from "../../service/useAPI/Service";
import "../../style/dark.scss";
import PlaidLinkComponent from "../PlaidLink/PlaidLinkComponent";
import "./App.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [element, setElement] = useState();
  const [isConnected] = useTestConnection();
  const [state, setState] = useState();
  const [apiData, setApiData] = useState([]);
  const [labelData, setLabelData] = useState([]);

  const service = new Service();

  const handleData = () => {
    service.get("assets").then((res) => {
      setApiData(res);
      setLabelData(res.map((element) => element.label));
    });
  };

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    setHomePage();
  }, [state, apiData, labelData]);

  useEffect(() => {
    setState(isConnected);
  }, [isConnected]);

  function setHomePage() {
    if (state === true) {
      setElement(
        <div className={darkMode ? "app dark" : "app"}>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Home />}>
                  {" "}
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="stocks">
                  <Route
                    index
                    element={
                      <List path="stocks" data={apiData} labels={labelData} />
                    }
                  />
                  <Route path=":userId" element={<Single />} />
                  <Route
                    path="new"
                    element={<New inputs={stockInputs} title="Add New Stock" />}
                  />
                </Route>
                <Route path="assets">
                  <Route index element={<List path="assets"/>} />
                  <Route path=":prodId" element={<Single />} />
                  <Route
                    path="new"
                    element={<New inputs={assetInputs} title="Add New Asset" />}
                  />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      );
    } else if (state === false) {
      setElement(
        <div className="home-connect">
          <div className="header-connect">
            <h1>Please Connect your Bank Accounts</h1>
            <PlaidLinkComponent />
          </div>
        </div>
      );
    }
  }

  return [element];
}

export default App;
