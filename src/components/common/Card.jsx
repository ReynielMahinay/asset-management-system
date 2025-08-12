import React from "react";
import { MdOutlineInventory2 } from "react-icons/md";

function Card({ title, Icon, number }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md flex justify-between font-open-sans">
      <div className="flex flex-col gap-3">
        <p className="text-sm">{title}</p>
        <p className="text-2xl font-semibold">{number}</p>
      </div>
      <div className="flex flex-col justify-end items-center gap-2">
        <span className="p-2 bg-[#d6e9fc] flex justify-center items-center rounded-full">
          <Icon className=" text-[#577a9c]" size={20} />
        </span>
        <a href="" className="text-[#577a9c] text-[0.8rem]">
          view
        </a>
      </div>
    </div>
  );
}

export default Card;
