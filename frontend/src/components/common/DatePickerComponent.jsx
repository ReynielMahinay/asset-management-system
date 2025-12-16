import { DatePicker, Space, ConfigProvider } from "antd";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export default function DatePickerComponent() {
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
