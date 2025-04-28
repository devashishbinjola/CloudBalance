import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./CustomerAccountSelector.css";

const CustomerAccountSelector = ({ selectedAccountIds, setSelectedAccountIds }) => {
  const [accountList, setAccountList] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/accounts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAccountList(response.data);
      } catch (error) {
        toast.error("Failed to load accounts.");
      }
    };

    fetchAccounts();
  }, []);

  const handleAdd = (accountId) => {
    if (!selectedAccountIds.includes(accountId)) {
      setSelectedAccountIds([...selectedAccountIds, accountId]);
    }
  };

  const handleRemove = (accountId) => {
    setSelectedAccountIds(selectedAccountIds.filter((id) => id !== accountId));
  };

  const selectedAccounts = accountList.filter((acc) => selectedAccountIds.includes(acc.id));
  const unselectedAccounts = accountList.filter((acc) => !selectedAccountIds.includes(acc.id));

  return (
    <div className="account-selector-wrapper">
      <h4>Select Accounts for Customer</h4>
      <div className="account-columns">
        <div className="account-list">
          <h5>Available Accounts</h5>
          {unselectedAccounts.length === 0 ? (
            <p>No accounts left to select.</p>
          ) : (
            unselectedAccounts.map((acc) => (
              <div className="account-item" key={acc.id}>
                <span>{acc.name}-{acc.accountNo}</span>
                <button onClick={() => handleAdd(acc.id)}>Add</button>
              </div>
            ))
          )}
        </div>

        <div className="account-list selected">
          <h5>Selected Accounts</h5>
          {selectedAccounts.length === 0 ? (
            <p>No accounts selected.</p>
          ) : (
            selectedAccounts.map((acc) => (
              <div className="account-item" key={acc.id}>
                <span>{acc.accountNo} - {acc.name}</span>
                <button onClick={() => handleRemove(acc.id)}>Remove</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerAccountSelector;
