import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAssets } from "../../hooks/useAssets";

const BarChartAssets = () => {
  const { data, isLoading, error } = useAssets();
  const totalAssets = data?.total || 0;
  const assetData = [
    { name: "Total Asset", assets: totalAssets },
    { name: "Recently Added", assets: 3 },
    { name: "Assigned Asset", assets: 4 },
    { name: "Unassigned Asset", assets: 5 },
  ];

  return (
    <div style={{ width: "100%", height: "350px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={assetData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="assets" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartAssets;
