import React from "react";
import Card from "../../components/common/Card";
import { dashboardData } from "../../model/SampleData";
import BarChartAssets from "../../components/common/BarChartAssets";
import { useAssets } from "../../hooks/useAssets";

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

      <div className="bg-white col-span-full shadow-md rounded-md h-[100%] p-4 overflow-hidden">
        <p>Test</p>
        {/* <BarChartAssets /> */}
      </div>
    </div>
  );
}

export default Dashboard;
