import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

let dollarUSLocale = Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD"
});

const getNet = ( netGain ) => {
    if(netGain > 0){
        console.log(`+${dollarUSLocale.format(netGain)}`)
        return `+${dollarUSLocale.format(netGain)}`
    } else{
        return dollarUSLocale.format(netGain)
    }
}

export const stockColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'label', headerName: 'Name', width: 100 },
    { field:"updatedPrice", headerName: "Current Price", width: 150, renderCell: (params) => 
        {
            return(
                <div>
                    {dollarUSLocale.format(params.row.updatedPrice)}
                </div>
            )
        }
    },
    { field: "change", headerName: "Change From Initial", width: 180, renderCell: (params) => 
        {   
            let status = (params.row.allTimeChange > 0) ? "Profitable" : "Bleeding";
            let icon = (status === "Profitable") ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
            return(
                <div className={`priceWithStatus ${status}`}>
                    {Math.round(params.row.allTimeChange * 100) / 100}%
                    {icon}
                </div>
            )
        }
    },
    { field:"stockShares", headerName: "Share Amount", width: 150, renderCell: (params) => 
        {
            return(
                <div>
                    {Math.round(params.row.shares * 100) / 100}
                </div>
            )
        }
    },
    { field:"status", headerName: "Current Status", width: 150, renderCell: (params) => 
        {      
            let totalValue = params.row.shares * params.row.updatedPrice;
            if(params.row.id === 14){
                return(
                    <div>{dollarUSLocale.format(params.row.status)}</div>
                )
            }
            return(
                <div>{dollarUSLocale.format(totalValue)}</div>
            )
        } 
    },
    { field:"changeAmount", headerName: "Net Gain/Loss", width: 150, renderCell: (params) => 
        {   
            let netGain = (params.row.shares * params.row.updatedPrice) - (params.row.shares * params.row.initialPrice)
            let status = (params.row.allTimeChange > 0) ? "Profitable" : "Bleeding";
            if(params.row.id === 14){
                return(
                    <div className={`cellWithStatus ${status}`}>
                        {dollarUSLocale.format(params.row.status - params.row.updatedPrice)}
                    </div>
                )
            }
            return(
                <div className={`cellWithStatus ${status}`}>
                    {getNet(netGain)}
                </div>
            )
        }
    }
]