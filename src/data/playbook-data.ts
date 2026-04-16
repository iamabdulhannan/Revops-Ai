import type { TimelineEvent } from "@/types";

export type PlaybookStep = {
  id: string;
  order: number;
  type: "trigger" | "condition" | "action" | "delay";
  label: string;
  description: string;
  config: Record<string, string | number | boolean>;
};

export type PlaybookExecution = {
  id: string;
  customerName: string;
  triggeredAt: string;
  status: "completed" | "in-progress" | "failed";
  stepsCompleted: number;
  totalSteps: number;
  outcome?: string;
};

export type PlaybookDetail = {
  id: string;
  name: string;
  description: string;
  trigger: string;
  active: boolean;
  executions: number;
  lastRun: string;
  successRate: number;
  avgTimeToComplete: string;
  accountsSaved: number;
  revenueProtected: number;
  steps: PlaybookStep[];
  recentExecutions: PlaybookExecution[];
};

export const playbookDetails: Record<string, PlaybookDetail> = {
  "1": {
    id: "1",
    name: "Churn Prevention",
    description:
      "Automatically triggers re-engagement sequences when a customer health score drops below 50.",
    trigger: "Health score < 50",
    active: true,
    executions: 47,
    lastRun: "2 hours ago",
    successRate: 73,
    avgTimeToComplete: "4.2 days",
    accountsSaved: 18,
    revenueProtected: 48000,
    steps: [
      {
        id: "s1",
        order: 1,
        type: "trigger",
        label: "Health Score Alert",
        description:
          "Triggered when customer health score drops below threshold",
        config: { threshold: 50 },
      },
      {
        id: "s2",
        order: 2,
        type: "condition",
        label: "Check Account Tier",
        description: "Route based on customer plan tier",
        config: { field: "plan_tier", operator: "equals" },
      },
      {
        id: "s3",
        order: 3,
        type: "action",
        label: "Alert CSM",
        description:
          "Send Slack notification to assigned Customer Success Manager",
        config: { channel: "cs-alerts", priority: "high" },
      },
      {
        id: "s4",
        order: 4,
        type: "delay",
        label: "Wait 24 Hours",
        description: "Allow time for CSM to take initial action",
        config: { duration: 24, unit: "hours" },
      },
      {
        id: "s5",
        order: 5,
        type: "action",
        label: "Schedule Check-in",
        description:
          "Auto-create calendar event for customer check-in call",
        config: { duration: 30, type: "video_call" },
      },
      {
        id: "s6",
        order: 6,
        type: "delay",
        label: "Wait 3 Days",
        description: "Monitor for improvement after outreach",
        config: { duration: 3, unit: "days" },
      },
      {
        id: "s7",
        order: 7,
        type: "action",
        label: "Trigger Email Sequence",
        description: "Send personalized re-engagement email series",
        config: { template: "churn_prevention_v2", emails: 3 },
      },
    ],
    recentExecutions: [
      {
        id: "e1",
        customerName: "DataSync Ltd",
        triggeredAt: "2 hours ago",
        status: "in-progress",
        stepsCompleted: 3,
        totalSteps: 7,
        outcome: undefined,
      },
      {
        id: "e2",
        customerName: "CloudOps Inc",
        triggeredAt: "1 day ago",
        status: "in-progress",
        stepsCompleted: 5,
        totalSteps: 7,
        outcome: undefined,
      },
      {
        id: "e3",
        customerName: "BrightStar AI",
        triggeredAt: "3 days ago",
        status: "completed",
        stepsCompleted: 7,
        totalSteps: 7,
        outcome: "Account saved — health score recovered to 68",
      },
      {
        id: "e4",
        customerName: "Apex Analytics",
        triggeredAt: "5 days ago",
        status: "completed",
        stepsCompleted: 7,
        totalSteps: 7,
        outcome: "Account saved — renewed for 12 months",
      },
      {
        id: "e5",
        customerName: "PulseData Co",
        triggeredAt: "1 week ago",
        status: "failed",
        stepsCompleted: 4,
        totalSteps: 7,
        outcome: "Customer churned — contract not renewed",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Expansion Opportunity",
    description:
      "Identifies accounts with high usage patterns and triggers upsell motions for the sales team.",
    trigger: "Usage > 80% of plan",
    active: true,
    executions: 23,
    lastRun: "1 day ago",
    successRate: 61,
    avgTimeToComplete: "8.5 days",
    accountsSaved: 0,
    revenueProtected: 62000,
    steps: [
      {
        id: "s1",
        order: 1,
        type: "trigger",
        label: "Usage Threshold",
        description:
          "Triggered when account usage exceeds 80% of plan limit",
        config: { threshold: 80 },
      },
      {
        id: "s2",
        order: 2,
        type: "action",
        label: "Notify Account Owner",
        description:
          "Send notification to assigned sales rep with usage data",
        config: { channel: "sales-alerts" },
      },
      {
        id: "s3",
        order: 3,
        type: "action",
        label: "Create Expansion Deal",
        description: "Auto-create pipeline opportunity for upsell",
        config: { stage: "qualified", template: "expansion" },
      },
      {
        id: "s4",
        order: 4,
        type: "delay",
        label: "Wait 48 Hours",
        description: "Allow sales rep to review and prepare",
        config: { duration: 48, unit: "hours" },
      },
      {
        id: "s5",
        order: 5,
        type: "action",
        label: "Send Upgrade Email",
        description: "Trigger personalized upgrade offer email",
        config: { template: "upgrade_offer_v3" },
      },
    ],
    recentExecutions: [
      {
        id: "e1",
        customerName: "Nova Digital",
        triggeredAt: "1 day ago",
        status: "in-progress",
        stepsCompleted: 2,
        totalSteps: 5,
      },
      {
        id: "e2",
        customerName: "Acme Corp",
        triggeredAt: "3 days ago",
        status: "completed",
        stepsCompleted: 5,
        totalSteps: 5,
        outcome: "Upsell closed — $3,200/mo added",
      },
      {
        id: "e3",
        customerName: "TechFlow Inc",
        triggeredAt: "1 week ago",
        status: "completed",
        stepsCompleted: 5,
        totalSteps: 5,
        outcome: "Upsell in negotiation — $5,400/mo proposed",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Stalled Deal Revival",
    description:
      "Re-engages prospects when deals have been inactive for more than 14 days in any pipeline stage.",
    trigger: "Deal inactive > 14 days",
    active: false,
    executions: 12,
    lastRun: "1 week ago",
    successRate: 42,
    avgTimeToComplete: "6.1 days",
    accountsSaved: 0,
    revenueProtected: 28000,
    steps: [
      {
        id: "s1",
        order: 1,
        type: "trigger",
        label: "Inactivity Detection",
        description:
          "Triggered when deal has no activity for 14+ days",
        config: { threshold: 14, unit: "days" },
      },
      {
        id: "s2",
        order: 2,
        type: "condition",
        label: "Check Deal Value",
        description: "Route based on deal value for prioritization",
        config: { field: "deal_value", threshold: 50000 },
      },
      {
        id: "s3",
        order: 3,
        type: "action",
        label: "Send Follow-up Email",
        description:
          "Automated follow-up with value proposition reminder",
        config: { template: "deal_revival_v1" },
      },
      {
        id: "s4",
        order: 4,
        type: "delay",
        label: "Wait 3 Days",
        description: "Monitor for response",
        config: { duration: 3, unit: "days" },
      },
      {
        id: "s5",
        order: 5,
        type: "action",
        label: "Alert Sales Manager",
        description: "Escalate to sales manager if no response",
        config: { channel: "sales-management" },
      },
      {
        id: "s6",
        order: 6,
        type: "action",
        label: "Update Deal Priority",
        description: "Flag deal as at-risk in CRM",
        config: { priority: "high", tag: "stalled" },
      },
    ],
    recentExecutions: [
      {
        id: "e1",
        customerName: "NetBridge",
        triggeredAt: "1 week ago",
        status: "completed",
        stepsCompleted: 6,
        totalSteps: 6,
        outcome: "Deal reactivated — meeting scheduled",
      },
      {
        id: "e2",
        customerName: "DataCore",
        triggeredAt: "2 weeks ago",
        status: "failed",
        stepsCompleted: 6,
        totalSteps: 6,
        outcome: "Deal closed-lost — competitor selected",
      },
    ],
  },
};
