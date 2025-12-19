import React, { useState, useMemo } from "react";
import { Button, Flex, Modal, Divider } from "antd";
function ModalView({ open, close, data, ViewComponent }) {
  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Responsive */}
      <Modal
        title="User info"
        centered
        open={open}
        footer={null}
        onCancel={() => close(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        {ViewComponent && <ViewComponent data={data} />}
      </Modal>
    </Flex>
  );
}

export default ModalView;
