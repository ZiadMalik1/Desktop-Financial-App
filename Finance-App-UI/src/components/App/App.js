import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { assetInputs, stockInputs } from "../../formSource";
import Home from "../../pages/home/Home";
import List from "../../pages/list/List";
import Login from "../../pages/login/Login";
import New from "../../pages/new/New";
import Single from "../../pages/single/Single";
import "../../style/dark.scss";
import "./App.css";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}>
              {" "}
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="stocks">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={stockInputs} title="Add New Stock" />}
              />
            </Route>
            <Route path="assets">
              <Route index element={<List />} />
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
}

export default App;