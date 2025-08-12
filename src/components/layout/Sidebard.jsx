import React, { useState } from "react";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiDashboardFill } from "react-icons/ri";
import { RiAlignItemLeftLine } from "react-icons/ri";

import { RiAlignItemLeftFill } from "react-icons/ri";

function Sidebard({ isActivePage, setActivePage, isActive }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItem = [
    {
      id: "dashboard",
      icon: LuLayoutDashboard,
      active_icon: RiDashboardFill,
      label: "Dashboard",
    },
    {
      id: "asset",
      icon: RiAlignItemLeftLine,
      active_icon: RiAlignItemLeftFill,
      label: "Asset",
    },
  ];

  return (
    <div
      className={`bg-white text-midnight shadow-md h-screen p-4 transition-all duration-300 eass-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div
        className={`flex justify-between items-center font-poppins font-bold text-2xl gap-2 ${
          isCollapsed ? "hidden" : "block"
        }`}
      >
        <h1>AssetFLow</h1>
        <button onClick={toggleSideBar} className="cursor-pointer group">
          <TbLayoutSidebarLeftCollapse
            size={24}
            className="group-hover:hidden"
          />
          <TbLayoutSidebarLeftCollapseFilled
            size={24}
            className="hidden group-hover:block"
          />
        </button>
      </div>

      <div
        className={`flex justify-center items-center pt-1  ${
          isCollapsed ? "block" : "hidden"
        }`}
      >
        <button onClick={toggleSideBar} className="cursor-pointer group ">
          <TbLayoutSidebarLeftExpand size={24} className="group-hover:hidden" />
          <TbLayoutSidebarLeftExpandFilled
            size={24}
            className="hidden group-hover:block"
          />
        </button>
      </div>

      <div
        className={`flex flex-col  gap-3 p-5 ${
          isCollapsed ? "justify-center items-center" : " "
        }`}
      >
        {menuItem.map((item) => {
          const isActive = isActivePage === item.id;
          const Icon = isActive ? item.active_icon : item.icon;

          return (
            <button
              className="flex justify-start items-center gap-2 cursor-pointer"
              onClick={() => setActivePage(item.id)}
              key={item.id}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span
                className={`transition-opacity duration-300 font-dm-sans text-small font-medium ${
                  isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebard;
