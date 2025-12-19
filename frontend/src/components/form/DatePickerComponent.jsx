import { DatePicker, Space, ConfigProvider } from "antd";

export default function DatePickerComponent({ value, onChange }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            colorBorder: "#d4d4d8",
          },
        },
      }}
    >
      <Space vertical style={{ width: "100%" }}>
        <DatePicker
          onChange={onChange}
          value={value}
          size="large"
          style={{
            width: "100%",
            height: "35px",
            borderRadius: "10px",
          }}
        />
      </Space>
    </ConfigProvider>
  );
}
