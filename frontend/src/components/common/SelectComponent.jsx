function SelectComponent({ value, options, label, onChange }) {
  const inputId = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="flex flex-col gap-2 text-[0.7rem] font-poppins font-semibold text-midnight">
      <label htmlFor={inputId}>
        {label} <span className="text-red-600">*</span>
      </label>
      <select
        id={inputId}
        value={value || ""} // fallback if undefined
        onChange={(e) => onChange(e.target.value)}
        className="border-gray-400 border-1 rounded shadow-xsm px-2 py-1.5 font-normal"
      >
        {options.map((opt) => (
          <option key={opt.id || opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectComponent;
