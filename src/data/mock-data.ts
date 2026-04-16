import type {
  TimeRange,
  ReportType,
  RevenueDataPoint,
  RevenueBarDataPoint,
  DonutDataPoint,
  FunnelStage,
  RepPerformance,
  CampaignRow,
  AtRiskAccount,
  TimelineEvent,
} from "@/types";

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */

function sliceByRange<T>(data: T[], range: TimeRange): T[] {
  if (range === "3m") return data.slice(-3);
  if (range === "6m") return data.slice(-6);
  return data;
}

/* ------------------------------------------------------------------ */
/*  1. Revenue Line Chart Data                                         */
/* ------------------------------------------------------------------ */

const revenueLineAll: RevenueDataPoint[] = [
  { month: "Mar", revenue: 182000 },
  { month: "Apr", revenue: 195000 },
  { month: "May", revenue: 210000 },
  { month: "Jun", revenue: 218000 },
  { month: "Jul", revenue: 228000 },
  { month: "Aug", revenue: 245000 },
  { month: "Sep", revenue: 252000 },
  { month: "Oct", revenue: 265000 },
  { month: "Nov", revenue: 278000 },
  { month: "Dec", revenue: 290000 },
  { month: "Jan", revenue: 305000 },
  { month: "Feb", revenue: 320000 },
];

export function getRevenueLineData(range: TimeRange): RevenueDataPoint[] {
  return sliceByRange(revenueLineAll, range);
}

/* ------------------------------------------------------------------ */
/*  2. Revenue Bar Chart Data (new vs churned)                         */
/* ------------------------------------------------------------------ */

const revenueBarAll: RevenueBarDataPoint[] = [
  { month: "Mar", newRevenue: 42000, churnedRevenue: 14000 },
  { month: "Apr", newRevenue: 48000, churnedRevenue: 10000 },
  { month: "May", newRevenue: 52000, churnedRevenue: 12000 },
  { month: "Jun", newRevenue: 55000, churnedRevenue: 9000 },
  { month: "Jul", newRevenue: 58000, churnedRevenue: 11000 },
  { month: "Aug", newRevenue: 62000, churnedRevenue: 8000 },
  { month: "Sep", newRevenue: 65000, churnedRevenue: 13000 },
  { month: "Oct", newRevenue: 68000, churnedRevenue: 10000 },
  { month: "Nov", newRevenue: 72000, churnedRevenue: 9000 },
  { month: "Dec", newRevenue: 78000, churnedRevenue: 11000 },
  { month: "Jan", newRevenue: 82000, churnedRevenue: 8000 },
  { month: "Feb", newRevenue: 88000, churnedRevenue: 10000 },
];

export function getRevenueBarData(range: TimeRange): RevenueBarDataPoint[] {
  return sliceByRange(revenueBarAll, range);
}

/* ------------------------------------------------------------------ */
/*  3. Donut Chart Data                                                */
/* ------------------------------------------------------------------ */

export const donutData: DonutDataPoint[] = [
  { name: "Enterprise", value: 40 },
  { name: "Growth", value: 35 },
  { name: "Starter", value: 25 },
];

/* ------------------------------------------------------------------ */
/*  4. Board Report Metrics                                            */
/* ------------------------------------------------------------------ */

type MetricObj = {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "flat";
};

export function getBoardMetrics(range: TimeRange): MetricObj[] {
  const map: Record<TimeRange, MetricObj[]> = {
    "3m": [
      { label: "ARR", value: "$2.2M", change: 14, changeLabel: "QoQ", trend: "up" },
      { label: "Net Revenue Retention", value: "108%", change: 2, changeLabel: "QoQ", trend: "up" },
      { label: "Expansion Revenue", value: "$82K", change: 12, changeLabel: "QoQ", trend: "up" },
      { label: "Total Customers", value: "142", change: 8, changeLabel: "QoQ", trend: "up" },
    ],
    "6m": [
      { label: "ARR", value: "$2.4M", change: 18, changeLabel: "QoQ", trend: "up" },
      { label: "Net Revenue Retention", value: "112%", change: 4, changeLabel: "QoQ", trend: "up" },
      { label: "Expansion Revenue", value: "$164K", change: 18, changeLabel: "vs prior", trend: "up" },
      { label: "Total Customers", value: "156", change: 15, changeLabel: "vs prior", trend: "up" },
    ],
    "1y": [
      { label: "ARR", value: "$2.4M", change: 22, changeLabel: "YoY", trend: "up" },
      { label: "Net Revenue Retention", value: "115%", change: 6, changeLabel: "YoY", trend: "up" },
      { label: "Expansion Revenue", value: "$340K", change: 24, changeLabel: "YoY", trend: "up" },
      { label: "Total Customers", value: "168", change: 28, changeLabel: "YoY", trend: "up" },
    ],
  };
  return map[range];
}

