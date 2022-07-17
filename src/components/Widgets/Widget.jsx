import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import CurrencyBitcoinOutlinedIcon from '@mui/icons-material/CurrencyBitcoinOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import './Widget.scss'

const Widget = ({ type }) => {
  let data;  

  //Temporary Data
  const amount = 1000;
  const diff = 20;

  switch(type){
    case "stock":
        data = {
            title: "Stock",
            isMoney: true,
            link:"See all Users",
            icon: (
                <ShowChartIcon className="icon" style={{ 
                    color:"crimson", 
                    backgroundColor: "rgba(255, 0, 0, 0.2)" 
                }}/>
            )
        };
        break;
        
    case "crypto":
        data = {
            title: "Crypto",
            isMoney: true,
            link:"See all Cryptocurrency Holdings",
            icon: (
                <CurrencyBitcoinOutlinedIcon className="icon" style={{ 
                    color:"crimson", 
                    backgroundColor: "rgba(255, 0, 0, 0.2)" 
                }}/>
            )
        };
        break;

    case "property":
        data = {
            title: "Property",
            isMoney: true,
            link:"See all Properties",
            icon: (
                <HomeWorkOutlinedIcon className="icon" style={{ 
                    color:"crimson", 
                    backgroundColor: "rgba(255, 0, 0, 0.2)" 
                }}/>
            )
        };
        break;

    case "balance":
        data = {
            title: "Account Balance",
            isMoney: true,
            link:"See all Accounts",
            icon: (
                <AccountBalanceWalletOutlinedIcon className="icon" style={{ 
                    color:"crimson", 
                    backgroundColor: "rgba(255, 0, 0, 0.2)" 
                }}/>
            )
        };
        break;

    default:
        break;
  }   

  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney && "$"}{amount}</span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                <ArrowDropUpOutlinedIcon />
                {diff} %
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget