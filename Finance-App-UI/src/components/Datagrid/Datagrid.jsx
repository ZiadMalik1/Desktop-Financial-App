import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns } from "../../datatableSource";
import Service from "../../service/useAPI/Service";
import useSocket from "../../service/WebsocketService/useSocket";
import { Footer } from "../Footer/Footer";
import "./Datagrid.scss";

const service = new Service();

const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    align: "center",
    headerAlign: "center",
    width: 185,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to="/stocks/test" style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton">Delete</div>
        </div>
      );
    },
  },
];

const Datagrid = () => {
  const [apiData, setApiData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [yahooData] = useSocket(labelData);
  const [rows, setRows] = useState(yahooData);

  useEffect(() => {
    handleData();
    console.log("Hds");
  }, []);

  useEffect(() => {
    handleRows();
  }, [yahooData]);

  const handleRows = () => {
    console.log("HEsssuyddghghdssdsdsddsdsdsd");
    if (yahooData.length !== 0) {
      const newRows = yahooData.map(getRowData);
      setRows(newRows);
    } else {
      setTimeout(handleRows, 1000);
    }
  };

  function getRowData(row) {
    const stockData = apiData.find((object) => {
      return object.label === row.Label;
    });

    const initialPrice = stockData.initialPrice;
    const shares = stockData.shares;
    const totalChange = ((row.Value - initialPrice) / initialPrice) * 100;

    return {
      stockLabel: row.Label,
      initialPrice: initialPrice,
      stockPrice: row.Value,
      stockChange: row.Change,
      totalChange: Math.round(totalChange * 100) / 100,
      shares: shares,
      total: Math.round(row.Value * shares * 100) / 100,
      status: row.Status,
      net: row.Net,
    };
  }

  const handleData = () => {
    service.get("").then((res) => {
      setApiData(res);
      setLabelData(res.map((element) => element.label));
    });
  };

  return (
    <div style={{ height: 940, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        getRowId={(row) => row.stockLabel}
        pageSize={14}
        components={{
          Footer: Footer,
        }}
        componentsProps={{
          footer: { yahooData, apiData },
        }}
      />
    </div>
  );
};

export default Datagrid;
