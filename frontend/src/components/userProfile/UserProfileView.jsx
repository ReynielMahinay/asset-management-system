import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

function UserProfileView({ data }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/sign_in", { replace: true });
  };
  return (
    <div className="flex flex-col gap-5 font-poppins">
      <div className="flex flex-row justify-between items-center">
        <span>
          <p className="text-2xl font-semibold">User</p>
          <p className="capitalize">{data?.username || "Guest"}</p>
        </span>
        <span>
          <p className="text-2xl font-semibold">Role</p>
          <p className="capitalize">{data?.role || "role"}</p>
        </span>
      </div>
      <Button title="Logout" onClick={handleLogout} variant="logout_options" />
    </div>
  );
}

export default UserProfileView;
