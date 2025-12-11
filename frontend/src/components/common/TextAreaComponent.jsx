import React from "react";
import { Input, ConfigProvider } from "antd";
const { TextArea } = Input;
function TextAreaComponent() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBorder: "#99a1af",
            colorBgContainer: "#f5f7f9", // Optional: background color
            borderRadius: 10, // Optional: border radius
          },
        },
      }}
    >
      <TextArea rows={4} placeholder="Add any relevant details." />
    </ConfigProvider>
  );
}

export default TextAreaComponent;
