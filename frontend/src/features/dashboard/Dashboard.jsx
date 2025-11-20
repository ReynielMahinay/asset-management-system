import React from "react";
import Card from "../../components/common/Card";
import { dashboardData } from "../../model/SampleData";
import BarChartAssets from "../../components/common/BarChartAssets";
import { useAssets } from "../../hooks/useAssets";
import PieChartAssets from "../../components/common/PieChartAssets";
import AreaChartAssets from "../../components/common/AreaChartAssets";

function Dashboard() {
  const { data, isLoading, error } = useAssets();
  const recentlyAdded = data?.recentlyAddedCount || 0;
  const assetTotal = data?.total || 0;
  const assignedAsset = data?.assignedCount || 0;
  const notAssignedAsset = data?.notAssignedCount || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          number={
            item.key === "assets"
              ? assetTotal
              : item.key == "assigned"
              ? assignedAsset
              : item.key == "unassigned"
              ? notAssignedAsset
              : item.key == "recently"
              ? recentlyAdded
              : item.number
          }
          Icon={item.icon}
          text_color={item.text_color}
        />
      ))}

      <div className="flex flex-col gap-5 bg-white col-span-full shadow-md rounded-md h-full w-full p-4 overflow-hidden py-5">
        <div className="border-gray-300 border-2 rounded-lg p-5 h-full w-full">
          <BarChartAssets
            recentlyAdded={recentlyAdded}
            assetTotal={assetTotal}
            assignedAsset={assignedAsset}
            notAssignedAsset={notAssignedAsset}
          />
        </div>

        <div className="flex flex-1 flex-row justify-center items-center gap-5 h-full w-full">
          <PieChartAssets />
          <AreaChartAssets />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
