import React from 'react'
import Featured from '../../components/Featured/Featured';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import Chart from '../../components/Chart/Chart'
import Widget from '../../components/Widgets/Widget';
import './Home.scss'
import axios from 'axios';
import Table from '../../components/List/List';

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      stocks: []
    };
  }
  
  componentDidMount(){
    axios.get("http://localhost:8080/api/v1/assets")
    .then(response => response.data)
    .then((data) => {
      this.setState({stocks: data})
    })
  }

  render(){
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
                <Chart stocks = {this.state.stocks} aspect={2 / 1} title="Asset History over Year"/>
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
}

export default Home