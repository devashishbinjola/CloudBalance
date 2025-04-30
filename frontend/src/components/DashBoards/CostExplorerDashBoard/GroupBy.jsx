import React, { useState } from "react";

const GroupBy = ({ columns, activeGroupBy, setActiveGroupBy, selectedAccountId, loading }) => {
  const [showMoreColumns, setShowMoreColumns] = useState(false);

  const mainGroupByColumns = [
    "Tenancy",
    "Account Id",
    "Usage Type",
    "Platform",
    "Operation Type",
    "Usage Type Group",
    "Service",
    "Charge Type",
    "Purchase Option",
    "Instance Type",
  ];
  const additionalGroupByColumns = [
    "Policies",
    "Region",
    "Tags",
    "API Operation",
    "Database Engine",
    "Availability Zone",
  ];

  const handleGroupByClick = (columnName) => {
    if (!selectedAccountId) {
      alert("Please select an account first");
      return;
    }
    setActiveGroupBy(columnName);
  };

  return (
    <div style={groupBySectionStyle}>
      <h2 style={sectionTitleStyle}>Group By</h2>
      {loading ? (
        <div style={loadingStyle}>Loading columns...</div>
      ) : (
        <div style={groupByContainerStyle}>
          {mainGroupByColumns.map(
            (column, index) =>
              columns.includes(column) && (
                <button
                  key={index}
                  style={{
                    ...groupByButtonStyle,
                    backgroundColor:
                      activeGroupBy === column ? "#2563eb" : "#e5e7eb",
                    color: activeGroupBy === column ? "#fff" : "#1f2937",
                  }}
                  onClick={() => handleGroupByClick(column)}
                >
                  {column}
                </button>
              )
          )}
          {additionalGroupByColumns.some((col) => columns.includes(col)) && (
            <div style={{ position: "relative" }}>
              <button
                style={{
                  ...groupByButtonStyle,
                  backgroundColor: showMoreColumns ? "#2563eb" : "#e5e7eb",
                  color: showMoreColumns ? "#fff" : "#1f2937",
                }}
                onClick={() => setShowMoreColumns(!showMoreColumns)}
              >
                More
              </button>
              {showMoreColumns && (
                <div style={moreDropdownStyle}>
                  {additionalGroupByColumns.map(
                    (column, index) =>
                      columns.includes(column) && (
                        <button
                          key={index}
                          style={{
                            ...dropdownItemStyle,
                            backgroundColor:
                              activeGroupBy === column ? "#2563eb" : "#fff",
                            color: activeGroupBy === column ? "#fff" : "#1f2937",
                          }}
                          onClick={() => {
                            handleGroupByClick(column);
                            setShowMoreColumns(false);
                          }}
                        >
                          {column}
                        </button>
                      )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Styles
const groupBySectionStyle = {
  backgroundColor: "#fff",
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const groupByContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  overflowX: "auto",
  paddingBottom: "8px",
};

const groupByButtonStyle = {
  padding: "8px 16px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.2s",
  whiteSpace: "nowrap",
  border: "none",
  outline: "none",
};

const moreDropdownStyle = {
  position: "absolute",
  top: "100%",
  left: "0",
  backgroundColor: "#fff",
  borderRadius: "6px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  zIndex: "10",
  minWidth: "200px",
  padding: "8px 0",
};

const dropdownItemStyle = {
  width: "100%",
  padding: "8px 16px",
  border: "none",
  backgroundColor: "#fff",
  textAlign: "left",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.2s",
};

const sectionTitleStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "12px",
};

const loadingStyle = {
  padding: "12px",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "14px",
};

export default GroupBy;