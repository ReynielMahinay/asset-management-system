import React, { useState } from "react";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiDashboardFill } from "react-icons/ri";
import { RiAlignItemLeftLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { MdAssignmentInd } from "react-icons/md";

import { RiAlignItemLeftFill } from "react-icons/ri";

import { NavLink } from "react-router-dom";

function Sidebard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItem = [
    {
      id: "dashboard",
      path: "/dashboard",
      icon: LuLayoutDashboard,
      active_icon: RiDashboardFill,
      label: "Dashboard",
    },
    {
      id: "asset",
      path: "/asset",
      icon: RiAlignItemLeftLine,
      active_icon: RiAlignItemLeftFill,
      label: "Asset",
    },
    {
      id: "manage_user",
      path: "/manage-user",
      icon: FaRegUser,
      active_icon: FaUser,
      label: "Manage user",
    },
    {
      id: "assignment",
      path: "/assignment",
      icon: MdOutlineAssignmentInd,
      active_icon: MdAssignmentInd,
      label: "Assignment",
    },
  ];

  return (
    <div
      className={`bg-white text-midnight shadow-md min-h-screen flex flex-col transition-all duration-300 eass-in-out overflow-hidden overflow-y-auto ${
        isCollapsed ? "w-16 gap-5 " : "w-64 gap-5"
      }`}
    >
      <div
        className={`flex justify-between items-center font-poppins font-bold text-2xl gap-2 p-3 ${
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
        className={`flex justify-center items-center p-4 ${
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
        className={`flex flex-col   gap-1 ${
          isCollapsed ? "justify- items-center" : " "
        }`}
      >
        {menuItem.map((item) => {
          return (
            <NavLink
              to={item.path}
              key={item.id}
              className={({ isActive }) =>
                `flex items-center gap-2 cursor-pointer p-4 ${
                  isActive ? "bg-[#e0edfa9f]" : ""
                }`
              }
            >
              {({ isActive }) => {
                const Icon = isActive ? item.active_icon : item.icon;

                return (
                  <>
                    <Icon size={20} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="transition-opacity duration-300 font-dm-sans text-small font-medium whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebard;