/* ------------------------------------------------------------------ */
/*  5. Sales Report Metrics                                            */
/* ------------------------------------------------------------------ */

export function getSalesMetrics(range: TimeRange): MetricObj[] {
  const map: Record<TimeRange, MetricObj[]> = {
    "3m": [
      { label: "Pipeline Value", value: "$640K", change: 10, changeLabel: "QoQ", trend: "up" },
      { label: "Avg Deal Size", value: "$18.5K", change: 5, changeLabel: "QoQ", trend: "up" },
      { label: "Win Rate", value: "32%", change: 3, changeLabel: "QoQ", trend: "up" },
      { label: "Deal Velocity", value: "28 days", change: -8, changeLabel: "QoQ", trend: "up" },
    ],
    "6m": [
      { label: "Pipeline Value", value: "$890K", change: 16, changeLabel: "vs prior", trend: "up" },
      { label: "Avg Deal Size", value: "$21.2K", change: 8, changeLabel: "vs prior", trend: "up" },
      { label: "Win Rate", value: "34%", change: 5, changeLabel: "vs prior", trend: "up" },
      { label: "Deal Velocity", value: "32 days", change: -12, changeLabel: "vs prior", trend: "up" },
    ],
    "1y": [
      { label: "Pipeline Value", value: "$1.2M", change: 22, changeLabel: "YoY", trend: "up" },
      { label: "Avg Deal Size", value: "$23.4K", change: 12, changeLabel: "YoY", trend: "up" },
      { label: "Win Rate", value: "36%", change: 7, changeLabel: "YoY", trend: "up" },
      { label: "Deal Velocity", value: "35 days", change: -15, changeLabel: "YoY", trend: "up" },
    ],
  };
  return map[range];
}

/* ------------------------------------------------------------------ */
/*  6. Sales Funnel                                                    */
/* ------------------------------------------------------------------ */

export function getSalesFunnel(range: TimeRange): FunnelStage[] {
  const map: Record<TimeRange, FunnelStage[]> = {
    "3m": [
      { name: "Lead", value: 120, rate: 100 },
      { name: "Qualified", value: 84, rate: 70 },
      { name: "Proposal", value: 48, rate: 57 },
      { name: "Negotiation", value: 24, rate: 50 },
      { name: "Closed Won", value: 14, rate: 58 },
    ],
    "6m": [
      { name: "Lead", value: 240, rate: 100 },
      { name: "Qualified", value: 168, rate: 70 },
      { name: "Proposal", value: 98, rate: 58 },
      { name: "Negotiation", value: 52, rate: 53 },
      { name: "Closed Won", value: 32, rate: 62 },
    ],
    "1y": [
      { name: "Lead", value: 480, rate: 100 },
      { name: "Qualified", value: 336, rate: 70 },
      { name: "Proposal", value: 194, rate: 58 },
      { name: "Negotiation", value: 106, rate: 55 },
      { name: "Closed Won", value: 68, rate: 64 },
    ],
  };
  return map[range];
}

/* ------------------------------------------------------------------ */
/*  7. Rep Performance                                                 */
/* ------------------------------------------------------------------ */

