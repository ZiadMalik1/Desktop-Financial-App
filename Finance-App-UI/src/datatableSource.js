import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import clsx from "clsx";

let dollarUSLocale = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const columns = [
  {
    field: "Label",
    headerName: "Name",
    flex: 1,
    align: "center",
    headerAlign: "center",
    editable: true,
  },
  {
    field: "initialPrice",
    headerName: "Initial",
    flex: 1,
    align: "center",
    headerAlign: "center",
    editable: true,
    renderCell: (params) => {
      return (
        <div className="price">
          {dollarUSLocale.format(params.row.initialPrice)}
        </div>
      );
    },
  },
  {
    field: "stockPrice",
    headerName: "Price",
    flex: 1,
    align: "center",
    headerAlign: "center",
    editable: true,
    renderCell: (params) => {
      let status = params.row.status;
      let icon = status === "up" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      return (
        <div className={`price ${status}`}>
          {dollarUSLocale.format(params.row.stockPrice)}
          {icon}
        </div>
      );
    },
  },
  {
    field: "stockChange",
    headerName: "Day Change",
    type: "number",
    flex: 1,
    align: "center",
    headerAlign: "center",
    editable: true,
    renderCell: (params) => {
      let status = params.row.stockChange > 0 ? "up" : "down";
      let icon = status === "up" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      return (
        <div className={`price ${status}`}>
          {Math.round(params.row.stockChange * 100) / 100}%{icon}
        </div>
      );
    },
  },
  {
    field: "totalChange",
    headerName: "Change",
    flex: 1,
    align: "center",
    headerAlign: "center",
    cellClassName: (params) => {
      if (params.row.totalChange == null) {
        return "";
      }

      return clsx("super-app", {
        negative: params.row.totalChange < 0,
        positive: params.row.totalChange > 0,
      });
    },
    renderCell: (params) => {
      let status = params.row.totalChange > 0 ? "up" : "down";
      let icon = status === "up" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      return (
        <div className={`price ${status}`}>
          {params.row.totalChange}%{icon}
        </div>
      );
    },
  },
  {
    field: "total",
    headerName: "Net (Total, Daily)",
    flex: 2,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      let status = params.row.totalChange > 0 ? "up" : "down";
      let dayStatus = params.row.net > 0 ? "up" : "down";

      let icon = status === "up" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      let dayIcon =
        dayStatus === "up" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;

      return (
        <div className="net">
          <div className="netTotal">
            {dollarUSLocale.format(params.row.total)}
          </div>
          <div className={`netChange ${status}`}>
            <div className="details">
              {dollarUSLocale.format(
                (params.row.stockPrice - params.row.initialPrice) *
                  params.row.shares
              )}
              {icon}
            </div>
          </div>
          <div className={`netChange ${dayStatus}`}>
            <div className="details">
              {dollarUSLocale.format(params.row.net * params.row.shares)}
              {dayIcon}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    field: "shares",
    headerName: "Shares",
    editable: true,
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div className="price">{params.row.shares}</div>;
    },
  },
  {
    field: "purchased",
    headerName: "Time (In Years)",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <div className="price">{params.row.purchased}</div>;
    },
  },
];
