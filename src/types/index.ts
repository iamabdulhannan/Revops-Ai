export type Metric = {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "flat";
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  mrr: number;
  healthScore: number;
  status: "healthy" | "at-risk" | "critical";
  lastActivity: string;
  joinedAt: string;
};

export type Deal = {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "closed-won" | "closed-lost";
  healthScore: number;
  assignee: string;
  lastActivity: string;
  daysInStage: number;
};

export type TimelineEvent = {
  id: string;
  type: "deal" | "payment" | "support" | "email" | "meeting" | "note";
  title: string;
  description: string;
  timestamp: string;
  source: string;
};

export type Integration = {
  id: string;
  name: string;
  description: string;
  category: "crm" | "billing" | "support" | "analytics" | "marketing" | "communication";
  connected: boolean;
  logo: string;
};

export type Playbook = {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  active: boolean;
  executions: number;
  lastRun: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

/* ------------------------------------------------------------------ */
/*  Reports & Analytics Types                                          */
/* ------------------------------------------------------------------ */

export type TimeRange = "3m" | "6m" | "1y";

export type ReportType = "board" | "sales" | "marketing" | "churn";

export type RevenueDataPoint = {
  month: string;
  revenue: number;
};

export type RevenueBarDataPoint = {
  month: string;
  newRevenue: number;
  churnedRevenue: number;
};

export type DonutDataPoint = {
  name: string;
  value: number;
};

export type FunnelStage = {
  name: string;
  value: number;
  rate: number;
};

export type RepPerformance = {
  [key: string]: unknown;
  name: string;
  deals: number;
  pipeline: number;
  winRate: number;
  avgDealSize: number;
  velocity: number;
};

export type CampaignRow = {
  [key: string]: unknown;
  name: string;
  channel: string;
  spend: number;
  leads: number;
  conversions: number;
  roi: number;
};

export type AtRiskAccount = {
  [key: string]: unknown;
  name: string;
  healthScore: number;
  mrr: number;
  riskFactor: string;
  daysSinceActivity: number;
};

/* ------------------------------------------------------------------ */
/*  Compliance Types                                                    */
/* ------------------------------------------------------------------ */

export type ComplianceStatus = "compliant" | "at-risk" | "critical";

export type ComplianceFramework = {
  id: string;
  name: string;
  shortName: string;
  score: number;
  status: ComplianceStatus;
  lastScanned: string;
  violationsCount: number;
  description: string;
};

export type ComplianceViolation = {
  id: string;
  framework: string;
  department: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  detectedAt: string;
  status: "open" | "in-review" | "resolved";
  recommendation: string;
};

export type ComplianceDepartment = {
  id: string;
  name: string;
  score: number;
  status: ComplianceStatus;
  lastScanned: string;
  violationsCount: number;
  categories: string[];
};

export type ComplianceReport = {
  id: string;
  name: string;
  type: "esg" | "data-privacy" | "financial" | "regulatory";
  framework: string;
  lastGenerated: string | null;
  status: "ready" | "generating" | "not-generated";
  fileSize?: string;
};

/* ------------------------------------------------------------------ */
/*  CSV Import Types                                                    */
/* ------------------------------------------------------------------ */

export type CSVColumnDef = {
  key: string;
  label: string;
  required: boolean;
  example: string;
};