export function getRepPerformance(): RepPerformance[] {
  return [
    { name: "Mike Ross", deals: 12, pipeline: 213000, winRate: 42, avgDealSize: 17800, velocity: 26 },
    { name: "Sarah Chen", deals: 10, pipeline: 149000, winRate: 38, avgDealSize: 14900, velocity: 31 },
    { name: "James Wilson", deals: 8, pipeline: 186000, winRate: 35, avgDealSize: 23300, velocity: 28 },
    { name: "Emily Park", deals: 11, pipeline: 167000, winRate: 40, avgDealSize: 15200, velocity: 24 },
    { name: "Alex Kumar", deals: 7, pipeline: 124000, winRate: 33, avgDealSize: 17700, velocity: 34 },
  ];
}

/* ------------------------------------------------------------------ */
/*  8. Marketing Metrics                                               */
/* ------------------------------------------------------------------ */

export function getMarketingMetrics(range: TimeRange): MetricObj[] {
  const map: Record<TimeRange, MetricObj[]> = {
    "3m": [
      { label: "Total Leads", value: "340", change: 12, changeLabel: "QoQ", trend: "up" },
      { label: "CAC", value: "$285", change: -6, changeLabel: "QoQ", trend: "up" },
      { label: "LTV", value: "$14.2K", change: 10, changeLabel: "QoQ", trend: "up" },
      { label: "LTV:CAC Ratio", value: "4.2x", change: 8, changeLabel: "QoQ", trend: "up" },
    ],
    "6m": [
      { label: "Total Leads", value: "720", change: 18, changeLabel: "vs prior", trend: "up" },
      { label: "CAC", value: "$310", change: -4, changeLabel: "vs prior", trend: "up" },
      { label: "LTV", value: "$15.8K", change: 14, changeLabel: "vs prior", trend: "up" },
      { label: "LTV:CAC Ratio", value: "4.6x", change: 12, changeLabel: "vs prior", trend: "up" },
    ],
    "1y": [
      { label: "Total Leads", value: "1,480", change: 24, changeLabel: "YoY", trend: "up" },
      { label: "CAC", value: "$340", change: -8, changeLabel: "YoY", trend: "up" },
      { label: "LTV", value: "$16.4K", change: 18, changeLabel: "YoY", trend: "up" },
      { label: "LTV:CAC Ratio", value: "4.8x", change: 15, changeLabel: "YoY", trend: "up" },
    ],
  };
  return map[range];
}

/* ------------------------------------------------------------------ */
/*  9. Channel Performance                                             */
/* ------------------------------------------------------------------ */

export function getChannelPerformance(
  range: TimeRange,
): { channel: string; leads: number; spend: number }[] {
  const map: Record<TimeRange, { channel: string; leads: number; spend: number }[]> = {
    "3m": [
      { channel: "Organic", leads: 120, spend: 0 },
      { channel: "Paid", leads: 95, spend: 28000 },
      { channel: "Referral", leads: 65, spend: 0 },
      { channel: "Email", leads: 60, spend: 4000 },
    ],
    "6m": [
      { channel: "Organic", leads: 250, spend: 0 },
      { channel: "Paid", leads: 200, spend: 58000 },
      { channel: "Referral", leads: 140, spend: 0 },
      { channel: "Email", leads: 130, spend: 8000 },
    ],
    "1y": [
      { channel: "Organic", leads: 520, spend: 0 },
      { channel: "Paid", leads: 420, spend: 120000 },
      { channel: "Referral", leads: 290, spend: 0 },
      { channel: "Email", leads: 250, spend: 16000 },
    ],
  };
  return map[range];
}

/* ------------------------------------------------------------------ */
/*  10. Marketing Funnel                                               */
/* ------------------------------------------------------------------ */

export function getMarketingFunnel(range: TimeRange): FunnelStage[] {
  const map: Record<TimeRange, FunnelStage[]> = {
    "3m": [
      { name: "Lead", value: 340, rate: 100 },
      { name: "MQL", value: 204, rate: 60 },
      { name: "SQL", value: 102, rate: 50 },
      { name: "Customer", value: 34, rate: 33 },
    ],
    "6m": [
      { name: "Lead", value: 720, rate: 100 },
      { name: "MQL", value: 432, rate: 60 },
      { name: "SQL", value: 216, rate: 50 },
      { name: "Customer", value: 72, rate: 33 },
    ],
    "1y": [
      { name: "Lead", value: 1480, rate: 100 },
      { name: "MQL", value: 888, rate: 60 },
      { name: "SQL", value: 444, rate: 50 },
      { name: "Customer", value: 148, rate: 33 },
    ],
  };
  return map[range];
}

