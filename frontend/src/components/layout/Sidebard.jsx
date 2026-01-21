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
import { FiPackage } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { LuUsersRound } from "react-icons/lu";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { RiAlignItemLeftFill } from "react-icons/ri";

import { NavLink } from "react-router-dom";

function Sidebard() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
      id: "manage_employee",
      path: "/manage-employee",
      icon: FaRegUser,
      active_icon: FaUser,
      label: "Employees",
    },
    {
      id: "manage_users",
      path: "/manage-users",
      icon: FaRegUser,
      active_icon: FaUser,
      label: "Users",
      adminOnly: true,
    },
  ];

  return (
    <aside
      className={`bg-white text-midnight min-h-screen flex flex-col  overflow-hidden  border-r  border-gray-300 
        transition-[width] duration-300 ease-in-out
        ${isCollapsed ? "w-16 " : "w-80"}`}
    >
      <div
        className={`flex justify-between items-center font-poppins font-bold text-2xl gap-2 px-3 h-20 ${
          isCollapsed ? "hidden " : "block"
        }`}
      >
        <div className="flex flex-row items-center gap-2">
          <span className="bg-black text-white p-2 rounded-xl">
            <FiPackage size={20} />
          </span>

          <h1 className="text-xl">Assetfy</h1>
        </div>

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
        className={`flex justify-center items-center  px-3 ${
          isCollapsed ? "block  h-20" : "hidden"
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

      <div className="flex flex-col justify-between h-full">
        <div
          className={`flex flex-col  gap-1 py-5 px-2 ${
            isCollapsed ? " justify-center items-center" : ""
          }`}
        >
          {menuItem
            .filter((item) => {
              //if item is adminOnly and user is not admin hide it
              if (item.adminOnly && user?.role !== "admin") return false;
              return true;
            })
            .map((item) => {
              return (
                <NavLink
                  to={item.path}
                  key={item.id}
                  className={({ isActive }) =>
                    `flex items-center gap-2 cursor-pointer py-3 px-4 transition-all duration-300 ${
                      isActive
                        ? "bg-midnight mx-2 rounded-xl text-white"
                        : "mx-2"
                    }`
                  }
                >
                  {({ isActive }) => {
                    const Icon = isActive ? item.active_icon : item.icon;

                    return (
                      <>
                        <Icon size={18} className="flex-shrink-0" />

                        {!isCollapsed && (
                          <span className="transition-opacity duration-300 font-dm-sans text-sm font-semibold whitespace-nowrap">
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

        <div className="font-dm-sans whitespace-nowrap p-2">
          <div
            className={`flex items-center gap-2 hover:cursor-pointer hover:bg-zinc-100 rounded-xl
      transition-all duration-300
      ${isCollapsed ? "justify-center py-4 px-2" : "justify-start py-4 px-4"}
    `}
          >
            {/* Icon always visible */}
            <IoMdSettings size={18} />

            {/* Text fades in/out */}
            <p
              className={`font-semibold text-sm transition-all duration-300 overflow-hidden 
        ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
      `}
            >
              Settings
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebard;
