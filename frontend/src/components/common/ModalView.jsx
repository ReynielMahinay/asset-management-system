import React, { useState, useMemo } from "react";
import { Button, Flex, Modal, Divider } from "antd";
function ModalView({ open, setOpenModaUserInfo, data }) {
  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Responsive */}
      <Modal
        title="User info"
        centered
        open={open}
        onOk={() => setOpenModaUserInfo(false)}
        onCancel={() => setOpenModaUserInfo(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        {data && (
          <div className="flex flex-col ">
            <div className="flex flex-row justify-between">
              <div>
                <h1 className="text-xl font-poppins font-bold">
                  {data.fullname}
                </h1>
                <p className="font-poppins font-light text-xs">{data.email}</p>
              </div>
              <div>
                <h1 className="text-xl font-poppins font-semibold">
                  {data.department}
                </h1>
                <p className="font-poppins font-light text-xs">{data.role}</p>
              </div>
            </div>

            <Divider />

            <div></div>
          </div>
        )}
      </Modal>
    </Flex>
  );
}

export default ModalView;
