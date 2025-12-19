import React from "react";
import Card from "../../components/common/Card";
import { dashboardData } from "../../model/SampleData";
import { useAssets } from "../../hooks/useAssets";
import BarChartAssets from "../../components/charts/BarChartAssets";
import PieChartAssets from "../../components/charts/PieChartAssets";
import AreaChartAssets from "../../components/charts/AreaChartAssets";

function Dashboard() {
  const { data, isLoading, error } = useAssets({
    unassigned: true,
  });
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
              : item.key === "assigned"
              ? assignedAsset
              : item.key === "unassigned"
              ? notAssignedAsset
              : item.key === "recently"
              ? recentlyAdded
              : item.number
          }
          Icon={item.icon}
          subtitle={item.subtitle}
        />
      ))}

      <div className="flex flex-col gap-5 border border-zinc-300  bg-white col-span-full shadow-md rounded-xl w-full p-4 py-5">
        {/* Bar Chart Container - Fixed height */}
        <div className="rounded-lg p-5 w-full h-[400px]">
          <BarChartAssets
            recentlyAdded={recentlyAdded}
            assetTotal={assetTotal}
            assignedAsset={assignedAsset}
            notAssignedAsset={notAssignedAsset}
          />
        </div>

        {/* Pie and Area Charts Container - Fixed height, equal width for both charts */}
        <div className="flex flex-row justify-center items-center gap-5 w-full h-[400px]">
          <div className="w-1/2 h-full">
            <PieChartAssets
              assignedAsset={assignedAsset}
              notAssignedAsset={notAssignedAsset}
            />
          </div>
          <div className="w-1/2 h-full">
            <AreaChartAssets />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
