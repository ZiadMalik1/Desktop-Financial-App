import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import CreditCardOffTwoToneIcon from '@mui/icons-material/CreditCardOffTwoTone';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import MonitorHeartTwoToneIcon from '@mui/icons-material/MonitorHeartTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { Link } from "react-router-dom"
import './SideBar.scss'

const SideBar = () => {

  const { dispatch } = useContext(DarkModeContext)  

  return (
    <div className='sidebar'>
        <div className='top'>
            <span className="logo">malikBandit</span>
        </div>
        <hr />
        <div className='center'>
            <ul>
                <p className="headers">MAIN</p>
                <Link to="/" style={{textDecoration: "none"}}>
                    <li>
                        <DashboardIcon className="icon"/>
                        <span>Dashboard</span>
                    </li>
                </Link>
                <p className="headers">LISTS</p>
                <Link to="/assets" style={{textDecoration: "none"}}>
                <li>
                    <AccountBalanceWalletTwoToneIcon className="icon"/>
                    <span>Assets</span>
                </li>
                </Link>
                <Link to="/stocks" style={{textDecoration: "none"}}>
                    <li>
                        <ShowChartIcon className="icon"/>
                        <span>Stocks</span>
                    </li>
                </Link>
                <li>
                    <CreditCardOffTwoToneIcon className="icon"/>
                    <span>Debts</span>
                </li>
                <p className="headers">USEFUL</p>
                <li>
                    <NotificationsNoneTwoToneIcon className="icon"/>
                    <span>Notifications</span>
                </li>
                <p className="headers">SERVICE</p>
                <li>
                    <MonitorHeartTwoToneIcon className="icon"/>
                    <span>System Health</span>
                </li>
                <li>
                    <BookTwoToneIcon className="icon"/>
                    <span>Logs</span>
                </li>
                <li>
                    <SettingsTwoToneIcon className="icon"/>
                    <span>Settings</span>
                </li>
                <p className="headers">USER</p>
                <li>
                    <AccountCircleTwoToneIcon className="icon"/>
                    <span>Profile</span>
                </li>
                <li>
                    <LogoutTwoToneIcon className="icon"/>
                    <span>Logout</span>
                </li>
            </ul>
        </div>
        <div className='bottom'>
            <div className="colorOption" onClick={() => dispatch({type:"LIGHT"})}></div>
            <div className="colorOption" onClick={() => dispatch({type:"DARK"})}></div>
        </div>
    </div>
  )
}

export default SideBar