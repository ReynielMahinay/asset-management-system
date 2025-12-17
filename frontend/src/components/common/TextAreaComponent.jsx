import React from "react";
import { Input, ConfigProvider } from "antd";
const { TextArea } = Input;
function TextAreaComponent({ value, onChange }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBorder: "#d4d4d8",

            borderRadius: 10, // Optional: border radius
          },
        },
      }}
    >
      <TextArea
        rows={4}
        placeholder="Add any relevant details."
        value={value}
        onChange={onChange}
      />
    </ConfigProvider>
  );
}

export default TextAreaComponent;
