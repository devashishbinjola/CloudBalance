import React, { useState } from "react";
import OnboardingPageone from "./OnbordingPageOne/OnboardingPageone";
import OnboardingPagetwo from "./OnboardingPageTwo/OnboardingPagetwo";
import OnboardingPagethree from "./OnboardingPageThree/OnboardingPagethree";
import "./Onboarding.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountNo: "",
    arnNo: "",
    name: "",
  });
  const token = useSelector((state) => state.auth.token);

  const isFormValid = () => {
    const { accountNo, arnNo, name } = formData;
    const accountNoValid = /^\d{12}$/.test(accountNo.trim());
    const arnNoValid = arnNo.trim() !== "";
    const nameValid = name.trim() !== "";

    if (!accountNoValid || !arnNoValid || !nameValid) {
      toast.error("Please fill out all fields correctly.");
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (step === 1 && !isFormValid()) return;
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const cancel = () => {
    setStep(1);
    setFormData({ accountNo: "", arnNo: "", name: "" });
    console.log("Onboarding cancelled");
  };

  const handleSubmit = async () => {
    const { accountNo, arnNo, name } = formData;

    if (!accountNo || !arnNo.trim() || !name.trim()) {
      toast.error("All fields are required. Please fill out all fields.");
      return;
    }

    try {
      const payload = {
        accountNo: parseInt(accountNo, 10),
        arnNo: arnNo.trim(),
        name: name.trim(),
      };

      const response = await axios.post(
        "http://localhost:8080/api/accounts",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);

      setStep(1);
      setFormData({ accountNo: "", arnNo: "", name: "" });
    } catch (error) {
      console.error("Failed to submit:", error);
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="onboarding-container">
      {step === 1 && (
        <OnboardingPageone formData={formData} setFormData={setFormData} />
      )}
      {step === 2 && <OnboardingPagetwo />}
      {step === 3 && <OnboardingPagethree />}
      <div className="onboarding-controls">
        <button onClick={cancel} className="cancel-button">
          Cancel
        </button>
        <div>
          {step > 1 && (
            <button onClick={prevStep} className="back-button">
              {step === 2 && "Back-Create An IAM Role"}{" "}
              {step === 3 && "Back-Add Customer Managed Policies"}
            </button>
          )}
          {step < 3 && (
            <button onClick={nextStep} className="next-button">
              {step === 1 && "Next-Add Customer Managed Policies"}{" "}
              {step === 2 && "Next-Create CUR"}
            </button>
          )}
          {step === 3 && (
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
