import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = ["var(--color-midnight)", "#3B82F6"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle || 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle || 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent || 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartAssets({
  notAssignedAsset,
  assignedAsset,
  isAnimationActive = true,
}) {
  const data = [
    { name: "Unassigned Asset", value: notAssignedAsset },
    { name: "Assigned Asset", value: assignedAsset },
  ];
  return (
    <ResponsiveContainer width="100%" height={350} debounce={300}>
      <PieChart>
        <Legend verticalAlign="bottom" height={36} />
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={isAnimationActive}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
