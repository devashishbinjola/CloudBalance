import React from "react";
import axios from "axios";
import "../CostExplorerDashBoard/css/Filter.css"; // Assuming you have a CSS file for styling

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
    <div className="filter-sidebar">
      <h2 className="section-title">Filters</h2>
      {loading.columns ? (
        <div className="loading">Loading filters...</div>
      ) : (
        <div className="filter-list">
          {columns.map((filter, index) => (
            <div key={index} className="filter-item">
              <button
                className={`filter-button ${activeSidebarFilter === filter ? "active" : ""}`}
                onClick={() => handleSidebarFilterClick(filter)}
              >
                {filter}
              </button>
              {activeSidebarFilter === filter && (
                <div className="filter-card">
                  <div className="filter-card-header">
                    <span className="filter-card-title">{filter}</span>
                    <button onClick={closeFilterPanel} className="close-button">
                      ×
                    </button>
                  </div>
                  <div className="filter-values-container">
                    {loading.values ? (
                      <div className="loading">Loading values...</div>
                    ) : filterValues.length > 0 ? (
                      filterValues.map((value, index) => (
                        <label
                          key={index}
                          className="checkbox-item"
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
                            className="checkbox"
                          />
                          <span className="checkbox-label">{value}</span>
                        </label>
                      ))
                    ) : (
                      <div className="no-values">No values available</div>
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

export default Filter;