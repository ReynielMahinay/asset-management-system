import { DatePicker, Space, ConfigProvider } from "antd";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export default function DatePickerComponent({ bg_color }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            colorBorder: "#99a1af",
            colorBgContainer: bg_color,
          },
        },
      }}
    >
      <Space vertical style={{ width: "100%" }}>
        <DatePicker
          onChange={onChange}
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
