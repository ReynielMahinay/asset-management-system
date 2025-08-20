import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

const NavBar = ({ isActivePage }) => {
  return (
    <div className="bg-[#eef1f4] px-4 py-2 flex flex-row justify-between items-center text-midnight">
      <div>
        <h1 className="capitalize font-open-sans font-semibold text-[.8rem] ">
          {isActivePage}
        </h1>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <IoIosNotifications size={24} />
        <FaUserCircle size={32} className="text-midnight" />
        <span className="leading-3">
          <p className="font-open-sans font-bold text-[.8rem]">user name</p>
          <p className="font-open-sans font-light text-[.6rem]">use position</p>
        </span>
      </div>
    </div>
  );
};

export default NavBar;
