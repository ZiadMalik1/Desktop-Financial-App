import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import './NavBar.scss' 

const NavBar = () => {
  const { dispatch } = useContext(DarkModeContext) 
  return (
    <div className="display-bar">
        <div className="wrapper">
            <div className="search">
                <input type="text" placeholder='Search...'/>
                <SearchTwoToneIcon/>
            </div>
            <div className="itemList">
                <div className="item">
                    <LanguageTwoToneIcon className="icon"/>
                    English
                </div>
                <div className="item">
                    <DarkModeTwoToneIcon onClick={() => dispatch({type:"TOGGLE"})} className="icon"/>
                </div>
                <div className="item">
                    <FullscreenExitOutlinedIcon className="icon"/>
                </div>
                <div className="item">
                    <NotificationsNoneOutlinedIcon className="icon"/>
                    <div className="counter">1</div>
                </div>
                <div className="item">
                    <ChatBubbleOutlineOutlinedIcon className="icon"/>
                    <div className="counter">2</div>
                </div>
                <div className="item">
                    <img className="avatar" alt="" src={require('../../resources/profile_pic.png')}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavBar