const responses: Record<string, string> = {
  churn:
    "Based on analysis of your customer data, churn risk has decreased by 22% over the past quarter. DataSync Ltd (health score: 32) and CloudOps Inc (health score: 38) are your highest-risk accounts — both show declining product usage over 60 days and have unresolved support tickets. I recommend activating the Churn Prevention playbook for all accounts with health scores below 50, which historically saves 73% of at-risk accounts when triggered early.",

  pipeline:
    "Your current pipeline contains $890K across 42 active deals. The strongest stage is Proposal with $186K from 8 deals, and your average deal velocity is 32 days (down from 36 last quarter — a 12% improvement). Three deals in Negotiation have been stalled for 15+ days: NetBridge ($120K), DataCore ($48K), and Apex Labs ($36K). I recommend scheduling executive-level calls this week to accelerate these deals before quarter-end.",

  campaign:
    "Your top-performing campaign this quarter is the RevOps Playbook Guide, generating 340 leads at an 890% ROI on just $2.1K in spend. Paid channels are delivering diminishing returns — LinkedIn ABM cost per lead increased 18% while conversion rates dropped 5%. I recommend shifting 30% of the paid social budget to content marketing and doubling down on the organic strategies that are driving 2.4x better conversion rates.",

  forecast:
    "Based on current pipeline velocity and historical conversion rates, I project Q1 revenue of $680K–$740K (87% confidence). Key upside scenario: if the NetBridge $120K deal closes this month, we hit $760K. Key risk: 3 enterprise renewals worth $94K combined are due next month with health scores below 60. MRR growth trend projects $340K MRR by June if current trajectory holds, representing 18% growth from today's $288K.",

  revenue:
    "Revenue performance shows strong momentum — ARR grew 18% QoQ to $2.4M. The Growth tier is your fastest-growing segment, adding 12 new accounts worth $86K in new MRR this quarter. Net Revenue Retention of 112% means existing customers are generating 12% more revenue year-over-year through expansion. One concern: average expansion deal size dropped 8% — consider revisiting your upsell pricing tiers to capture more value.",

  customer:
    "Your customer portfolio has 168 active accounts with a weighted average health score of 74/100. The healthiest segment is Enterprise (avg health: 88) while Starter accounts average 62. Customer satisfaction correlates strongly with onboarding completion — accounts that finish onboarding within 14 days have 3.2x higher retention rates. Six accounts are currently flagged as critical (health < 50), representing $24K in monthly at-risk revenue.",

  deal:
    "Active deal analysis shows 42 opportunities across 5 pipeline stages. Your highest-value opportunity is the TechBridge enterprise deal at $120K (currently in Negotiation, day 8). Win probability analysis: deals with health scores above 75 close at 2.1x the rate of those below 50. Three deals moved backward in stage this week — Apex Labs (Proposal → Qualified), which historically indicates a 40% drop in close probability.",

  playbook:
    "Your automated playbooks executed 82 times this month across 3 active workflows. The Churn Prevention playbook has the highest impact — saving 18 accounts worth $48K in MRR over the past 6 months (73% save rate). The Expansion Opportunity playbook triggered 23 times and generated $62K in upsell pipeline. I recommend creating a new playbook for 'Stalled Deal Revival' — 14 deals have been inactive for 14+ days, representing $186K in stuck pipeline.",
};

const defaultResponse =
  "I've analyzed your RevOps data across pipeline, revenue, and customer health metrics. Your overall revenue trajectory is positive with 18% QoQ growth, though there are 6 accounts requiring immediate attention due to declining health scores. Pipeline velocity improved 12% this quarter, and your marketing campaigns are delivering an average 4.6x LTV:CAC ratio. Would you like me to dive deeper into any specific area — churn risk, pipeline health, campaign performance, or revenue forecasting?";

const keywords: [string[], string][] = [
  [["churn", "retention", "at-risk", "health score", "cancel"], "churn"],
  [["pipeline", "deal", "stage", "kanban", "negotiation", "proposal", "qualified"], "pipeline"],
  [["campaign", "marketing", "leads", "cac", "ltv", "acquisition", "roi"], "campaign"],
  [["forecast", "predict", "project", "next quarter", "future", "trend"], "forecast"],
  [["revenue", "arr", "mrr", "growth", "recurring", "expansion"], "revenue"],
  [["customer", "account", "portfolio", "segment", "onboarding"], "customer"],
  [["deal", "opportunity", "close", "win rate", "probability"], "deal"],
  [["playbook", "automat", "workflow", "trigger", "sequence"], "playbook"],
];

export function getResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  for (const [keys, topic] of keywords) {
    if (keys.some((k) => lower.includes(k))) {
      return responses[topic] ?? defaultResponse;
    }
  }
  return defaultResponse;
}
