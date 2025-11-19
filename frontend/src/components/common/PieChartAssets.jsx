import { PieChart, Pie, Sector, Tooltip, ResponsiveContainer } from "recharts";
import { useAssets } from "../../hooks/useAssets";
import { use } from "react";

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;

  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;

  const ex = mx + (cos >= 0 ? 22 : -22);
  const ey = my;

  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />

      <circle cx={ex} cy={ey} r={2} fill={fill} />

      <text x={ex + (cos >= 0 ? 12 : -12)} y={ey} textAnchor={textAnchor}>
        Asset {value}
      </text>

      <text
        x={ex + (cos >= 0 ? 12 : -12)}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        Rate {(percent * 100).toFixed(2)}%
      </text>
    </g>
  );
};

export default function PieChartAssets() {
  const { data, isLoading, error } = useAssets();

  const assignedAsset = data?.assignedCount || 0;
  const notAssignedAsset = data?.notAssignedCount || 0;

  const assetData = [
    { name: "Assigned", value: assignedAsset },
    { name: "Not Assigned", value: notAssignedAsset },
  ];
  return (
    <div
      style={{ width: "100%", height: 350 }}
      className="border-gray-300 border-2 p-5 rounded-lg"
    >
      <ResponsiveContainer>
        <PieChart
          margin={{
            top: 50,
            right: 120,
            bottom: 0,
            left: 120,
          }}
        >
          <Pie
            activeShape={renderActiveShape}
            data={assetData}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            fill="#3B82F6"
            dataKey="value"
            isAnimationActive={true}
          />
          <Tooltip content={() => null} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
