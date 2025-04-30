import React from "react";
import "./FilterSortControls.css";

const FilterSortControls = ({
  roleOptions = [],
  selectedRole,
  setSelectedRole,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
  sortOptions = [],
}) => {
  return (
    <div className="filter-sort-controls">
      <div className="filter-group">
        <label>Filter by Role:</label>
        <select value={selectedRole} onChange={(e) => {
          setSelectedRole(e.target.value);
        }}>
          <option value="ALL">All</option>
          {roleOptions.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className="sort-group">
        <label>Sort by:</label>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortControls;
