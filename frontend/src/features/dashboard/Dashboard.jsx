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

      <div className="flex flex-col gap-10 bg-white col-span-full shadow-md rounded-md h-[100%] p-4 overflow-hidden py-10">
        <BarChartAssets />
        <div className="flex flex-1 flex-row justify-center items-center ">
          <PieChartAssets />
          <AreaChartAssets />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
