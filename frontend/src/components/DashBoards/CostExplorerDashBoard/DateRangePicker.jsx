import React from "react";

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div style={dateRangeContainerStyle}>
      <div style={dateInputContainerStyle}>
        <label style={labelStyle}>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={dateInputStyle}
        />
      </div>
      <div style={dateInputContainerStyle}>
        <label style={labelStyle}>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={dateInputStyle}
        />
      </div>
    </div>
  );
};

// Styles
const dateRangeContainerStyle = {
  display: "flex",
  gap: "24px",
  marginBottom: "24px",
  flexWrap: "wrap",
};

const dateInputContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#1f2937",
};

const dateInputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  backgroundColor: "#fff",
  fontSize: "14px",
  color: "#1f2937",
  outline: "none",
  transition: "border-color 0.2s",
  width: "180px",
};

export default DateRangePicker;