/* ------------------------------------------------------------------ */
/*  11. Campaign ROI                                                   */
/* ------------------------------------------------------------------ */

export function getCampaignROI(): CampaignRow[] {
  return [
    { name: "Spring SaaS Summit", channel: "Events", spend: 12000, leads: 85, conversions: 12, roi: 340 },
    { name: "LinkedIn ABM Q4", channel: "Paid Social", spend: 8500, leads: 120, conversions: 18, roi: 420 },
    { name: "RevOps Playbook Guide", channel: "Content", spend: 2100, leads: 340, conversions: 28, roi: 890 },
    { name: "Google Ads Brand", channel: "Paid Search", spend: 15000, leads: 95, conversions: 8, roi: 180 },
    { name: "Customer Referral v2", channel: "Referral", spend: 1500, leads: 65, conversions: 22, roi: 1200 },
    { name: "Email Nurture Series", channel: "Email", spend: 800, leads: 180, conversions: 15, roi: 650 },
  ];
}

/* ------------------------------------------------------------------ */
/*  12. Churn Metrics                                                  */
/* ------------------------------------------------------------------ */

export function getChurnMetrics(range: TimeRange): MetricObj[] {
  const map: Record<TimeRange, MetricObj[]> = {
    "3m": [
      { label: "Churn Rate", value: "3.8%", change: -4, changeLabel: "QoQ", trend: "up" },
      { label: "Revenue Churn", value: "$18K", change: -8, changeLabel: "QoQ", trend: "up" },
      { label: "Accounts Saved", value: "8", change: 25, changeLabel: "QoQ", trend: "up" },
      { label: "Net Retention", value: "108%", change: 2, changeLabel: "QoQ", trend: "up" },
    ],
    "6m": [
      { label: "Churn Rate", value: "3.2%", change: -12, changeLabel: "vs prior", trend: "up" },
      { label: "Revenue Churn", value: "$32K", change: -15, changeLabel: "vs prior", trend: "up" },
      { label: "Accounts Saved", value: "18", change: 38, changeLabel: "vs prior", trend: "up" },
      { label: "Net Retention", value: "112%", change: 4, changeLabel: "vs prior", trend: "up" },
    ],
    "1y": [
      { label: "Churn Rate", value: "2.8%", change: -22, changeLabel: "YoY", trend: "up" },
      { label: "Revenue Churn", value: "$54K", change: -20, changeLabel: "YoY", trend: "up" },
      { label: "Accounts Saved", value: "34", change: 42, changeLabel: "YoY", trend: "up" },
      { label: "Net Retention", value: "115%", change: 6, changeLabel: "YoY", trend: "up" },
    ],
  };
  return map[range];
}

/* ------------------------------------------------------------------ */
/*  13. Churn Trend Data                                               */
/* ------------------------------------------------------------------ */

const churnTrendAll: RevenueDataPoint[] = [
  { month: "Mar", revenue: 4.8 },
  { month: "Apr", revenue: 4.5 },
  { month: "May", revenue: 4.2 },
  { month: "Jun", revenue: 4.1 },
  { month: "Jul", revenue: 3.9 },
  { month: "Aug", revenue: 3.8 },
  { month: "Sep", revenue: 3.6 },
  { month: "Oct", revenue: 3.5 },
  { month: "Nov", revenue: 3.4 },
  { month: "Dec", revenue: 3.2 },
  { month: "Jan", revenue: 3.0 },
  { month: "Feb", revenue: 2.8 },
];

export function getChurnTrendData(range: TimeRange): RevenueDataPoint[] {
  return sliceByRange(churnTrendAll, range);
}

/* ------------------------------------------------------------------ */
/*  14. At-Risk Accounts                                               */
/* ------------------------------------------------------------------ */

