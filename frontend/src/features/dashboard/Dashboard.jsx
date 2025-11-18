import React from "react";
import Card from "../../components/common/Card";
import { dashboardData } from "../../model/SampleData";
import BarChartAssets from "../../components/common/BarChartAssets";
import { useAssets } from "../../hooks/useAssets";
import PieChartAssets from "../../components/common/PieChartAssets";
import AreaChartAssets from "../../components/common/AreaChartAssets";

function Dashboard() {
  const { data, isLoading, error } = useAssets();
  const assetTotal = data?.total || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          number={item.key === "assets" ? assetTotal : item.number}
          Icon={item.icon}
          text_color={item.text_color}
        />
      ))}

      {/* Updated chart container - removed h-[100%] and overflow-hidden, added min-h-[400px] */}
      <div className="flex flex-col gap-5 bg-white col-span-full shadow-md rounded-md min-h-[400px] p-4 py-5">
        <div className="border-gray-300 border-2 rounded-lg p-5 ">
          <BarChartAssets />
        </div>

        <div className="flex flex-1 flex-row justify-center items-center gap-5">
          <PieChartAssets />
          <AreaChartAssets />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
