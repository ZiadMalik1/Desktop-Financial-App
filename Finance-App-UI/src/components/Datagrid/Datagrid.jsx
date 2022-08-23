import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { columns } from "../../datatableSource";
import useSocket from "../../service/WebsocketService/useSocket";
import { Footer } from "../Footer/Footer";
import Actions from "./Actions";
import "./Datagrid.scss";

const Datagrid = ({ data, labels, setModal, setId }) => {
  const [apiData, setApiData] = useState(data);
  const [yahooData] = useSocket(labels);
  const [rows, setRows] = useState(yahooData);
  const [rowId, setRowId] = useState(null);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Actions {...{ params, rowId, setRowId, setModal, setId, apiData }} />
        );
      },
    },
  ];

  const handleCommit = (e) => {
    setRowId(e.id);
    const newRows = rows.map((row) => {
      if (row.Label == e.id) {
        return { ...row, [e.field]: e.value };
      } else {
        return { ...row };
      }
    });
    setRows(newRows);
  };

  const handleDeleteClick = (id) => () => {
    setModal((prev) => !prev);
    setId(apiData.filter((row) => row.label === id)[0].id);
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
    const purchased = stockData.purchased;
    const shares = stockData.shares;
    const totalChange = ((row.Value - initialPrice) / initialPrice) * 100;

    if (rowId === row.Label) {
      const old = rows.find((oldRow) => {
        if (oldRow.Label === rowId) {
          return oldRow;
        }
      });
      return old;
    } else {
      return {
        Label: row.Label,
        initialPrice: initialPrice,
        stockPrice: row.Value,
        stockChange: row.Change,
        totalChange: Math.round(totalChange * 100) / 100,
        shares: shares,
        total: Math.round(row.Value * shares * 100) / 100,
        purchased: getNumberOfDays(purchased),
        status: row.Status,
        net: row.Net,
      };
    }
  }

  function getNumberOfDays(start) {
    const date1 = new Date(start);
    const today = new Date();
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = today - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return Math.round((diffInDays / 365) * 100) / 100;
  }

  return (
    <DataGrid
      sx={{
        px: 1 / 2,
        height: rows.length * 62,
        "& .super-app-theme--cell": {
          backgroundColor: "#00c532;",
          fontWeight: "600",
        },
        "& .super-app.negative": {
          fontWeight: "600",
        },
        "& .super-app.positive": {
          fontWeight: "600",
        },
      }}
      rows={rows}
      onCellEditCommit={handleCommit}
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
  );
};

Datagrid.defaultProps = {
  data: [],
  labels: [],
};

export default Datagrid;
