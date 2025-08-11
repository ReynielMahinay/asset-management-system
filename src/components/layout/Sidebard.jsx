import React, { useState } from "react";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiAlignItemLeftLine } from "react-icons/ri";

function Sidebard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItem = [
    { icon: LuLayoutDashboard, label: "Dashboard" },
    { icon: RiAlignItemLeftLine, label: "Asset" },
  ];
  return (
    <div
      className={`bg-white text-midnight shadow-md h-screen p-2 transition-all duration-300 eass-in-out ${
        isCollapsed ? "w-16" : "w-48"
      }`}
    >
      <div
        className={`flex justify-between items-center font-poppins font-bold text-2xl ${
          isCollapsed ? "hidden" : "block"
        }`}
      >
        <h1>AssetFLow</h1>
        <TbLayoutSidebarLeftCollapse onClick={toggleSideBar} size={24} />
      </div>

      <div
        className={`flex justify-center items-center  ${
          isCollapsed ? "block" : "hidden"
        }`}
      >
        <TbLayoutSidebarLeftExpand onClick={toggleSideBar} size={24} />
      </div>

      <div className={`flex flex-col gap-3 p-5`}>
        {menuItem.map((item, index) => {
          const Icon = item.icon;
          return (
            <a className="flex justify-start items-center gap-2">
              <Icon size={16} className="flex-shrink-0" />
              <span
                className={`transition-opacity duration-300 font-dm-sans text-small font-light ${
                  isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebard;
