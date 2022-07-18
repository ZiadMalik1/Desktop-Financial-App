import './Datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import { stockColumns} from '../../datatableSource';
import React from 'react';
import axios from 'axios';



const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 185,
    renderCell: (params) =>
    {
      return(
        <div className="cellAction">
          <Link to="/stocks/test" style={{textDecoration: "none"}}>
          <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton">Delete</div>
        </div>
      )
    }
  }
]


class Datatable extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      stocks: [],
      addedRow: []
    };
  }

  componentDidMount(){
    axios.get("http://localhost:8080/api/v1/assets")
    .then(response => response.data)
    .then((data) => {
      
      let initialSum = data.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.shares * parseFloat(currentValue.initialPrice));
      }, 0)

      console.log(initialSum)

      let updatedSum = data.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.shares * currentValue.updatedPrice);
      }, 0)

      let change = ((updatedSum - initialSum) / initialSum) * 100;
      
      this.setState({stocks: data.concat(
        [
          {
            id: 14,
            label: 'Totals',
            updatedPrice: initialSum,
            allTimeChange: change,
            stockShares: 99,
            status: updatedSum,
            changeAmount: updatedSum - initialSum
          }
        ]
      )})
    })
  }

  render(){
    return (
      <div className="datatable">
        <div className="datatableTitle">
          Stocks
          <Link to="/stocks/new" className="link">
            Add New
          </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={this.state.stocks}
          columns={stockColumns.concat(actionColumn)}
          pageSize={[14]}
          rowsPerPageOptions={[7]}
          checkboxSelection
          />
      </div>
    )
  }
}

export default Datatable


