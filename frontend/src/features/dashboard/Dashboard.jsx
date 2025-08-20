import React from "react";
import Card from "../../components/common/Card";
import Chart from "../../components/common/Chart";
import { dashboardData } from "../../model/SampleData";

function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          number={item.number}
          Icon={item.icon}
        />
      ))}

      <div className="bg-white col-span-full shadow-md rounded-md h-90 p-4 overflow-hidden">
        <Chart />
      </div>
    </div>
  );
}

export default Dashboard;
