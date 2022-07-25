import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AiOutlineApple } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa";
import { SiNvidia } from "react-icons/si";
import "./List.scss";

const List = () => {
  const rows = [
    {
      id: 398233,
      name: "AAPL",
      product: "Stock",
      img: <AiOutlineApple className="image" />,
      customer: "Ziad Malik",
      date: "2 March",
      shares: 23,
      method: "Liquid",
      status: "Profitable",
    },
    {
      id: 390493,
      name: "NVDA",
      product: "Stock",
      img: <SiNvidia className="image" />,
      customer: "Ziad Malik",
      date: "2 March",
      shares: 236,
      method: "Liquid",
      status: "Bleeding",
    },
    {
      id: 234049,
      name: "MSFT",
      product: "Stock",
      img: <FaMicrosoft className="image" />,
      date: "2 March",
      shares: 533,
      method: "Liquid",
      status: "Bleeding",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Shares</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {row.img}
                  {row.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.shares}</TableCell>
              <TableCell className="tableCell">{row.product}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
