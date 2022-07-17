import React from 'react'
import Featured from '../../components/Featured/Featured';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import Chart from '../../components/Chart/Chart'
import Widget from '../../components/Widgets/Widget';

import './Home.scss'
import Table from '../../components/List/List';

const Home = () => {
  return (
    <div>
        <div className ="home">
          <SideBar/>    
          <div className="homeContainer">
            <NavBar/>
            <div className="widgets">
              <Widget type="stock"/>
              <Widget type="crypto"/>
              <Widget type="property"/>
              <Widget type="balance"/>
            </div>
            <div className="charts">
              <Featured/>
              <Chart aspect={2 / 1} title="Asset History over Year"/>
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Transactions</div>
              <Table/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home