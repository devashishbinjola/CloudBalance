import React from "react";
import { FaEdit } from "react-icons/fa";
import "./Table.css";

const Table = ({ columns, data, emptyMessage, onRowAction }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id || index}>
                {columns.map((column) => (
                  <td key={column.key}>
                   
                    {column.render ? (
                      column.render(item).type === "edit" ? (
                        <FaEdit
                          className="edit-icon"
                          onClick={column.render(item).onClick}
                          style={{ cursor: "pointer", color: "#007bff" }}
                        />
                      ) : (
                        column.render(item)
                      )
                    ) : (
                      item[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>{emptyMessage || "No data found."}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;