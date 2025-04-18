import React from "react";
import "../css/OnboardingAll.css";
import { Link } from "react-router-dom";
import CodeBoxSmall from "./CodeBoxSmall";
import { FaCheckSquare } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
import specifyreportdetailsimage from "../../public/specifyreportdetailsimage.png";
import configures3bucket from "../../public/configures3bucket.png";
import reportdelhiveryoptionimage from "../../public/reportdelhiveryoptionimage.png";

const OnboardingPagethree = () => {
  const thirdPageDataone = "ck-tuner-275595855473-hourly-cur";
  const thirdPageDatatwo = "275595855473";
  return (
    <div>
      <h1>Create Cost & Usage Report</h1>
      <p>Create a Cost & Usage Report by following these steps</p>
      <div className="main">
        <p>
          <span className="step-number">1</span>
          Go to <a href="#">Cost and Usage Reports</a> in the Billing Dashboard
          and click on
          <b>Create report.</b>
        </p>
        <p>
          <span className="step-number">2</span> Name the report as shown below
          and select the <b>Include resource IDs</b> checkbox -
        </p>
        <CodeBoxSmall code={JSON.stringify(thirdPageDataone, null, 2)} />
        <span style={{ fontSize: "12px", marginLeft: "30px" }}>
          Ensure that the following configuration is checked
        </span>
        <div className="check-icon-row">
          <FaCheckSquare style={{ color: "grey", marginRight: "8px" }} />
          <span style={{ fontSize: "15px" }}>Include Resource IDs</span>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "5px" }}
        >
          <span>
            Click <b>onNext</b>
          </span>
          <img src={specifyreportdetailsimage} alt="Specify Report Details" />
        </div>
        <p>
          <span className="step-number">3</span> In <i>Configure S3 Bucket</i>,
          provide the name of the S3 bucket that was created -
        </p>
        <span style={{ fontSize: "12px", marginLeft: "30px" }}>
          Ensure that the following configuration is checked
        </span>
        <div className="check-icon-row">
          <FaCheckSquare style={{ color: "grey", marginRight: "8px" }} />
          <span style={{ fontSize: "15px" }}>
            The following default policy will be appliet to your bucket
          </span>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "5px" }}
        >
          <span>
            Click on <b>Save</b>
          </span>
          <img src={configures3bucket} alt="Configure S3 Bucket Image" />
        </div>
        <p>
          <span className="step-number">4</span>In the <i>Delivery options</i>{" "}
          section, enter the below-mentioned Report path prefix -
        </p>
        <div style={{ fontSize: "12px", marginLeft: "30px" }}>
          Report path prefix:
        </div>
        <CodeBoxSmall code={thirdPageDatatwo} />

        <div style={{ fontSize: "12px", marginLeft: "30px" }}>
          Additionally, ensure that the following checks are in place
        </div>
        <div style={{ fontSize: "12px", marginLeft: "30px" }}>
          Time granularity:
        </div>
        <div
          className="check-icon-row"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FaDotCircle style={{ color: "lightgray", marginRight: "8px" }} />
          <span style={{ fontSize: "15px" }}>Hourly</span>
        </div>
        <div style={{ fontSize: "12px", marginLeft: "30px" }}>
        Please make sure these checks are Enabled in Enable report data integration for:
        </div>
        <div className="check-icon-row">
          <FaCheckSquare style={{ color: "grey", marginRight: "8px" }} />
          <span style={{ fontSize: "15px" }}>
            Amazon Athena
          </span>
        </div>
        <img src={reportdelhiveryoptionimage} alt="Report Delhivery Option Image" />
        <p><span className="step-number">5</span> Click on <b>Next</b>. Now, review the configuration of the Cost and Usage Report. Once satisfied, click on <b>Create Report</b>.</p>
      </div>
    </div>
  );
};

export default OnboardingPagethree;
