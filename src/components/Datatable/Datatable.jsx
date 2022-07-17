import './Datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import { stockColumns, stockRows } from '../../datatableSource';
import { useState } from 'react';


const Datatable = () => {
  const [data, setData] = useState(stockRows);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 225,
      renderCell: (params) =>
      {
        return(
          <div className="cellAction">
            <Link to="/stocks/test" style={{textDecoration: "none"}}>
            <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
          </div>
        )
      }
    }
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Stock
        <Link to="/stocks/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={stockRows}
        columns={stockColumns.concat(actionColumn)}
        pageSize={[9]}
        rowsPerPageOptions={[5]}
        checkboxSelection
        />
    </div>
  )
}

export default Datatable