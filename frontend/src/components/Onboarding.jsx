import React, { useState } from 'react';
import OnboardingPageone from './OnboardingPageone';
import OnboardingPagetwo from './OnboardingPagetwo';
import OnboardingPagethree from './OnboardingPagethree';
import '../css/Onboarding.css';

const Onboarding = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const cancel = () => {
    setStep(1);
    console.log('Onboarding cancelled');
  };

 

  return (
    
    <div className="onboarding-container">
  
      {step === 1 && <OnboardingPageone />}
      {step === 2 && <OnboardingPagetwo />}
      {step === 3 && <OnboardingPagethree />}
      <div className="onboarding-controls">
        <button onClick={cancel} className="cancel-button">Cancel</button>
        <div>
        {step > 1 && (
          <button onClick={prevStep} className="back-button">{step===2 && "Back-Create An IAM Role"} {step===3 && "Back-Add Customer Managed Policies"}</button>
        )}
        {step < 3 && (
          <button onClick={nextStep} className="next-button">{step===1 && "Next-Add Customer Managed Policies"} {step===2 && "Next-Create CUR"}</button>
        )}
        {step == 3 && (
          <button className="submit-button">Submit</button>
        )}
        </div>
        </div>
    </div>
  );  
};

export default Onboarding;
