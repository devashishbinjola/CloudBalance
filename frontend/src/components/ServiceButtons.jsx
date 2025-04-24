import React from "react";

const ServiceButtons = ({ onFetch }) => {
  return (
    <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
      <button onClick={() => onFetch("ec2")}>EC2</button>
      <button onClick={() => onFetch("asg")}>ASG</button>
      <button onClick={() => onFetch("rds")}>RDS</button>
    </div>
  );
};

export default ServiceButtons;
