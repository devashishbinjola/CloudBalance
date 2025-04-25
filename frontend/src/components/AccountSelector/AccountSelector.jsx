import React from "react";

const AccountSelector = ({ accounts, selectedId, onSelect }) => {
  return (
    <select value={selectedId} onChange={(e) => onSelect(parseInt(e.target.value))}>
      {accounts.map(acc => (
        <option key={acc.id} value={acc.id}>
          {acc.name} ({acc.accountNo})
        </option>
      ))}
    </select>
  );
};

export default AccountSelector;
