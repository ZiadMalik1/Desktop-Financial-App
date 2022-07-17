import { AiOutlineApple } from 'react-icons/ai'
import { SiNvidia } from 'react-icons/si'
import { FaMicrosoft } from 'react-icons/fa'

export const stockColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 230, renderCell: (params) => 
        {
            return(
                <div className="cellWithImg">
                    {params.row.img}
                    {params.row.name}
                </div>
            )
        } 
    },
    { field:"value", headerName: "Current Price", width: 150 },
    { field:"pattern", headerName: "Candle Pattern", width: 150 },
    { field:"shares", headerName: "Share Amount", width: 150 },
    { field:"status", headerName: "Current Status", width: 150, renderCell: (params) => 
        {
            return(
                <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
            )
        } 
    }

]

export const stockRows = [
    {
        id: 1,
        name: "AAPL",
        img: <AiOutlineApple className="cellImg"/>,
        status: "Bleeding",
        shares: 35
    },
    {
        id: 2,
        name: "NVDA",
        img: <SiNvidia className="cellImg"/>,
        status: "Profitable",
        shares: 354 
    },
    {
        id: 3,
        name: "MSFT",
        img: <FaMicrosoft className="cellImg"/>,
        status: "Bleeding",
        shares: 12
    }
]