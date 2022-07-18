import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React from 'react'
import './Chart.scss'



class Chart extends React.Component {


  render(){
    
    const data = this.props.stocks.map( stock => {return {name: stock.label, value: stock.updatedPrice}});

    return (
      <div className="chart">
          <div className="chartTitle">{this.props.title}</div>
          <ResponsiveContainer width="100%" aspect={this.props.aspect}>
          <AreaChart width={730} height={250} data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                  <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="gray" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default Chart