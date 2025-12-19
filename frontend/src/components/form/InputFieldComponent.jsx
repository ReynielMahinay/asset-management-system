import React from "react";

function InputFieldComponent({
  label,
  value,
  onChange,
  className = "",
  required = true,
}) {
  const inputId = label.replace(/\s+/g, "-").toLowerCase(); //just for unique id to for label - input field

  return (
    <div
      className={`flex flex-col gap-2 text-[0.7rem] font-poppins font-semibold text-midnight w-full ${className}`}
    >
      <label htmlFor={inputId}>
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type="text"
        id={inputId}
        value={value || ""} // Controlled value
        onChange={onChange} // Must be (e) => handleChange("field", e.target.value)
        required={required}
        className="border-gray-400 border-1 rounded-lg shadow-xsm px-2 py-1.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
      />
    </div>
  );
}

export default InputFieldComponent;
