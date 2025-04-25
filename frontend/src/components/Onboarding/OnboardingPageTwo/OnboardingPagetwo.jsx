import React from "react";
import CodeBox from "../../CodeBoxes/CodeBox/CodeBox";
import { Link } from "react-router-dom";
import CodeBoxSmall from "../../CodeBoxes/CodeBoxSmall/CodeBoxSmall";
// import cktunerrole from "../../public/cktunerrole.png"
import cktunerrole from "../../../assets/cktunerrole.png"
// import cktunerrole from "../../../public/cktunerrole.png";
import permissionpolicies from "../../../assets/permissionpolicies.png"
import permissionpoliciessecond from "../../../assets/permissionpoliciessecond.png"
import otherpermissionpolicies from "../../../assets/otherpermissionpolicies.png"
import "../OnboardingAll.css";

const OnboardingPagetwo = () => {
  const secondData = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "CostAudit",
        Effect: "Allow",
        Action: [
          "dms:Describe*",
          "dms:List*",
          "kafka:Describe*",
          "kafka:Get*",
          "kafka:List*",
          "mq:Describe*",
          "mq:List*",
          "route53resolver:Get*",
          "route53resolver:List*",
          "memorydb:Describe*",
          "savingsplans:Describe*",
          "cloudsearch:Describe*",
          "quicksight:Describe*",
          "quicksight:List*",
          "codepipeline:Get*",
          "codepipeline:List*",
          "codebuild:List*",
          "codebuild:Get*",
          "codebuild:Describe*",
          "codebuild:BatchGet*",
          "codedeploy:List*",
          "codedeploy:BatchGet*",
          "codedeploy:Get*",
          "mediaconnect:Describe*",
          "mediaconnect:List*",
          "mediaconvert:Describe*",
          "mediaconvert:Get*",
          "mediaconvert:List*",
          "medialive:Describe*",
          "medialive:List*",
          "mediapackage:Describe*",
          "mediapackage:List*",
          "mediapackage-vod:Describe*",
          "mediapackage-vod:List*",
          "mediastore:DescribeObject",
          "mediastore:Get*",
          "mediastore:List*",
          "mediatailor:Describe*",
          "mediatailor:Get*",
          "mediatailor:List*",
          "ec2:Describe*",
          "elasticache:Describe*",
          "events:DescribeEventBus",
          "events:List*",
          "elasticloadbalancing:Describe*",
          "kinesis:List*",
          "kinesis:Describe*",
          "kinesisanalytics:Describe*",
          "kinesisanalytics:List*",
          "dynamodb:Describe*",
          "dynamodb:List*",
          "cloudwatch:Describe*",
          "cloudwatch:List*",
          "cloudwatch:GetMetricStatistics",
          "ecr:GetLifecyclePolicy",
          "ecr:GetRepositoryPolicy",
          "ecr-public:DescribeRepositories",
          "ecr:List*",
          "ecr:Describe*",
          "lambda:List*",
          "lambda:GetPolicy",
          "lambda:GetAccountSettings",
          "lambda:GetFunctionConfiguration",
          "lambda:GetFunctionCodeSigningConfig",
          "lambda:GetFunctionConcurrency",
          "lambda:GetFunctionConfiguration",
          "rds:Describe*",
          "rds:ListTagsForResource",
          "sqs:GetQueueAttributes",
          "sqs:List*",
          "firehose:Describe*",
          "firehose:List*",
          "kafka:Describe*",
          "kafka:List*",
          "glue:GetDevEndpoint",
          "s3:GetBucketPolicy",
          "s3:List*",
          "network-firewall:Describe*",
          "network-firewall:List*",
          "elasticfilesystem:Describe*",
          "kms:Describe*",
          "kms:List*",
          "kms:GetKeyRotationStatus",
          "kms:GetKeyPolicy",
          "elasticmapreduce:List*",
          "es:Describe*",
          "es:List*",
          "es:Get*",
          "aoss:Get*",
          "aoss:List*",
          "logs:Describe*",
          "logs:List*",
          "application-autoscaling:Describe*",
          "route53:List*",
          "redshift:Describe*",
          "backup:Describe*",
          "backup:Get*",
          "backup:List*",
          "dlm:Get*",
          "dlm:List*",
          "sagemaker:List*",
          "lambda:Get*",
        ],
        Resource: "*",
      },
      {
        Sid: "BillingReadOnly",
        Effect: "Allow",
        Action: ["billingconductor:List*", "billing:ListBillingViews"],
        Resource: "*",
      },
      {
        Sid: "ComputeOptimizerReadAccess",
        Effect: "Allow",
        Action: ["compute-optimizer:Get*"],
        Resource: "*",
      },
      {
        Sid: "CostExplorerAccess",
        Effect: "Allow",
        Action: ["ce:Describe*", "ce:Get*", "ce:List*"],
        Resource: "*",
      },
      {
        Sid: "CURReportDefinitions",
        Effect: "Allow",
        Action: ["organizations:Describe*", "organizations:List*"],
        Resource: "*",
      },
      {
        Sid: "PricingAPIAccess",
        Effect: "Allow",
        Action: ["pricing:*"],
        Resource: "*",
      },
      {
        Sid: "WellArchitectedAccess",
        Effect: "Allow",
        Action: ["wellarchitected:*"],
        Resource: "*",
      },
      {
        Sid: "ReadOnlyForOrgServices",
        Effect: "Allow",
        Action: [
          "detective:Describe*",
          "detective:List*",
          "detective:Get*",
          "devops-guru:Describe*",
          "devops-guru:List*",
          "devops-guru:Get*",
          "devops-guru:Search*",
          "guardduty:Describe*",
          "guardduty:Get*",
          "guardduty:List*",
          "inspector:Describe*",
          "inspector:Get*",
          "inspector2:List*",
          "inspector2:Get*",
          "inspector2:Describe*",
          "macie2:Describe*",
          "macie2:Get*",
          "macie2:List*",
          "account:Get*",
          "account:ListRegions",
          "auditmanager:Get*",
          "auditmanager:List*",
          "controltower:Describe*",
          "controltower:Get*",
          "controltower:List*",
          "sso:Describe*",
          "sso:List*",
          "sso:Get*",
          "sso:Search*",
          "sso-directory:Describe*",
          "sso-directory:Get*",
          "sso-directory:List*",
          "sso-directory:Search*",
          "aws-marketplace:DescribeAgreement",
          "aws-marketplace:Get*",
          "aws-marketplace:List*",
          "aws-marketplace:ViewSubscriptions",
          "aws-marketplace:SearchAgreements",
          "networkmanager:DescribeGlobalNetworks",
          "networkmanager:Get*",
          "networkmanager:List*",
          "trustedadvisor:Describe*",
          "trustedadvisor:List*",
          "cloudtrail:Describe*",
          "cloudtrail:Get*",
          "cloudtrail:List*",
          "cloudtrail:LookupEvents",
          "cloudformation:Describe*",
          "cloudformation:Get*",
          "cloudformation:List*",
          "compute-optimizer:DescribeRecommendationExportJobs",
          "config:Describe*",
          "config:Get*",
          "config:List*",
          "ds:Describe*",
          "ds:Get*",
          "ds:List*",
          "fms:Get*",
          "fms:List*",
          "access-analyzer:Get*",
          "access-analyzer:List*",
          "healthlake:Describe*",
          "healthlake:GetCapabilities",
          "healthlake:List*",
          "healthlake:ReadResource",
          "healthlake:Search*",
          "health:Describe*",
          "license-manager:Get*",
          "license-manager:List*",
          "servicecatalog:Describe*",
          "servicecatalog:Get*",
          "servicecatalog:List*",
          "servicecatalog:ScanProvisionedProducts",
          "servicecatalog:Search*",
          "securityhub:Describe*",
          "securityhub:Get*",
          "securityhub:List*",
          "ssm:Describe*",
          "ssm:List*",
          "ram:Get*",
          "ram:List*",
          "servicequotas:Get*",
          "servicequotas:List*",
          "s3:Describe*",
          "license-manager:GetGrant",
          "license-manager:ListTokens",
          "license-manager-user-subscriptions:List*",
        ],
        Resource: "*",
      },
    ],
  };

  const secondDataTwo="cktuner-CostAuditPolicy";

  const secondDataThree={
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "SecAudit",
        "Effect": "Allow",
        "Action": [
          "cloudfront:List*",
          "cloudfront:Get*",
          "cloudfront:Describe*",
          "ecr:DescribeRepositories",
          "ecr:BatchGetRepositoryScanningConfiguration",
          "iam:List*",
          "iam:Get*",
          "lambda:GetFunctionConfiguration",
          "lambda:GetFunctionUrlConfig",
          "cloudwatch:GetMetricStatistics",
          "ec2:DescribeInstances",
          "ec2:DescribeVpcs",
          "ec2:DescribeSecurityGroups",
          "ec2:DescribeNetworkInterfaces",
          "redshift:DescribeClusters",
          "inspector2:BatchGetAccountStatus",
          "ec2:DescribeFlowLogs",
          "securityhub:GetEnabledStandards",
          "s3:ListAllMyBuckets",
          "s3:GetBucketLogging",
          "s3:GetEncryptionConfiguration",
          "s3:GetBucketPolicyStatus",
          "s3:GetBucketAcl",
          "s3:GetBucketVersioning",
          "s3:GetAccountPublicAccessBlock",
          "s3:GetBucketCORS",
          "s3:GetBucketPolicy",
          "s3:GetBucketVersioning",
          "s3:GetEncryptionConfiguration",
          "s3:GetLifecycleConfiguration",
          "sts:GetCallerIdentity",
          "wafv2:List*",
          "wafv2:Get*"
        ],
        "Resource": "*"
      },
      {
        "Sid": "SecAuditServiceQuotas",
        "Effect": "Allow",
        "Action": [
          "states:ListStateMachines",
          "servicequotas:GetServiceQuota",
          "acm:List*",
          "acm:DescribeCertificate",
          "athena:ListWorkGroups",
          "athena:GetWorkGroup",
          "apigateway:GET",
          "autoscaling:Describe*",
          "cloudformation:DescribeAccountLimits",
          "cloudformation:DescribeStacks",
          "cloudwatch:GetMetricData",
          "ds:GetDirectoryLimits",
          "ec2:Describe*",
          "ec2:GetEbsDefaultKmsKeyId",
          "ec2:GetEbsEncryptionByDefault",
          "ecs:Describe*",
          "ecs:List*",
          "eks:Describe*",
          "eks:List*",
          "elasticache:DescribeCacheClusters",
          "elasticache:DescribeCacheParameterGroups",
          "elasticache:DescribeCacheSecurityGroups",
          "elasticache:DescribeCacheSubnetGroups",
          "elasticbeanstalk:DescribeApplicationVersions",
          "elasticbeanstalk:DescribeApplications",
          "elasticbeanstalk:DescribeEnvironments",
          "elasticfilesystem:DescribeFileSystems",
          "firehose:ListDeliveryStreams",
          "lambda:GetAccountSettings",
          "redshift:DescribeClusterSnapshots",
          "redshift:DescribeClusterSubnetGroups",
          "route53:GetHostedZone",
          "route53:GetHostedZoneLimit",
          "route53:ListHostedZones",
          "servicequotas:List*",
          "servicequotas:Get*",
          "ses:Get*",
          "ses:List*",
          "support:Describe*",
          "support:SearchForCases",
          "trustedadvisor:Describe*",
          "trustedadvisor:GenerateReport",
          "trustedadvisor:RefreshCheck",
          "iam:GenerateCredentialReport",
          "iam:GetCredentialReport",
          "secretsmanager:ListSecrets",
          "secretsmanager:DescribeSecret",
          "sns:List*",
          "sns:Get*",
          "artifact:ListReports",
          "artifact:GetReportMetadata",
          "artifact:GetReport",
          "artifact:GetTermForReport"
        ],
        "Resource": "*"
      },
      {
        "Sid": "NewReadAccountBillingPermissions",
        "Effect": "Allow",
        "Action": [
          "consolidatedbilling:GetAccountBillingRole",
          "consolidatedbilling:ListLinkedAccounts",
          "billing:Get*",
          "payments:ListPaymentPreferences",
          "invoicing:GetInvoicePDF",
          "invoicing:ListInvoiceSummaries"
        ],
        "Resource": "*"
      }
    ]
  }
  const secondDataFour="cktuner-SecAuditPolicy";

  const secondDataFive={
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "CostExplorer",
        "Action": [
          "ce:StartSavingsPlansPurchaseRecommendationGeneration",
          "ce:UpdatePreferences"
        ],
        "Effect": "Allow",
        "Resource": "*"
      },
      {
        "Sid": "ListEC2SPReservations",
        "Effect": "Allow",
        "Action": [
          "ec2:DescribeCapacityReservations",
          "ec2:DescribeCapacityReservationFleets",
          "ec2:GetCapacityReservationUsage",
          "ec2:GetGroupsForCapacityReservation",
          "ec2:DescribeHostReservations",
          "ec2:DescribeHostReservationOfferings",
          "ec2:GetHostReservationPurchasePreview",
          "ec2:DescribeReservedInstancesOfferings",
          "ec2:DescribeReservedInstancesModifications",
          "ec2:DescribeReservedInstances",
          "ec2:GetReservedInstancesExchangeQuote",
          "ec2:DescribeReservedInstancesListings"
        ],
        "Resource": "*"
      },
      {
        "Sid": "ComputeOptimizerAccess",
        "Effect": "Allow",
        "Action": [
          "compute-optimizer:UpdateEnrollmentStatus",
          "compute-optimizer:PutRecommendationPreferences"
        ],
        "Resource": "*"
      },
      {
        "Sid": "ServiceLinkedRole",
        "Effect": "Allow",
        "Action": "iam:CreateServiceLinkedRole",
        "Resource": "arn:aws:iam::*:role/aws-service-role/compute-optimizer.amazonaws.com/AWSServiceRoleForComputeOptimizer*",
        "Condition": {
          "StringLike": {
            "iam:AWSServiceName": "compute-optimizer.amazonaws.com"
          }
        }
      },
      {
        "Sid": "ServiceLinkedRolePolicy",
        "Effect": "Allow",
        "Action": "iam:PutRolePolicy",
        "Resource": "arn:aws:iam::*:role/aws-service-role/compute-optimizer.amazonaws.com/AWSServiceRoleForComputeOptimizer"
      },
      {
        "Sid": "AllowRoleToInspectItself",
        "Effect": "Allow",
        "Action": [
          "iam:ListRolePolicies",
          "iam:GetRolePolicy"
        ],
        "Resource": "arn:aws:iam::275595855473:role/CK-Tuner-Role-dev2"
      }
    ]
  }
  const secondDataSix ="cktuner-TunerReadEssentials";

  const secondDataSeven={
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": [
          "cur:ValidateReportDestination",
          "cur:DescribeReportDefinitions"
        ],
        "Resource": [
          "*"
        ],
        "Effect": "Allow",
        "Sid": "ReadCostAndUsageReport"
      },
      {
        "Action": [
          "s3:ListBucket",
          "s3:GetReplicationConfiguration",
          "s3:GetObjectVersionForReplication",
          "s3:GetObjectVersionAcl",
          "s3:GetObjectVersionTagging",
          "s3:GetObjectRetention",
          "s3:GetObjectLegalHold",
          "s3:GetObject"
        ],
        "Resource": [
          "arn:aws:s3:::ck-tuner-275595855473",
          "arn:aws:s3:::ck-tuner-275595855473/*"
        ],
        "Effect": "Allow",
        "Sid": "S3LimitedRead"
      },
      {
        "Action": [
          "s3:GetObjectVersionTagging",
          "s3:GetBucketVersioning",
          "s3:ReplicateObject",
          "s3:ReplicateDelete",
          "s3:ReplicateTags",
          "s3:ObjectOwnerOverrideToBucketOwner"
        ],
        "Resource": [
          "arn:aws:s3:::ck-tuner-cur-dev2-1000291",
          "arn:aws:s3:::ck-tuner-cur-dev2-1000291/*"
        ],
        "Effect": "Allow",
        "Sid": "S3Replicate"
      },
      {
        "Action": [
          "s3:PutObject",
          "s3:GetObject"
        ],
        "Resource": "arn:aws:s3:::ck-tuner-275595855473/CKTunerTestFile",
        "Effect": "Allow",
        "Sid": "S3ReplicationCheck"
      }
    ]
  }
  const secondDataEight="S3CrossAccountReplication";
  return (
    <div>
        <h1>Add Customer Managed Policies</h1>
        <p>Create an Inline policy for the role by following these steps</p>
      <div className="main">
        <p>
          <span className="step-number">1</span> Go to the <a>Create Policy</a> page.
        </p>
        <p>
          <span className="step-number">2</span> Click on the <b>JSON</b> tab and paste the following
          policy and click on Next:
        </p>
        <CodeBox code={JSON.stringify(secondData, null, 2)} />
        <p><span className="step-number">3</span> In the <b>Name</b> field, enter below-mentioned policy name and click on Create Policy</p>
        <CodeBoxSmall code={secondDataTwo}/>
        <p><span className="step-number">4</span> Again, go to the <a href="#">Create Policy</a> Page.</p>
        <p><span className="step-number">5</span> Click on the <b>JSON</b> tab and paste the following policy and click on Next:</p>
        <CodeBox code={JSON.stringify(secondDataThree,null,2)}/>
        <p><span className="step-number">6</span> In the <b>Name</b> field, enter below-mentioned policy name and click on Create Policy</p>
        <CodeBoxSmall code={secondDataFour}/>
        <p><span className="step-number">7</span> Again, go to the <a href="#">Create Policy</a> Page.</p>
        <p><span className="step-number">8</span> Click on the <b>JSON</b> tab and paste the following policy and click on Next:</p>
        <CodeBox code={JSON.stringify(secondDataFive,null,2)}/>
        <p><span className="step-number">9</span> In the <b>Name</b> field, enter below-mentioned policy name and click on Create Policy</p>
        <CodeBoxSmall code={secondDataSix}/>
        <p><span className="step-number">10</span> Go to the <a href="#">CK-Tuner-Role</a></p>
        <img src= {cktunerrole} alt="Ck-Tuner-Role-Image"/>
        <p><span className="step-number">11</span> In Permission policies, click on <b>Add permissions {`>`} Attach Policy</b></p>
        <img src={permissionpolicies} alt="Permission-Policies-Image" />
        <p><span className="step-number">12</span> Filter by Type {`>`} Customer managed then search for <b>cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, cktuner-TunerReadEssentials</b> and select them.</p>
        <img src={otherpermissionpolicies} />
        <p><span className="step-number">13</span> Now, click on <b>Add permissions</b></p>
        <p><span className="step-number">14</span> In Permission policies, click on <b>Add permissions {`>`} Create inline policy</b></p>
        <img src={permissionpoliciessecond} />
        <p><span className="step-number">15</span> Click on the JSON tab and paste the following policy</p>
        <CodeBox code={JSON.stringify(secondDataSeven,null,2)}/>
        <p><span className="step-number">16</span> Now, click on <b>Review policy</b></p>
        <p><span className="step-number">17</span> In the <b>Name</b> field, enter the below-mentioned policy name and click on <b>Create Policy</b></p>
        <CodeBoxSmall code={secondDataEight}/>
      </div>
    </div>
  );
};

export default OnboardingPagetwo;
