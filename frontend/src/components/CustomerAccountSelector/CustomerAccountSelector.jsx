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

  const handleToggle = (accountId) => {
    if (selectedAccountIds.includes(accountId)) {
      setSelectedAccountIds(selectedAccountIds.filter((id) => id !== accountId));
    } else {
      setSelectedAccountIds([...selectedAccountIds, accountId]);
    }
  };

  const selectedAccounts = accountList.filter((acc) => selectedAccountIds.includes(acc.id));
  const unselectedAccounts = accountList.filter((acc) => !selectedAccountIds.includes(acc.id));

  return (
    <div className="account-selector" style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" , maxWidth: "580px"}}>
      <h2>Select Accounts for Customer</h2>
      <div className="accounts-container">
        <div className="available-accounts">
          <h3>Available Accounts</h3>
          {unselectedAccounts.length === 0 ? (
            <p>No accounts left to select.</p>
          ) : (
            unselectedAccounts.map((acc) => (
              <div key={acc.id} className="account-item">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedAccountIds.includes(acc.id)}
                    onChange={() => handleToggle(acc.id)}
                  />
                  {acc.name}-{acc.accountNo}
                </label>
              </div>
            ))
          )}
        </div>
        <div className="selected-accounts">
          <h3>Selected Accounts</h3>
          {selectedAccounts.length === 0 ? (
            <p>No accounts selected.</p>
          ) : (
            selectedAccounts.map((acc) => (
              <div key={acc.id} className="account-item">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedAccountIds.includes(acc.id)}
                    onChange={() => handleToggle(acc.id)}
                  />
                  {acc.name}-{acc.accountNo}
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerAccountSelector;