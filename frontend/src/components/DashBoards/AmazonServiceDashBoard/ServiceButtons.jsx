import React from "react";

const ServiceButtons = ({ services, onFetch }) => {
  return (
    <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
      {services.map((service) => (
        <button key={service} onClick={() => onFetch(service)}>
          {service.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default ServiceButtons;
