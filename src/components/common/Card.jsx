import React from "react";
import { MdOutlineInventory2 } from "react-icons/md";

function Card() {
  return (
    <div className="bg-white rounded-xl">
      <span className="">
        <p>Total number:</p>
        <MdOutlineInventory2 />;
      </span>
      <p>1000</p>
    </div>
  );
}

export default Card;
