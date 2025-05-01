import React, { useState, useEffect } from "react";
import AccountSelector from "../../AccountSelector/AccountSelector";
import "./AmazonServiceDashboard.css";
import ServiceButtons from "./ServiceButtons";
import DataTable from "./DataTable";
import { getAccounts, getEC2, getASG, getRDS } from "../../../api/aws.js";

const AmazonServiceDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [service, setService] = useState("ec2");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAccounts()
      .then((res) => {
        setAccounts(res.data);
        if (res.data.length > 0) {
          setSelectedAccount(res.data[10] || res.data[0]);
        }
      })
      .catch((err) => {
        console.error("Error fetching accounts:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      fetchData("ec2");
    }
  }, [selectedAccount]);

  const serviceFetchMap = {
    ec2: getEC2,
    asg: getASG,
    rds: getRDS,
  };

  const fetchData = async (serviceType) => {
    if (!selectedAccount) return;
    setService(serviceType);
    setLoading(true);

    try {
      const fetchService = serviceFetchMap[serviceType];
      if (!fetchService) throw new Error(`Unknown service: ${serviceType}`);
      const response = await fetchService(selectedAccount.accountNo);
      setData(response.data);
    } catch (err) {
      console.error(`Error fetching ${serviceType} data:`, err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>AWS Service Dashboard</h2>

      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <AccountSelector
          accounts={accounts}
          selectedId={selectedAccount?.id}
          onSelect={(id) => setSelectedAccount(accounts.find((acc) => acc.id === id))}
        />
      </div>

      <ServiceButtons services={["ec2", "asg", "rds"]} onFetch={fetchData} />
      <DataTable service={service} data={data} loading={loading} />
    </div>
  );
};

export default AmazonServiceDashboard;