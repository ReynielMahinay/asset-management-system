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
import { IoMdSettings } from "react-icons/io";

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
      className={`bg-white text-midnight min-h-screen flex flex-col transition-all duration-300 eass-in-out overflow-hidden  border-r  border-gray-300 overflow-y-auto ${
        isCollapsed ? "w-16 gap-1 " : "w-64 gap-1"
      }`}
    >
      <div
        className={`flex justify-between items-center font-poppins font-bold text-2xl gap-2 px-2 py-1.5 ${
          isCollapsed ? "hidden" : "block"
        }`}
      >
        <h1 className="text-2xl">Assetfy</h1>
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
        className={`flex justify-center items-center  px-3 py-[10px] ${
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
      {/* <div className="border-b border-gray-300 w-full" /> */}

      <div className="flex flex-col justify-between h-full">
        <div
          className={`flex flex-col  gap-1 py-2 ${
            isCollapsed ? "justify-center items-center" : "  "
          }`}
        >
          {menuItem.map((item) => {
            return (
              <NavLink
                to={item.path}
                key={item.id}
                className={({ isActive }) =>
                  `flex items-center gap-2 cursor-pointer p-3 ${
                    isActive ? "bg-midnight mx-2 rounded-xl text-white" : "mx-2"
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

        <div className="font-dm-sans whitespace-nowrap">
          <div className="" />
          <div className="flex flex-row gap-2 p-4">
            <IoMdSettings size={25} />
            {!isCollapsed && (
              <p className="font-semibold transition-opacity duration-300 text-small">
                Settings
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebard;
