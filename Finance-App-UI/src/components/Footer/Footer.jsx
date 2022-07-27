import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
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
      console.log(element.Label + "fddd " + element.Net);
      console.log(
        element.Net *
          props.apiData.find((item) => item.label === element.Label).shares
      );
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
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div className="footerElement">
          <h5>Initial Total: </h5>
          <div className="price">{dollarUSLocale.format(initialTotal)}</div>
        </div>
        <div className="footerElement">
          <h5>Current Total: </h5>
          <div className="price">{dollarUSLocale.format(currentTotal)}</div>
          <div className={`footerElementDetail ${status}`}>
            {dollarUSLocale.format(currentTotal - initialTotal)}
            {icon}
            <div className={`footerElementDetail ${dayStatus}`}>
              {dollarUSLocale.format(daysNet)}
              {dayIcon}
            </div>
          </div>
        </div>
      </Box>
    );
  }
}

export { Footer };
