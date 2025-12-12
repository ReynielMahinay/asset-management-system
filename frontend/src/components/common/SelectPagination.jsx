import React from "react";
import { Select, Space } from "antd";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const pageSizeOptions = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 25, label: "25" },
];
function SelectPagination() {
  return (
    <Space wrap>
      <Select
        defaultValue="5"
        style={{ width: 120 }}
        onChange={handleChange}
        options={pageSizeOptions}
      />
    </Space>
  );
}

export default SelectPagination;
