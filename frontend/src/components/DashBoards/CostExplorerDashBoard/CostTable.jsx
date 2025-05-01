import React from "react";
import ".//css/CostTable.css";

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
      <div className="table-container">
        <div className="no-data">No data available for the selected criteria</div>
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
    <div className="table-container">
      <h3 className="table-title">{groupBy} Cost Breakdown (Month-wise)</h3>
      {loading ? (
        <div className="loading">Loading table data...</div>
      ) : (
        <div className="table-wrapper">
          <table className="cost-table">
            <thead>
              <tr>
                <th className="table-header">{groupBy}</th>
                {months.map((month) => (
                  <th key={month} className="table-header">
                    {month}
                  </th>
                ))}
                <th className="table-header">Total</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.service}>
                  <td className="table-cell">{row.service}</td>
                  {months.map((month) => (
                    <td key={month} className="table-cell">
                      {formatCost(row[month])}
                    </td>
                  ))}
                  <td className="table-cell">{formatCost(row.total)}</td>
                </tr>
              ))}
              <tr>
                <td className="total-row">{totalRow.service}</td>
                {months.map((month) => (
                  <td key={month} className="total-row">
                    {formatCost(totalRow[month])}
                  </td>
                ))}
                <td className="total-row">{formatCost(totalRow.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CostTable;