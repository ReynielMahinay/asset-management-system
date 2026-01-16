import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { Avatar, Space } from "antd";
import { FaUserCircle } from "react-icons/fa";

function UserProfileView({ data }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/sign_in", { replace: true });
  };
  return (
    <div className="flex flex-col justify-center items-center gap-5 font-poppins">
      <Avatar
        size={250}
        src={data?.avatarUrl} // real profile picture
        icon={!data?.avatarUrl && <FaUserCircle />} // fallback icon
      />

      <div className="flex flex-col justify-between items-center">
        <span>
          <p className="capitalize text-4xl font-semibold">
            {data?.username || "Guest"}
          </p>
        </span>
        <span className="flex flex-row space-x-1">
          <p className="capitalize">Role: </p>
          <p className="capitalize font-light ">{data?.role || "role"}</p>
        </span>
      </div>
      <Button title="Logout" onClick={handleLogout} variant="logout_options" />
    </div>
  );
}

export default UserProfileView;
