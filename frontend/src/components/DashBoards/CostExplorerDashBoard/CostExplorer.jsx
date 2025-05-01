import React, { useState, useEffect } from "react";
import axios from "axios";
import GroupBy from "./GroupBy";
import Filter from "./Filter";
import ChartDisplay from "./ChartDisplay";
import DateRangePicker from "./DateRangePicker";
import CostTable from "./CostTable";
import "../CostExplorerDashBoard/css/CostExplorer.css";

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
          setSelectedAccountId(response.data[11].accountNo);
        }
        setLoading((prev) => ({ ...prev, accounts: false }));
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
        setLoading((prev) => ({ ...prev, accounts: false }));
      });
  }, []);

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
    <div className="cost-explorer-container">
      <div className="account-selector">
        <label className="account-label">Select Account:</label>
        <select
          value={selectedAccountId || ""}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="account-select"
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
      <div className="main-content">
        {/* Main Content Area */}
        <div className="content-area">
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

export default CostExplorer;