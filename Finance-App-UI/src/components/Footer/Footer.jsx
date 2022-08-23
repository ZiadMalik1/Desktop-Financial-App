import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Box from "@mui/material/Box";
import * as React from "react";
import "./Footer.scss";

let dollarUSLocale = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Footer(props) {
  if (props.apiData.length !== 0 && props.yahooData.length !== 0) {
    const initialTotal = props.apiData.reduce((accumulator, element) => {
      return accumulator + element.initialPrice * element.shares;
    }, 0);

    const currentTotal = props.yahooData.reduce((accumulator, element) => {
      return (
        accumulator +
        element.Value *
          props.apiData.find((item) => item.label === element.Label).shares
      );
    }, 0);

    const daysNet = props.yahooData.reduce((accumulator, element) => {
      return (
        accumulator +
        element.Net *
          props.apiData.find((item) => item.label === element.Label).shares
      );
    }, 0);

    let status = currentTotal - initialTotal > 0 ? "up" : "down";
    let dayStatus = daysNet > 0 ? "up" : "down";

    let icon = status === "up" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
    let dayIcon =
      dayStatus === "up" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;

    return (
      <>
        <Box sx={{ p: 1 }}>
          <div className="todayStatus">
            <FiberManualRecordIcon
              fontSize="small"
              sx={{
                mr: 1,
                color: dayStatus === "up" ? "#4caf50" : "#d9182e",
              }}
            />
            <div className="todayDetails">
              Today's {daysNet > 0 ? `Profit` : `Loss`}
              <div className={`footerElementDetail ${dayStatus}`}>
                {dollarUSLocale.format(daysNet)}
                {dayIcon}
              </div>
            </div>
          </div>
          <div className="alltimeStatus">
            <FiberManualRecordIcon
              fontSize="small"
              sx={{
                mr: 1,
                color:
                  dollarUSLocale.format(currentTotal) >
                  dollarUSLocale.format(initialTotal)
                    ? "#4caf50"
                    : "#d9182e",
              }}
            />
            <div className="alltimeDetails">
              Alltime's{" "}
              {dollarUSLocale.format(currentTotal) >
              dollarUSLocale.format(initialTotal)
                ? `Profit`
                : `Loss`}
              <div className={`footerElementDetail ${status}`}>
                {(((currentTotal - initialTotal) * 100) / initialTotal).toFixed(
                  2
                )}
                %{icon}
                {"     "}
                {dollarUSLocale.format(currentTotal - initialTotal)}
              </div>
            </div>
          </div>
          <div className="total">
            <FiberManualRecordIcon
              fontSize="small"
              sx={{
                mr: 1,
                color:
                  dollarUSLocale.format(currentTotal) >
                  dollarUSLocale.format(initialTotal)
                    ? "#4caf50"
                    : "#d9182e",
              }}
            />
            <div className="totalDetails">
              Total{" "}
              <div className={`footerElementDetail ${status}`}>
                {dollarUSLocale.format(currentTotal)}
              </div>
            </div>
          </div>
        </Box>
      </>
    );
  }
}

export { Footer };
