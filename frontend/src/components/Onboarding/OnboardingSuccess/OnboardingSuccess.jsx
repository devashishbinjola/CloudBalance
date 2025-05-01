import React from "react";
import GreenTickIcon from "../../../assets/green_tick_check(1).svg";
import "./OnboardingSuccess.css";

const OnboardingSuccess = ({ onReset }) => {
  return (
    <div className="success-container">
      <img src={GreenTickIcon} alt="Success" className="success-icon" />
      <h1 className="success-title">Onboarding Successful!</h1>
      <p className="success-message">
        Your account has been successfully set up. You're ready to start exploring!
      </p>
      <button className="reset-button" onClick={onReset}>
        Start Again
      </button>
    </div>
  );
};

export default OnboardingSuccess;