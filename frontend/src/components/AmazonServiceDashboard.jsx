import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountSelector from "./AccountSelector";
import "../css/AmazonServiceDashboard.css";
import ServiceButtons from "./ServiceButtons";
import DataTable from "./DataTable";

const AmazonServiceDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [service, setService] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:8080/api/accounts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setAccounts(res.data);
        if (res.data.length > 0) {
          setSelectedAccount(res.data[0]);
        }
      })
      .catch((err) => {
        console.error("Error fetching accounts:", err);
      });
  }, []);

  const fetchData = async (serviceType) => {
    if (!selectedAccount) return;
    setService(serviceType);
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.get(`http://localhost:8080/api/aws/${serviceType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: selectedAccount.accountNo, // only sending accountNo as id
        },
      });
      setData(response.data);
    } catch (err) {
      console.error(`Error fetching ${serviceType} data:`, err);
      setData([]);
    }
  };
  

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>AWS Service Dashboard</h2>

      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <AccountSelector
          accounts={accounts}
          selectedId={selectedAccount?.id}
          onSelect={(id) => setSelectedAccount(accounts.find(acc => acc.id === id))}
        />
      
      </div>

      <ServiceButtons onFetch={fetchData} />
      <DataTable service={service} data={data} />
    </div>
  );
};

export default AmazonServiceDashboard;