export function getAtRiskAccounts(): AtRiskAccount[] {
  return [
    { name: "DataSync Ltd", healthScore: 32, mrr: 4200, riskFactor: "Declining usage", daysSinceActivity: 14 },
    { name: "CloudOps Inc", healthScore: 38, mrr: 3800, riskFactor: "Support tickets", daysSinceActivity: 21 },
    { name: "NetFlow Systems", healthScore: 42, mrr: 2900, riskFactor: "Late payments", daysSinceActivity: 8 },
    { name: "BrightStar AI", healthScore: 45, mrr: 5100, riskFactor: "Low engagement", daysSinceActivity: 18 },
    { name: "Apex Analytics", healthScore: 48, mrr: 3200, riskFactor: "Competitor eval", daysSinceActivity: 12 },
    { name: "PulseData Co", healthScore: 51, mrr: 2600, riskFactor: "Contract dispute", daysSinceActivity: 25 },
  ];
}

/* ------------------------------------------------------------------ */
/*  15. AI Insight Text                                                */
/* ------------------------------------------------------------------ */

const insightMap: Record<ReportType, Record<TimeRange, string>> = {
  board: {
    "3m":
      "ARR grew 14% this quarter to $2.2M, with the Growth tier driving the majority of new expansion. Net retention at 108% signals strong upsell momentum across the base. Prioritize onboarding acceleration to convert the 8% customer growth into faster expansion revenue.",
    "6m":
      "Revenue grew 18% quarter-over-quarter, driven primarily by expansion in the Growth tier which added $164K in expansion revenue. Net retention of 112% indicates strong product-market fit with existing customers generating more revenue over time. Consider increasing investment in customer success to maintain this trajectory.",
    "1y":
      "Annual recurring revenue reached $2.4M with 22% year-over-year growth, adding 168 total customers. Net retention of 115% demonstrates compounding expansion revenue that now accounts for 34% of total growth. The board should consider raising the FY27 target given the consistent outperformance across all four quarters.",
  },
  sales: {
    "3m":
      "Pipeline value reached $640K this quarter with a 32% win rate and 28-day average deal velocity. Emily Park posted the fastest close times at 24 days, while Mike Ross leads on total pipeline at $213K. Three deals in the Negotiation stage have stalled beyond 15 days and should be escalated.",
    "6m":
      "Pipeline velocity improved by 12% this period, with the average deal closing in 32 days compared to 36 previously. Mike Ross continues to lead with $213K in active pipeline and a 42% win rate. Focus areas: 3 deals in Negotiation stage have been stalled for 15+ days — recommend escalating these to leadership.",
    "1y":
      "Full-year pipeline topped $1.2M with a 22% increase in deal flow and win rates climbing to 36%. Average deal size grew 12% to $23.4K, reflecting a successful move upmarket into mid-size accounts. Investing in a dedicated deal desk could further reduce the 35-day cycle by standardizing proposal and negotiation workflows.",
  },
  marketing: {
    "3m":
      "Total leads reached 340 this quarter with CAC dropping 6% to $285, well below the $350 industry benchmark. The content channel continues to outperform — the RevOps Playbook Guide alone generated 340 leads at an 890% ROI. Recommend shifting 15% of paid budget to content production.",
    "6m":
      "The RevOps Playbook Guide campaign delivered the highest ROI at 890% on just $2.1K spend, generating 340 qualified leads through organic search. LTV:CAC ratio of 4.6x is above the 3x SaaS benchmark, indicating efficient customer acquisition. Recommendation: increase content marketing budget by 40% given the outsized returns.",
    "1y":
      "Annual lead generation hit 1,480 with LTV:CAC ratio reaching 4.8x, significantly above the SaaS benchmark of 3x. Customer Referral v2 delivered 1,200% ROI, making it the most efficient channel at scale. The annual data supports doubling down on referral incentives and content-led growth as primary GTM motions for FY27.",
  },
  churn: {
    "3m":
      "Quarterly churn rate held at 3.8% with 8 accounts saved through proactive outreach. DataSync Ltd remains the highest-risk account with a health score of 32 and 14 days of inactivity. Activating the automated re-engagement playbook for accounts below health score 50 could prevent an estimated $12K in monthly churn.",
    "6m":
      "Churn decreased from 4.1% to 3.2% over the past 6 months, saving approximately $32K in monthly recurring revenue. DataSync Ltd (health score: 32) represents the highest churn risk with declining usage over 60 days. The Churn Prevention playbook has saved 18 accounts this period — recommend activating it for all accounts below health score 50.",
    "1y":
      "Annual churn fell from 4.8% to 2.8%, a 42% improvement that preserved an estimated $54K in MRR. The churn prevention playbook saved 34 accounts over the year, generating an estimated $180K in retained annual revenue. For FY27, expanding the customer health scoring model to include product usage depth could reduce churn below the 2% target.",
  },
};

