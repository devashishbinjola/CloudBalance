import React from "react";

// Helper function to extract month-year from period
const parsePeriod = (period) => {
  if (!period) return "";
  const [startDate] = period.split(" to ");
  const [day, month, year] = startDate.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleString("default", { month: "short", year: "numeric" }); // e.g., "Apr 2025"
};

// Helper function to format numbers with K/M/B scaling
const formatCost = (value) => {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
};

const CostTable = ({ data, loading, groupBy }) => {
  // Guard clause for invalid data
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div style={tableContainerStyle}>
        <div style={noDataStyle}>No data available for the selected criteria</div>
      </div>
    );
  }

  // Get unique months and services
  const months = [...new Set(data.map((item) => parsePeriod(item.period)))].sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const services = [...new Set(data.map((item) => item.name))].sort(); // Sort alphabetically for consistency

  // Prepare table data
  const tableData = services.map((service) => {
    const row = { service };
    let rowTotal = 0;

    months.forEach((month) => {
      const item = data.find(
        (d) => d.name === service && parsePeriod(d.period) === month
      );
      const value = item ? item.total : 0;
      row[month] = value;
      rowTotal += value;
    });

    row.total = rowTotal;
    return row;
  });

  // Calculate total row
  const totalRow = { service: "Total" };
  let grandTotal = 0;
  months.forEach((month) => {
    const monthTotal = tableData.reduce((sum, row) => sum + row[month], 0);
    totalRow[month] = monthTotal;
    grandTotal += monthTotal;
  });
  totalRow.total = grandTotal;

  return (
    <div style={tableContainerStyle}>
      <h3 style={tableTitleStyle}>{groupBy} Cost Breakdown (Month-wise)</h3>
      {loading ? (
        <div style={loadingStyle}>Loading table data...</div>
      ) : (
        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...headerStyle, position: "sticky", top: 0, zIndex: 1 }}>
                  {groupBy}
                </th>
                {months.map((month) => (
                  <th
                    key={month}
                    style={{ ...headerStyle, position: "sticky", top: 0, zIndex: 1 }}
                  >
                    {month}
                  </th>
                ))}
                <th style={{ ...headerStyle, position: "sticky", top: 0, zIndex: 1 }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.service}>
                  <td style={cellStyle}>{row.service}</td>
                  {months.map((month) => (
                    <td key={month} style={cellStyle}>
                      {formatCost(row[month])}
                    </td>
                  ))}
                  <td style={cellStyle}>{formatCost(row.total)}</td>
                </tr>
              ))}
              <tr>
                <td style={totalRowStyle}>{totalRow.service}</td>
                {months.map((month) => (
                  <td key={month} style={totalRowStyle}>
                    {formatCost(totalRow[month])}
                  </td>
                ))}
                <td style={totalRowStyle}>{formatCost(totalRow.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Styles
const tableContainerStyle = {
  backgroundColor: "#fff",
  padding: "24px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  marginTop: "24px",
  maxHeight: "440px", // Limit table height to trigger vertical scrolling
  overflow: "hidden", // Prevent content from spilling out
  boxSizing: "border-box",
  marginBottom: "250px", // Ensure space below table
};

const tableTitleStyle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "16px",
};

const tableWrapperStyle = {
  overflowX: "auto", // Horizontal scrolling
  overflowY: "auto", // Vertical scrolling
  maxHeight: "340px", // Adjust for title and padding (400px - 24px padding - 36px title)
};

const tableStyle = {
  width: "100%",
  minWidth: "600px", // Ensure table is wide enough for horizontal scrolling
  borderCollapse: "collapse",
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  color: "#1f2937",
};

const headerStyle = {
  padding: "12px",
  backgroundColor: "#f9fafb",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "left",
  fontWeight: "600",
  color: "#1f2937",
};

const cellStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "left",
};

const totalRowStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "left",
  fontWeight: "600", // Bold text for total row
  backgroundColor: "#f3f4f6", // Light gray background to distinguish
};

const loadingStyle = {
  padding: "12px",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "14px",
};

const noDataStyle = {
  padding: "24px",
  textAlign: "center",
  color: "#9ca3af",
  fontSize: "16px",
  fontStyle: "italic",
};

export default CostTable;