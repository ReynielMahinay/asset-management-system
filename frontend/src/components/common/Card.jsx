import { colors } from "@mui/material";
import React from "react";
import { MdOutlineInventory2 } from "react-icons/md";
import { TbBackground } from "react-icons/tb";

function Card({ title, Icon, number, subtitle }) {
  return (
    <div className="bg-white rounded-md p-4 shadow-sm hover:shadow-lg flex flex-col justify-between font-poppins text-midnight flex-wrap flex-1 transition-transform duration-150 ease-in-out hover:scale-105 gap-2">
      <div className="flex flex-col gap-3">
        <p className="text-[.8rem] font-medium">{title}</p>
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <p className="text-[1.8rem] font-bold">{number}</p>
        <span
          className={`p-2 flex justify-center items-center rounded-full text-[#454544]`}
        >
          <Icon size={20} />
        </span>
      </div>
      <div>
        <p className="capitalize text-[0.7rem] font-light text-gray-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default Card;