export function getAIInsight(report: ReportType, range: TimeRange): string {
  return insightMap[report][range];
}

/* ------------------------------------------------------------------ */
/*  16. Customer Map                                                   */
/* ------------------------------------------------------------------ */

export const customersMap: Record<
  string,
  {
    name: string;
    email: string;
    company: string;
    mrr: number;
    healthScore: number;
    status: "healthy" | "at-risk" | "critical";
    joinedAt: string;
    events: TimelineEvent[];
  }
> = {
  "cust-001": {
    name: "Sarah Chen",
    email: "sarah@acmecorp.com",
    company: "Acme Corp",
    mrr: 8400,
    healthScore: 92,
    status: "healthy",
    joinedAt: "2024-03-15",
    events: [
      {
        id: "evt-001",
        type: "deal",
        title: "Renewal closed",
        description: "Annual contract renewed for $100,800 — 12% uplift from previous term.",
        timestamp: "2 hours ago",
        source: "Salesforce",
      },
      {
        id: "evt-002",
        type: "payment",
        title: "Invoice paid",
        description: "Invoice #INV-4821 for $8,400 processed successfully.",
        timestamp: "3 days ago",
        source: "Stripe",
      },
      {
        id: "evt-003",
        type: "meeting",
        title: "QBR completed",
        description: "Quarterly business review held with VP of Ops — expansion discussed.",
        timestamp: "1 week ago",
        source: "Google Calendar",
      },
      {
        id: "evt-004",
        type: "email",
        title: "Feature request submitted",
        description: "Requested custom dashboard widgets for executive reporting.",
        timestamp: "2 weeks ago",
        source: "HubSpot",
      },
      {
        id: "evt-005",
        type: "support",
        title: "Ticket resolved",
        description: "SSO configuration issue resolved within 4 hours — CSAT 5/5.",
        timestamp: "3 weeks ago",
        source: "Intercom",
      },
    ],
  },
  "cust-002": {
    name: "James Wilson",
    email: "james@techflow.io",
    company: "TechFlow Inc",
    mrr: 12800,
    healthScore: 78,
    status: "healthy",
    joinedAt: "2024-01-20",
    events: [
      {
        id: "evt-006",
        type: "payment",
        title: "Invoice paid",
        description: "Invoice #INV-5102 for $12,800 processed successfully.",
        timestamp: "1 day ago",
        source: "Stripe",
      },
      {
        id: "evt-007",
        type: "deal",
        title: "Upsell opportunity created",
        description: "New opportunity for Analytics Add-on — estimated $3,200/mo.",
        timestamp: "5 days ago",
        source: "Salesforce",
      },
      {
        id: "evt-008",
        type: "email",
        title: "Onboarding check-in sent",
        description: "30-day onboarding check-in email sent to stakeholders.",
        timestamp: "1 week ago",
        source: "HubSpot",
      },
      {
        id: "evt-009",
        type: "meeting",
        title: "Technical deep-dive",
        description: "API integration workshop with engineering team completed.",
        timestamp: "2 weeks ago",
        source: "Google Calendar",
      },
    ],
  },
  "cust-003": {
    name: "Maria Garcia",
    email: "maria@datasync.co",
    company: "DataSync Ltd",
    mrr: 4200,
    healthScore: 32,
    status: "critical",
    joinedAt: "2023-11-08",
    events: [
      {
        id: "evt-010",
        type: "support",
        title: "Escalation opened",
        description: "Critical ticket #TK-892 escalated — data export failures reported.",
        timestamp: "6 hours ago",
        source: "Intercom",
      },
      {
        id: "evt-011",
        type: "email",
        title: "Churn risk alert triggered",
        description: "Automated alert: usage dropped 60% over the last 30 days.",
        timestamp: "2 days ago",
        source: "HubSpot",
      },
      {
        id: "evt-012",
        type: "meeting",
        title: "Rescue call scheduled",
        description: "Executive sponsor call scheduled with VP of Customer Success.",
        timestamp: "4 days ago",
        source: "Google Calendar",
      },
      {
        id: "evt-013",
        type: "payment",
        title: "Payment overdue",
        description: "Invoice #INV-4650 for $4,200 is 12 days past due.",
        timestamp: "2 weeks ago",
        source: "Stripe",
      },
    ],
  },
  "cust-004": {
    name: "David Kim",
    email: "david@cloudops.com",
    company: "CloudOps Inc",
    mrr: 3800,
    healthScore: 38,
    status: "at-risk",
    joinedAt: "2024-06-12",
    events: [
      {
        id: "evt-014",
        type: "support",
        title: "Multiple tickets opened",
        description: "3 support tickets opened in the last week — integration sync issues.",
        timestamp: "1 day ago",
        source: "Intercom",
      },
      {
        id: "evt-015",
        type: "email",
        title: "NPS survey response",
        description: "NPS score of 4 received — detractor classification triggered.",
        timestamp: "5 days ago",
        source: "HubSpot",
      },
      {
        id: "evt-016",
        type: "meeting",
        title: "Success plan review",
        description: "Account review meeting held — identified 3 blockers to adoption.",
        timestamp: "1 week ago",
        source: "Google Calendar",
      },
    ],
  },
  "cust-005": {
    name: "Lisa Chen",
    email: "lisa@novadigital.com",
    company: "Nova Digital",
    mrr: 6200,
    healthScore: 85,
    status: "healthy",
    joinedAt: "2024-02-28",
    events: [
      {
        id: "evt-017",
        type: "deal",
        title: "Expansion deal signed",
        description: "Added 15 seats — MRR increased from $4,800 to $6,200.",
        timestamp: "3 hours ago",
        source: "Salesforce",
      },
      {
        id: "evt-018",
        type: "payment",
        title: "Invoice paid",
        description: "Invoice #INV-5210 for $6,200 processed successfully.",
        timestamp: "4 days ago",
        source: "Stripe",
      },
      {
        id: "evt-019",
        type: "email",
        title: "Case study request",
        description: "Customer agreed to participate in a joint case study.",
        timestamp: "1 week ago",
        source: "HubSpot",
      },
      {
        id: "evt-020",
        type: "support",
        title: "Feature walkthrough",
        description: "Completed guided walkthrough of new reporting module — positive feedback.",
        timestamp: "2 weeks ago",
        source: "Intercom",
      },
    ],
  },
  "cust-006": {
    name: "Tom Martinez",
    email: "tom@pulseanalytics.io",
    company: "Pulse Analytics",
    mrr: 5600,
    healthScore: 71,
    status: "healthy",
    joinedAt: "2024-04-10",
    events: [
      {
        id: "evt-021",
        type: "meeting",
        title: "Mid-cycle check-in",
        description: "Bi-weekly sync completed — roadmap feedback captured.",
        timestamp: "1 day ago",
        source: "Google Calendar",
      },
      {
        id: "evt-022",
        type: "payment",
        title: "Invoice paid",
        description: "Invoice #INV-5088 for $5,600 processed successfully.",
        timestamp: "6 days ago",
        source: "Stripe",
      },
      {
        id: "evt-023",
        type: "email",
        title: "Product update shared",
        description: "Monthly product changelog email opened and clicked through.",
        timestamp: "1 week ago",
        source: "HubSpot",
      },
    ],
  },
};
