import React from "react";
import { Modal } from "antd";
function ModalNotification({ open, setModalNotifOpen, customWidht }) {
  return (
    <div>
      <Modal
        title="Notification"
        style={{
          top: 60,
          position: "absolute",
          right: 10,
          left: "auto",
          margin: 0,
        }}
        width={
          customWidht ?? {
            xs: "25%",
            sm: "20%",
            md: "20%",
            lg: "25%",
            xl: "25%",
            xxl: "25%",
          }
        }
        mask={false}
        footer={null}
        open={open}
        onCancel={() => setModalNotifOpen(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  );
}

export default ModalNotification;
