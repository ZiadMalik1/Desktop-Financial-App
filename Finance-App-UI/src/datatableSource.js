import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

let dollarUSLocale = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const columns = [
  {
    field: "stockLabel",
    headerName: "Name",
    width: 100,
    align: "left",
    editable: true,
  },
  {
    field: "initialPrice",
    headerName: "Initial",
    width: 100,
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
    width: 70,
    align: "center",
    editable: true,
    renderCell: (params) => {
      let status = params.row.stockChange > 0 ? "Profitable" : "Bleeding";
      let icon =
        status === "Profitable" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      return (
        <div className="price">
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
    align: "center",
    width: 100,
    editable: true,
    renderCell: (params) => {
      let status = params.row.stockChange > 0 ? "Profitable" : "Bleeding";
      let icon =
        status === "Profitable" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      return (
        <div className="price">
          {params.row.stockChange}%{icon}
        </div>
      );
    },
  },
  {
    field: "totalChange",
    headerName: "Change",
    align: "center",
    width: 100,
    renderCell: (params) => {
      let status = params.row.totalChange > 0 ? "Profitable" : "Bleeding";
      let icon =
        status === "Profitable" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      return (
        <div className="price">
          {params.row.totalChange}%{icon}
        </div>
      );
    },
  },
  {
    field: "total",
    headerName: "Net",
    align: "center",
    width: 200,
    renderCell: (params) => {
      let status = params.row.totalChange > 0 ? "Profitable" : "Bleeding";
      let icon =
        status === "Profitable" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      return (
        <div className="net">
          <div className="netTotal">
            {dollarUSLocale.format(params.row.total)}
          </div>
          <div className="netChange">
            <div className="details">
              {dollarUSLocale.format(
                (params.row.stockPrice - params.row.initialPrice) *
                  params.row.shares
              )}
              {icon}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    field: "shares",
    headerName: "Shares",
    align: "right",
    width: 100,
    renderCell: (params) => {
      return <div className="price">{params.row.shares}</div>;
    },
  },
];
