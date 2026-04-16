import type {
  ComplianceFramework,
  ComplianceViolation,
  ComplianceDepartment,
  ComplianceReport,
} from "@/types";

/* ------------------------------------------------------------------ */
/*  Overall score                                                       */
/* ------------------------------------------------------------------ */

export const overallComplianceScore = 72;

/* ------------------------------------------------------------------ */
/*  Summary counts                                                      */
/* ------------------------------------------------------------------ */

export const complianceSummary = {
  compliant: 12,
  atRisk: 5,
  critical: 2,
  totalChecks: 19,
};

/* ------------------------------------------------------------------ */
/*  Frameworks                                                          */
/* ------------------------------------------------------------------ */

export const complianceFrameworks: ComplianceFramework[] = [
  {
    id: "fw-gdpr",
    name: "General Data Protection Regulation",
    shortName: "GDPR",
    score: 85,
    status: "compliant",
    lastScanned: "2026-02-25T09:30:00Z",
    violationsCount: 1,
    description:
      "EU regulation on data protection and privacy for individuals within the European Union and the European Economic Area.",
  },
  {
    id: "fw-pta",
    name: "Pakistan Telecom Authority",
    shortName: "PTA",
    score: 68,
    status: "at-risk",
    lastScanned: "2026-02-24T14:15:00Z",
    violationsCount: 3,
    description:
      "Regulatory authority for the telecommunications sector in Pakistan, enforcing data localization and VPN usage policies.",
  },
  {
    id: "fw-secp",
    name: "Securities & Exchange Commission of Pakistan",
    shortName: "SECP",
    score: 74,
    status: "at-risk",
    lastScanned: "2026-02-22T11:00:00Z",
    violationsCount: 2,
    description:
      "Regulates corporate entities, capital markets, and non-bank financial companies in Pakistan.",
  },
  {
    id: "fw-fbr",
    name: "Federal Board of Revenue",
    shortName: "FBR",
    score: 91,
    status: "compliant",
    lastScanned: "2026-02-26T08:45:00Z",
    violationsCount: 0,
    description:
      "Pakistan's apex tax collection body responsible for enforcement of fiscal laws including income tax, sales tax, and customs duties.",
  },
  {
    id: "fw-esg",
    name: "Environmental, Social & Governance",
    shortName: "ESG",
    score: 42,
    status: "critical",
    lastScanned: "2026-02-20T16:30:00Z",
    violationsCount: 6,
    description:
      "Framework evaluating corporate behaviour across environmental stewardship, social responsibility, and governance practices.",
  },
];

/* ------------------------------------------------------------------ */
/*  Violations                                                          */
/* ------------------------------------------------------------------ */

export const complianceViolations: ComplianceViolation[] = [
  {
    id: "vio-001",
    framework: "ESG",
    department: "Operations",
    severity: "critical",
    title: "Missing Scope 2 Emissions Reporting",
    description:
      "Annual Scope 2 greenhouse gas emissions have not been calculated or reported for the current fiscal year. Mandatory disclosure deadline is approaching in 45 days.",
    detectedAt: "2026-02-18T10:00:00Z",
    status: "open",
    recommendation:
      "Engage the sustainability team to compile electricity consumption records from all facilities and calculate indirect emissions using the market-based method per GHG Protocol.",
  },
  {
    id: "vio-002",
    framework: "ESG",
    department: "Operations",
    severity: "high",
    title: "Overdue Waste Management Audit",
    description:
      "The bi-annual industrial waste audit has not been conducted. Last audit was completed 14 months ago, exceeding the 6-month cycle requirement.",
    detectedAt: "2026-02-10T08:30:00Z",
    status: "in-review",
    recommendation:
      "Schedule an immediate third-party waste audit covering hazardous and non-hazardous streams. Update the waste manifest register and submit findings to the environmental compliance officer.",
  },
  {
    id: "vio-003",
    framework: "GDPR",
    department: "Data Handling",
    severity: "high",
    title: "Unsigned Data Processing Agreement with Vendor",
    description:
      "Cloud analytics vendor DataMetric Inc. is processing EU personal data without a signed Data Processing Agreement (DPA) as required by GDPR Article 28.",
    detectedAt: "2026-02-15T14:20:00Z",
    status: "open",
    recommendation:
      "Halt data transfers to DataMetric Inc. until a compliant DPA is executed. Review all sub-processor relationships and update the records of processing activities accordingly.",
  },
  {
    id: "vio-004",
    framework: "PTA",
    department: "IT & Security",
    severity: "medium",
    title: "Unapproved VPN Usage Detected",
    description:
      "Network monitoring has detected 23 instances of employees using non-approved VPN services that are restricted under PTA regulations.",
    detectedAt: "2026-02-20T09:45:00Z",
    status: "open",
    recommendation:
      "Block unapproved VPN endpoints at the firewall level. Issue a company-wide policy reminder about approved VPN providers and update the acceptable-use policy.",
  },
  {
    id: "vio-005",
    framework: "PTA",
    department: "Data Handling",
    severity: "critical",
    title: "Data Localization Requirement Breach",
    description:
      "Customer PII for Pakistani users is being stored on AWS eu-west-1 region servers, violating PTA data localization requirements mandating in-country storage.",
    detectedAt: "2026-02-12T11:10:00Z",
    status: "in-review",
    recommendation:
      "Migrate affected datasets to the AWS ap-south-1 or a Pakistan-based data centre. Implement data residency checks in the CI/CD pipeline to prevent future cross-border storage.",
  },
  {
    id: "vio-006",
    framework: "PTA",
    department: "IT & Security",
    severity: "low",
    title: "Expired PTA License Renewal Filing",
    description:
      "Annual telecom service license renewal paperwork was submitted 3 days past the deadline. A grace period has been granted but late fees may apply.",
    detectedAt: "2026-02-08T16:00:00Z",
    status: "resolved",
    recommendation:
      "Set up automated renewal reminders 60 and 30 days before expiry. Assign a dedicated regulatory liaison to track all PTA filing deadlines.",
  },
  {
    id: "vio-007",
    framework: "SECP",
    department: "Finance",
    severity: "high",
    title: "Beneficial Ownership Disclosure Gap",
    description:
      "The beneficial ownership register has not been updated to reflect the recent equity restructuring. SECP Section 123A requires disclosure within 15 days of any change.",
    detectedAt: "2026-02-22T13:00:00Z",
    status: "open",
    recommendation:
      "File the updated Form 45 with SECP immediately reflecting the new shareholding structure. Implement a quarterly review process for the beneficial ownership register.",
  },
  {
    id: "vio-008",
    framework: "SECP",
    department: "Finance",
    severity: "medium",
    title: "Incomplete Board Meeting Minutes",
    description:
      "Minutes for the January 2026 board meeting are missing the required director attendance record and resolution details as mandated by SECP corporate governance guidelines.",
    detectedAt: "2026-02-05T10:30:00Z",
    status: "resolved",
    recommendation:
      "Amend the January minutes to include full attendance logs and resolution wording. Adopt a standardised minute template that includes all SECP-required fields.",
  },
];

