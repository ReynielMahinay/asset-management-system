import React from "react";
import { Modal } from "antd";
function ModalNotification({ open, setModalNotifOpen }) {
  return (
    <div>
      <Modal
        title="20px to Top"
        style={{
          top: 60,
          position: "absolute",
          right: 10,
          left: "auto",
          margin: 0,
        }}
        mask={false}
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
