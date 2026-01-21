import { Select, ConfigProvider } from "antd";

function SelectComponent({ value, options, label, onChange, bg_color }) {
  return (
    <div className="text-[0.7rem] font-poppins font-semibold text-midnight">
      <p>
        {label}
        <span className="text-red-600">*</span>
      </p>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              optionFontSize: 12,
              colorBorder: "#99a1af",
              colorBgContainer: bg_color,
            },
          },
        }}
      >
        <Select
          size="large"
          showSearch
          placeholder="Select a person"
          value={value}
          onChange={onChange}
          options={options}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          style={{ width: "100%", fontSize: "0.7rem" }}
        />
      </ConfigProvider>
    </div>
  );

  console.log((options = { options }));
}

export default SelectComponent;
