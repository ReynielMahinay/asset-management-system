import { Select, ConfigProvider } from "antd";
const SelectAssignment = ({
  options,
  bg_color,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionFontSize: 12,
            colorBorder: "#d4d4d8",
          },
        },
      }}
    >
      <Select
        size="large"
        showSearch
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={options}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        style={{
          width: "100%",
          height: "35px",
          fontSize: "0.8rem",
          borderRadius: "10px",
        }}
      />
    </ConfigProvider>
  );
};

export default SelectAssignment;
