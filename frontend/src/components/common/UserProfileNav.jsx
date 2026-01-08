import React from "react";
import { Avatar, Space } from "antd";
import { FaUserCircle } from "react-icons/fa";

function UserProfileNav({ setModalOpen, data }) {
  return (
    <div
      onClick={() => setModalOpen(true)}
      className="flex flex-row  justify-center items-center gap-2  border border-white hover:border-zinc-300 py-1.5 px-2 rounded hover:bg-zinc-100 hover:cursor-pointer"
    >
      <Space size={16} wrap>
        <Avatar
          style={{ backgroundColor: "#000000" }}
          icon={<FaUserCircle className="text-white" />}
        />
      </Space>
      <div>
        <p className="font-poppins font-semibold text-sm ">
          {data?.username || "Guest"}
        </p>
      </div>
    </div>
  );
}

export default UserProfileNav;
