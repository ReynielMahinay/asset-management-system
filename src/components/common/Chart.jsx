import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { dashboardchartdata } from "../../model/SampleData";

const chartData = dashboardchartdata.map((item) => ({
  name: item.name,
  value: item.value,
}));

function Chart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#577a9c" fill="#d6e9fc" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Chart;