/* ------------------------------------------------------------------ */
/*  Departments                                                         */
/* ------------------------------------------------------------------ */

export const complianceDepartments: ComplianceDepartment[] = [
  {
    id: "dept-hr",
    name: "HR",
    score: 78,
    status: "compliant",
    lastScanned: "2026-02-25T09:00:00Z",
    violationsCount: 0,
    categories: ["Employment Law", "Diversity & Inclusion", "Health & Safety"],
  },
  {
    id: "dept-finance",
    name: "Finance",
    score: 65,
    status: "at-risk",
    lastScanned: "2026-02-24T10:30:00Z",
    violationsCount: 2,
    categories: [
      "Tax Compliance",
      "Financial Reporting",
      "Anti-Money Laundering",
    ],
  },
  {
    id: "dept-data",
    name: "Data Handling",
    score: 58,
    status: "at-risk",
    lastScanned: "2026-02-23T14:00:00Z",
    violationsCount: 2,
    categories: ["Data Privacy", "Data Localization", "Consent Management"],
  },
  {
    id: "dept-it",
    name: "IT & Security",
    score: 82,
    status: "compliant",
    lastScanned: "2026-02-26T08:00:00Z",
    violationsCount: 2,
    categories: ["Network Security", "Access Control", "Incident Response"],
  },
  {
    id: "dept-ops",
    name: "Operations",
    score: 44,
    status: "critical",
    lastScanned: "2026-02-20T16:00:00Z",
    violationsCount: 2,
    categories: [
      "Environmental Compliance",
      "Supply Chain",
      "Waste Management",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Score history (6 months)                                            */
/* ------------------------------------------------------------------ */

export const complianceScoreHistory: { month: string; score: number }[] = [
  { month: "Sep", score: 58 },
  { month: "Oct", score: 61 },
  { month: "Nov", score: 64 },
  { month: "Dec", score: 66 },
  { month: "Jan", score: 69 },
  { month: "Feb", score: 72 },
];

/* ------------------------------------------------------------------ */
/*  Reports                                                             */
/* ------------------------------------------------------------------ */

export const complianceReports: ComplianceReport[] = [
  {
    id: "rpt-esg",
    name: "ESG Annual Report",
    type: "esg",
    framework: "ESG",
    lastGenerated: "2026-02-15T10:00:00Z",
    status: "ready",
    fileSize: "2.4 MB",
  },
  {
    id: "rpt-privacy",
    name: "Data Privacy Assessment",
    type: "data-privacy",
    framework: "GDPR",
    lastGenerated: "2026-02-20T09:00:00Z",
    status: "ready",
    fileSize: "1.8 MB",
  },
  {
    id: "rpt-financial",
    name: "Financial Compliance Report",
    type: "financial",
    framework: "FBR",
    lastGenerated: null,
    status: "not-generated",
  },
  {
    id: "rpt-pta",
    name: "PTA Regulatory Filing",
    type: "regulatory",
    framework: "PTA",
    lastGenerated: "2026-02-18T15:30:00Z",
    status: "ready",
    fileSize: "980 KB",
  },
  {
    id: "rpt-q1",
    name: "Q1 Combined Audit Report",
    type: "regulatory",
    framework: "All",
    lastGenerated: null,
    status: "not-generated",
  },
];

/* ------------------------------------------------------------------ */
/*  AI Recommendation                                                   */
/* ------------------------------------------------------------------ */

export const complianceAIRecommendation =
  "Your overall compliance score has improved from 58 to 72 over the past six months, reflecting meaningful progress across most regulatory frameworks. However, the ESG framework remains the highest-priority area with a score of 42 and six open violations, including missing Scope 2 emissions reporting and an overdue waste management audit. Addressing these two items alone could raise the overall score by an estimated 8-10 points. Additionally, the PTA framework carries a risk of monetary penalties: the data localization breach (customer PII stored outside Pakistan) should be remediated within the next 30 days to avoid potential fines of up to PKR 50 million. The Operations department warrants an immediate full-scope compliance scan, as its score of 44 is the lowest across all departments and directly impacts both ESG and supply-chain reporting obligations.";
