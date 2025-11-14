import { colors } from "@mui/material";
import React from "react";
import { MdOutlineInventory2 } from "react-icons/md";
import { TbBackground } from "react-icons/tb";

function Card({ title, Icon, number, text_color }) {
  return (
    <div className="bg-white rounded-md p-4 shadow-md flex justify-between font-open-sans text-midnight flex-wrap flex-1 ">
      <div className="flex flex-col gap-3">
        <p className="text-[.8rem]">{title}</p>
        <p className="text-[1.5rem] font-semibold">{number}</p>
      </div>
      <div className="flex flex-col justify-end items-center gap-2">
        <span className={`p-2 flex justify-center items-center rounded-full `}>
          <Icon size={25} style={{ color: text_color }} />
        </span>
        <a href="" className="text-[#1a1a2e] text-[0.8rem]">
          view
        </a>
      </div>
    </div>
  );
}

export default Card;
