import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import './Chart.scss'

const data = [
    { name: "January", Total: 1200 },
    { name: "Feburary", Total: 1342 },
    { name: "March", Total: 1234 },
    { name: "April", Total: 1533 },
    { name: "May", Total: 1653 },
    { name: "June", Total: 1652 },
    { name: "July", Total: 1345 },
    { name: "August", Total: 1743 },
    { name: "September", Total: 1500 },
    { name: "October", Total: 1982 },
    { name: "November", Total: 1468 },
    { name: "December", Total: 1928 },
  ];

const Chart = ({aspect, title}) => {
  return (
    <div className="chart">
        <div className="chartTitle">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
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
            <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart