import React from "react";

import { Link } from "react-router-dom";
import CodeBoxSmall from "../../CodeBoxes/CodeBoxSmall/CodeBoxSmall";
import { FaCheckSquare, FaDotCircle } from "react-icons/fa";
import specifyreportdetailsimage from "../../../assets/specifyreportdetailsimage.png";
import configures3bucket from "../../../assets/configures3bucket.png";
import reportdelhiveryoptionimage from "../../../assets/reportdelhiveryoptionimage.png";
import "./OnboardingPagethree.css";
// import "./Onboarding/OnboardingAll.css"; // Assuming you have a common CSS file for onboarding pages

const OnboardingPagethree = () => {
  const thirdPageDataone = "ck-tuner-275595855473-hourly-cur";
  const thirdPageDatatwo = "275595855473";
  return (
    <div className="onboarding-page-three">
      <h1>Create Cost & Usage Report</h1>
      <p>Create a Cost & Usage Report by following these steps</p>
      <div className="main">
        <p>
          <span className="step-number">1</span>
          Go to <a href="#">Cost and Usage Reports</a> in the Billing Dashboard
          and click on <b>Create report.</b>
        </p>
        <p>
          <span className="step-number">2</span> Name the report as shown below
          and select the <b>Include resource IDs</b> checkbox -
        </p>
        <CodeBoxSmall code={JSON.stringify(thirdPageDataone, null, 2)} />
        <span className="config-note">
          Ensure that the following configuration is checked
        </span>
        <div className="check-icon-row">
          <FaCheckSquare className="check-icon" />
          <span className="check-text">Include Resource IDs</span>
        </div>
        <div className="image-section">
          <span>Click <b>onNext</b></span>
          <img src={specifyreportdetailsimage} alt="Specify Report Details" />
        </div>
        <p>
          <span className="step-number">3</span> In <i>Configure S3 Bucket</i>,
          provide the name of the S3 bucket that was created -
        </p>
        <span className="config-note">
          Ensure that the following configuration is checked
        </span>
        <div className="check-icon-row">
          <FaCheckSquare className="check-icon" />
          <span className="check-text">
            The following default policy will be applied to your bucket
          </span>
        </div>
        <div className="image-section">
          <span>Click on <b>Save</b></span>
          <img src={configures3bucket} alt="Configure S3 Bucket Image" />
        </div>
        <p>
          <span className="step-number">4</span> In the <i>Delivery options</i>{" "}
          section, enter the below-mentioned Report path prefix -
        </p>
        <div className="config-label">Report path prefix:</div>
        <CodeBoxSmall code={thirdPageDatatwo} />
        <div className="config-label">
          Additionally, ensure that the following checks are in place
        </div>
        <div className="config-label">Time granularity:</div>
        <div className="check-icon-row">
          <FaDotCircle className="dot-icon" />
          <span className="check-text">Hourly</span>
        </div>
        <div className="config-label">
          Please make sure these checks are Enabled in Enable report data
          integration for:
        </div>
        <div className="check-icon-row">
          <FaCheckSquare className="check-icon" />
          <span className="check-text">Amazon Athena</span>
        </div>
        <img src={reportdelhiveryoptionimage} alt="Report Delivery Option Image" />
        <p>
          <span className="step-number">5</span> Click on <b>Next</b>. Now,
          review the configuration of the Cost and Usage Report. Once satisfied,
          click on <b>Create Report</b>.
        </p>
      </div>
    </div>
  );
};

export default OnboardingPagethree;