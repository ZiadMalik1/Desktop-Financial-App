import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

let dollarUSLocale = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const columns = [
  {
    field: "Label",
    headerName: "Name",
    width: 125,
    align: "center",
    headerAlign: "center",
    editable: true,
  },
  {
    field: "initialPrice",
    headerName: "Initial",
    align: "center",
    headerAlign: "center",
    width: 112,
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
    width: 112,
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
    align: "center",
    headerAlign: "center",
    width: 125,
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
    align: "center",
    headerAlign: "center",
    width: 125,
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
    headerName: "Net",
    align: "center",
    headerAlign: "center",
    width: 250,
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
    align: "center",
    headerAlign: "center",
    width: 150,
    renderCell: (params) => {
      return <div className="price">{params.row.shares}</div>;
    },
  },
];
