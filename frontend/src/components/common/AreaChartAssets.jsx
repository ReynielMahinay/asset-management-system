import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// #region Sample data

// #endregion
const AreaChartAssets = ({ assignedPerMonth, unassignedPerMonth }) => {
  const data = [
    {
      name: "January",
      Assigned: 4000,
      Unassigned: 2400,
    },
    {
      name: "February",
      Assigned: 3000,
      Unassigned: 1398,
    },
    {
      name: "March",
      Assigned: 2000,
      Unassigned: 9800,
    },
    {
      name: "April",
      Assigned: 2780,
      Unassigned: 3908,
    },
    {
      name: "May",
      Assigned: 1890,
      Unassigned: 4800,
    },
    {
      name: "June",
      Assigned: 2390,
      Unassigned: 3800,
    },
    {
      name: "July",
      Assigned: 3490,
      Unassigned: 4300,
    },
    {
      name: "August",
      Assigned: 3590,
      Unassigned: 4300,
    },
    {
      name: "September",
      Assigned: 3490,
      Unassigned: 4300,
    },
    {
      name: "October",
      Assigned: 3490,
      Unassigned: 4300,
    },
    {
      name: "November",
      Assigned: 3490,
      Unassigned: 4300,
    },
    {
      name: "December",
      Assigned: 3490,
      Unassigned: 4300,
    },
  ];

  return (
    <div
      style={{ width: "100%", height: "350px" }}
      className="border-gray-300 border-2 rounded-lg p-5"
    >
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width="auto" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Assigned"
            stackId="1"
            stroke="#3B82F6"
            fill="#3B82F6"
          />
          <Area
            type="monotone"
            dataKey="Unassigned"
            stackId="1"
            stroke="var(--color-midnight)"
            fill="var(--color-midnight)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartAssets;
