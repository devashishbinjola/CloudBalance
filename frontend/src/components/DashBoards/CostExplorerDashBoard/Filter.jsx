import React from "react";
import axios from "axios";

const Filter = ({
  columns,
  activeSidebarFilter,
  setActiveSidebarFilter,
  filterValues,
  setFilterValues,
  selectedFilterValues,
  setSelectedFilterValues,
  selectedAccountId,
  loading,
  setLoading,
}) => {
  const handleSidebarFilterClick = async (filterName) => {
    if (!selectedAccountId) {
      alert("Please select an account first");
      return;
    }

    setActiveSidebarFilter(filterName);
    setLoading((prev) => ({ ...prev, values: true }));

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8080/api/costs/${selectedAccountId}/filter`,
        { columnName: filterName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFilterValues(response.data.values || []);
      setSelectedFilterValues((prev) => ({
        ...prev,
        [filterName]: [],
      }));
    } catch (error) {
      console.error(`Error fetching values for ${filterName}:`, error);
      setFilterValues([]);
    } finally {
      setLoading((prev) => ({ ...prev, values: false }));
    }
  };

  const handleCheckboxChange = (filterName, value) => {
    setSelectedFilterValues((prev) => {
      const currentValues = prev[filterName] || [];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [filterName]: currentValues.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [filterName]: [...currentValues, value],
        };
      }
    });
  };

  const closeFilterPanel = () => {
    setActiveSidebarFilter(null);
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={sectionTitleStyle}>Filters</h2>
      {loading.columns ? (
        <div style={loadingStyle}>Loading filters...</div>
      ) : (
        <div style={filterListStyle}>
          {columns.map((filter, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              <button
                style={{
                  ...filterButtonStyle,
                  backgroundColor:
                    activeSidebarFilter === filter ? "#2563eb" : "#f3f4f6",
                  color: activeSidebarFilter === filter ? "#fff" : "#1f2937",
                }}
                onClick={() => handleSidebarFilterClick(filter)}
              >
                {filter}
              </button>
              {activeSidebarFilter === filter && (
                <div style={filterCardStyle}>
                  <div style={filterCardHeaderStyle}>
                    <span style={filterCardTitleStyle}>{filter}</span>
                    <button onClick={closeFilterPanel} style={closeButtonStyle}>
                      ×
                    </button>
                  </div>
                  <div style={filterValuesContainerStyle}>
                    {loading.values ? (
                      <div style={loadingStyle}>Loading values...</div>
                    ) : filterValues.length > 0 ? (
                      filterValues.map((value, index) => (
                        <label
                          key={index}
                          style={checkboxItemStyle}
                          htmlFor={`${filter}-${value}`}
                        >
                          <input
                            type="checkbox"
                            id={`${filter}-${value}`}
                            checked={
                              (selectedFilterValues[filter] || []).includes(
                                value
                              )
                            }
                            onChange={() => handleCheckboxChange(filter, value)}
                            style={checkboxStyle}
                          />
                          <span style={checkboxLabelStyle}>{value}</span>
                        </label>
                      ))
                    ) : (
                      <div style={noValuesStyle}>No values available</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles
const sidebarStyle = {
  flex: "0 0 280px",
  backgroundColor: "#fff",
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  height: "fit-content",
  position: "sticky",
  top: "24px",
};

const filterListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const filterButtonStyle = {
  width: "100%",
  padding: "10px 16px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "500",
  textAlign: "left",
  cursor: "pointer",
  transition: "all 0.2s",
  border: "none",
  outline: "none",
};

const filterCardStyle = {
  marginTop: "8px",
  padding: "12px",
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const filterCardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
};

const filterCardTitleStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#1f2937",
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  color: "#6b7280",
  padding: "4px",
};

const filterValuesContainerStyle = {
  maxHeight: "200px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const checkboxItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "4px 0",
};

const checkboxStyle = {
  width: "16px",
  height: "16px",
  cursor: "pointer",
};

const checkboxLabelStyle = {
  fontSize: "13px",
  color: "#1f2937",
};

const loadingStyle = {
  padding: "12px",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "14px",
};

const noValuesStyle = {
  padding: "12px",
  color: "#9ca3af",
  fontSize: "13px",
  fontStyle: "italic",
};

const sectionTitleStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "12px",
};

export default Filter;