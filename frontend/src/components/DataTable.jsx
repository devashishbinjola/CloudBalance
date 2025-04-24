import React from "react";

const DataTable = ({ service, data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for {service.toUpperCase()}</p>;
  }

  return (
    <div>
      <h3>{service.toUpperCase()} Data</h3>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, i) => (
                <td key={i}>{String(val)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
