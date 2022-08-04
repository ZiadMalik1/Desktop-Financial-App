import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns } from "../../datatableSource";
import Service from "../../service/useAPI/Service";
import useSocket from "../../service/WebsocketService/useSocket";
import { Footer } from "../Footer/Footer";
import "./Datagrid.scss";

const Datagrid = ({ data, labels, setModal }) => {
  const [apiData, setApiData] = useState(data);
  const [yahooData] = useSocket(labels);
  const [rows, setRows] = useState(yahooData);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
            <button onClick={handleDeleteClick(params.id)}>
              <div className="deleteButton">Delete</div>
            </button>
          </div>
        );
      },
    },
  ];

  const handleDeleteClick = (id) => () => {
    setModal((prev) => !prev);
    const assetId = apiData.filter((row) => row.label === id)[0].id;
    service.delete("assets", assetId);
    setRows(rows.filter((row) => row.Label !== id));
  };

  useEffect(() => {
    setApiData(data);
  }, [data]);

  useEffect(() => {
    setRows(yahooData.map(getRowData));
  }, [yahooData]);

  function getRowData(row) {
    const stockData = apiData.find((object) => {
      return object.label === row.Label;
    });

    if (row.Value == 0) {
      row.Value = stockData.updatedPrice;
    }

    const initialPrice = stockData.initialPrice;
    const shares = stockData.shares;
    const totalChange = ((row.Value - initialPrice) / initialPrice) * 100;

    return {
      Label: row.Label,
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

  return (
    <div style={{ height: rows.length * 66, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        getRowId={(row) => row.Label}
        pageSize={rows.length}
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

Datagrid.defaultProps = {
  data: [],
  labels: [],
};

export default Datagrid;
