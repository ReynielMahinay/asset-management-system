import React from "react";

const NavBar = ({ isActivePage }) => {
  return (
    <div className="bg-white m-3 p-5 rounded-xl shadow-md">
      <h1 className="capitalize font-poppins font-semibold">{isActivePage}</h1>
    </div>
  );
};

export default NavBar;
