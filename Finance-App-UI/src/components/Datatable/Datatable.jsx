import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Datagrid from "../Datagrid/Datagrid";
import "./Datatable.scss";

class Datatable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      addedRow: [],
      afterHours: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/v1/assets")
      .then((response) => response.data)
      .then((data) => {
        let initialSum = data.reduce((accumulator, currentValue) => {
          return (
            accumulator +
            currentValue.shares * parseFloat(currentValue.initialPrice)
          );
        }, 0);

        console.log(initialSum);

        let updatedSum = data.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.shares * currentValue.updatedPrice;
        }, 0);

        let change = ((updatedSum - initialSum) / initialSum) * 100;

        this.setState({
          stocks: data.concat([
            {
              id: 14,
              label: "Totals",
              updatedPrice: initialSum,
              allTimeChange: change,
              stockShares: 99,
              status: updatedSum,
              changeAmount: updatedSum - initialSum,
            },
          ]),
        });
      });
    const date = new Date();
    var offset = -300; //Timezone offset for EST in minutes.
    var estDate = date.getHours();
    if (estDate > 14) {
      this.setState({
        afterHours: true,
      });
    }
  }

  render() {
    return (
      <div className="datatable">
        <div className="datatableTitle">
          Stocks
          <Link to="/stocks/new" className="link">
            Add New
          </Link>
        </div>
        <Datagrid />
      </div>
    );
  }
}

export default Datatable;
