import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import Breadcrumbs from "../common/Breadcrumbs";
import useAuth from "../../hooks/useAuth";

const NavBar = ({ isActivePage }) => {
  const { user } = useAuth();
  return (
    <div className="bg-[#ffffff] px-4 py-2 flex flex-row justify-between items-center text-midnight border-b border-gray-200">
      <div>
        <h1 className="capitalize font-open-sans font-semibold text-[.8rem] ">
          <Breadcrumbs />
        </h1>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <IoIosNotifications size={24} />
        <FaUserCircle size={32} className="text-midnight" />
        <span className="leading-3">
          <p className="font-poppins font-bold text-[.8rem] capitalize">
            {user?.username || "Guest"}
          </p>
          <p className="font-open-sans font-light text-[.6rem]">
            {user?.role || "role"}
          </p>
        </span>
      </div>
    </div>
  );
};

export default NavBar;
