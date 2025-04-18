import React from "react";
import { Link } from "react-router-dom";
import CodeBox from "./CodeBox";
import CodeBoxSmall from "./CodeBoxSmall";
import roleimg from "../../public/cktunerrole.png";
import "../css/OnboardingAll.css";

const OnboardingPageone = () => {
  const customTrustPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::951485052809:root",
        },
        Action: "sts:AssumeRole",
        Condition: {
          StringEquals: {
            "sts:ExternalId":
              "Um9oaXRDS19ERUZBVUxUZDIzOTJkZTgtN2E0OS00NWQ3LTg3MzItODkyM2ExZTIzMjQw",
          },
        },
      },
      {
        Effect: "Allow",
        Principal: {
          Service: "s3.amazonaws.com",
        },
        Action: "sts:AssumeRole",
      },
    ],
  };
  const createRole = "CK-Tuner-Role-dev2";
  return (
    <div>
      <h1>Create an IAM Role</h1>
      <p>Create an IAM Role by following these steps</p>
      <div className="main">
        <p>
          <span className="step-number">1</span> Log into AWS account &{" "}
          <a href="#">Create an IAM Role.</a>
        </p>

        <p>
          <span className="step-number">2</span> In <i>Trusted entity type</i>{" "}
          section, select <strong>Custom trust policy</strong>. Replace the
          prefilled policy with the policy provided below -
        </p>
        <CodeBox code={JSON.stringify(customTrustPolicy, null, 2)} />

        <p>
          <span className="step-number">3</span> Click on <strong>Next</strong>{" "}
          to go to the <em>Add permissions page</em>. We would not be adding any
          permissions for now because the permission policy content will be
          dependent on the AWS Account ID retrieved from the IAM Role. Click on{" "}
          <strong>Next</strong>.
        </p>

        <p>
          <span className="step-number">4</span> In the <em>Role name field</em>
          , enter the below-mentioned role name, and click on{" "}
          <strong>Create Role -</strong>
        </p>
        <CodeBoxSmall code={createRole} />

        <p>
          <span className="step-number">5</span> Go to the newly created IAM
          Role and copy the Role ARN -
        </p>
        <img src={roleimg} alt="CkTunerRoleImg" />
        <p>
          <span className="step-number">6</span> Paste the copied Role ARN below
          -
        </p>
        <form className="iamrole-form">
  <div className="form-group">
    <label htmlFor="accountId">Account ID</label>
    <input type="text" id="accountId" name="accountId" required />
  </div>

  <div className="form-group">
    <label htmlFor="accountName">Account Name</label>
    <input type="text" id="accountName" name="accountName" required />
  </div>

  <div className="form-group">
    <label htmlFor="arn">Role ARN</label>
    <input type="text" id="arn" name="arn" required />
  </div>
</form>

      </div>
    </div>
  );
};

export default OnboardingPageone;
