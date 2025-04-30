import React, { useState, useEffect } from "react";
import axios from "axios";
import GroupBy from "./GroupBy";
import Filter from "./Filter";
import ChartDisplay from "./ChartDisplay";
import DateRangePicker from "./DateRangePicker";
import CostTable from "./CostTable";

const CostExplorer = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [allColumns, setAllColumns] = useState([]);
  const [activeGroupBy, setActiveGroupBy] = useState("Service");
  const [activeSidebarFilter, setActiveSidebarFilter] = useState(null);
  const [filterValues, setFilterValues] = useState([]);
  const [selectedFilterValues, setSelectedFilterValues] = useState({});
  const [loading, setLoading] = useState({
    accounts: false,
    columns: false,
    values: false,
    chart: false,
  });
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState("2025-04-01");
  const [endDate, setEndDate] = useState("2025-04-30");

  // Fetch accounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading((prev) => ({ ...prev, accounts: true }));

    axios
      .get("http://localhost:8080/api/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAccounts(response.data);
        if (response.data.length > 0) {
          setSelectedAccountId(response.data[0].accountNo);
        }
        setLoading((prev) => ({ ...prev, accounts: false }));
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
        setLoading((prev) => ({ ...prev, accounts: false }));
      });
  }, []);

  // Fetch columns when account is selected
  useEffect(() => {
    if (!selectedAccountId) return;

    const token = localStorage.getItem("token");
    setLoading((prev) => ({ ...prev, columns: true }));

    axios
      .get(`http://localhost:8080/api/group?accountId=${selectedAccountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAllColumns(response.data.GroupBy || []);
        setLoading((prev) => ({ ...prev, columns: false }));
      })
      .catch((error) => {
        console.error("Error fetching columns:", error);
        setLoading((prev) => ({ ...prev, columns: false }));
      });
  }, [selectedAccountId]);

  // Fetch chart data
  useEffect(() => {
    if (!selectedAccountId || !activeGroupBy) return;

    const token = localStorage.getItem("token");
    setLoading((prev) => ({ ...prev, chart: true }));

    const payload = {
      groupBy: activeGroupBy,
      startDate,
      endDate,
      filters: selectedFilterValues,
    };

    axios
      .post(`http://localhost:8080/api/costs/${selectedAccountId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Debug
        setChartData(response.data.data || []);
        setLoading((prev) => ({ ...prev, chart: false }));
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        setLoading((prev) => ({ ...prev, chart: false }));
      });
  }, [selectedAccountId, activeGroupBy, startDate, endDate, selectedFilterValues]);

  return (
    <div style={containerStyle}>
      {/* Account Selector */}
      <div style={accountSelectorStyle}>
        <label style={labelStyle}>Select Account:</label>
        <select
          value={selectedAccountId || ""}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          style={selectStyle}
          disabled={loading.accounts}
        >
          {loading.accounts ? (
            <option>Loading accounts...</option>
          ) : (
            accounts.map((account) => (
              <option key={account.id} value={account.accountNo}>
                {account.name} ({account.accountNo})
              </option>
            ))
          )}
        </select>
      </div>

      {/* Date Range Picker */}
      <DateRangePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {/* Main Layout */}
      <div style={mainContentStyle}>
        {/* Main Content Area */}
        <div style={contentAreaStyle}>
          <GroupBy
            columns={allColumns}
            activeGroupBy={activeGroupBy}
            setActiveGroupBy={setActiveGroupBy}
            selectedAccountId={selectedAccountId}
            loading={loading.columns}
          />

          {/* Chart Display */}
          <ChartDisplay
            data={chartData}
            loading={loading.chart}
            groupBy={activeGroupBy}
          />

          {/* Cost Table */}
          <CostTable
            data={chartData}
            loading={loading.chart}
            groupBy={activeGroupBy}
          />
        </div>

        {/* Filters Sidebar */}
        <Filter
          columns={allColumns}
          activeSidebarFilter={activeSidebarFilter}
          setActiveSidebarFilter={setActiveSidebarFilter}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          selectedFilterValues={selectedFilterValues}
          setSelectedFilterValues={setSelectedFilterValues}
          selectedAccountId={selectedAccountId}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: "24px",
  fontFamily: "'Inter', sans-serif",
  maxWidth: "1600px",
  margin: "0 auto",
  backgroundColor: "#f9fafb",
  minHeight: "100vh",
  overflowY: "auto", // Enable vertical scrolling
  height: "100vh", // Ensure container takes full viewport height
  boxSizing: "border-box",
};

const accountSelectorStyle = {
  marginBottom: "24px",
  maxWidth: "400px",
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "8px",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  backgroundColor: "#fff",
  fontSize: "14px",
  color: "#1f2937",
  outline: "none",
  transition: "border-color 0.2s",
};

const mainContentStyle = {
  display: "flex",
  gap: "24px",
  flexDirection: "row",
  flexWrap: "wrap", // Allow wrapping for responsiveness
  alignItems: "flex-start", // Align items to top
};

const contentAreaStyle = {
  flex: "1",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  minWidth: "0", // Prevent overflow in flex container
};

// Responsive Design
const responsiveStyles = `
  @media (max-width: 1024px) {
    .mainContent {
      flex-direction: column;
    }
    .sidebar {
      flex: 1;
      position: static;
      max-height: none; /* Remove max-height to allow natural growth */
      overflow-y: visible; /* Prevent sidebar from scrolling independently */
    }
    .contentArea {
      width: 100%; /* Full width on smaller screens */
    }
  }

  @media (max-width: 640px) {
    .groupByContainer {
      flex-direction: column;
      align-items: flex-start;
    }
    .groupByButton, .dropdownItem {
      width: 100%;
      text-align: left;
    }
    .container {
      padding: 16px; /* Reduce padding on small screens */
    }
  }
`;

export default CostExplorer;