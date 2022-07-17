import Sidebar from '../../components/SideBar/SideBar'
import NavBar from '../../components/NavBar/NavBar'
import Chart from '../../components/Chart/Chart'
import List from '../../components/List/List'
import './Single.scss'

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <NavBar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="leftTitle">Information</h1>
            <div className="item">
              <a href="https://www.freepnglogos.com/pics/png-apple-logo" title="Image from freepnglogos.com"><img className="itemImg"src="https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png" alt="apple logo png dallas shootings don add are speech zones used" /></a>
              <div className="details">
                <h1 className="itemTitle">Apple</h1>
                <div className="detailItem">
                  <span className="itemKey">Price: </span>
                  <span className="itemValue">$432.00</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status: </span>
                  <span className="itemValue">Bleeding</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Shares: </span>
                  <span className="itemValue">23</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pattern: </span>
                  <span className="itemValue">Two Candles Up</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Apple's Year"/>
          </div>
        </div>
        <div className="bottom">
          <h1 className="leftTitle">Recent Activity</h1>
          <List />
        </div>
      </div>
    </div>
  )
}

export default Single