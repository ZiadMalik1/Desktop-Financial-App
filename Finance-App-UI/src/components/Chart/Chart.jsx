import { add, differenceInCalendarDays, format } from "date-fns";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Chart.scss";
import CustomTooltip from "./CustomTooltip";

const Chart = (props) => {
  const dateFormatter = (date) => {
    return format(new Date(date), "dd/MMM");
  };

  const getTicks = (startDate, endDate, num) => {
    const diffDays = differenceInCalendarDays(endDate, startDate);

    let current = startDate,
      velocity = Math.round(diffDays / (num - 1));

    const ticks = [startDate.getTime()];

    for (let i = 1; i < num - 1; i++) {
      ticks.push(add(current, { days: i * velocity }).getTime());
    }

    ticks.push(endDate.getTime());
    return ticks;
  };

  /**
   * Add data of the date in ticks,
   * if there is no data in that date in `data`.
   *
   * @param Array<number> _ticks
   * @param {*} data
   */
  const fillTicksData = (_ticks, data) => {
    const ticks = [..._ticks];
    const filled = [];
    let currentTick = ticks.shift();
    let lastData = null;
    for (const it of data) {
      if (ticks.length && it.date > currentTick && lastData) {
        filled.push({ ...lastData, ...{ date: currentTick } });
        currentTick = ticks.shift();
      } else if (ticks.length && it.date === currentTick) {
        currentTick = ticks.shift();
      }

      filled.push(it);
      lastData = it;
    }

    return filled;
  };

  const startDate = new Date(2022, 0, 2);
  const endDate = new Date(2023, 11, 31);
  let dataSorted = props.stocks.sort((a, b) => (a.id > b.id ? 1 : -1));
  const data = props.stocks.map((total) => ({
    date: new Date(total.date),
    val: total.amount,
  }));

  const domain = [(dataMin) => dataMin, () => endDate.getTime()];
  const ticks = getTicks(startDate, endDate, 5);
  const filledData = fillTicksData(ticks, data);

  return (
    <div className="chart">
      <div className="chartTitle">{props.title}</div>
      <ResponsiveContainer width="100%" aspect={props.aspect}>
        <AreaChart
          width={730}
          height={250}
          data={filledData}
          margin={{
            top: 10,
            right: 30,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            dataKey="date"
            hasTick
            scale="time"
            tickFormatter={dateFormatter}
            type="number"
            domain={domain}
            ticks={ticks}
          />
          <YAxis tickCount={7} hasTick />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Area
            type="monotone"
            dataKey="val"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
