import type { Deal } from "@/types";

export type StageKey =
  | "lead"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "closed-won";

export const STAGE_ORDER: StageKey[] = [
  "lead",
  "qualified",
  "proposal",
  "negotiation",
  "closed-won",
];

export const STAGE_LABELS: Record<StageKey, string> = {
  lead: "Lead",
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  "closed-won": "Closed Won",
};

export const INITIAL_DEALS: Deal[] = [
  // Lead
  {
    id: "d1",
    title: "Enterprise Plan",
    company: "Acme Corp",
    value: 45000,
    stage: "lead",
    healthScore: 82,
    assignee: "Sarah Chen",
    lastActivity: "2h ago",
    daysInStage: 3,
  },
  {
    id: "d2",
    title: "Team Upgrade",
    company: "Bolt.io",
    value: 12000,
    stage: "lead",
    healthScore: 65,
    assignee: "James Park",
    lastActivity: "1d ago",
    daysInStage: 7,
  },
  {
    id: "d3",
    title: "Platform License",
    company: "Vertex AI",
    value: 28000,
    stage: "lead",
    healthScore: 55,
    assignee: "Sarah Chen",
    lastActivity: "3d ago",
    daysInStage: 12,
  },
  // Qualified
  {
    id: "d4",
    title: "Annual Contract",
    company: "Orion Systems",
    value: 67000,
    stage: "qualified",
    healthScore: 90,
    assignee: "Mike Ross",
    lastActivity: "4h ago",
    daysInStage: 5,
  },
  {
    id: "d5",
    title: "Startup Bundle",
    company: "NeonLabs",
    value: 8500,
    stage: "qualified",
    healthScore: 72,
    assignee: "James Park",
    lastActivity: "1d ago",
    daysInStage: 9,
  },
  {
    id: "d6",
    title: "Custom Integration",
    company: "DataPrime",
    value: 34000,
    stage: "qualified",
    healthScore: 48,
    assignee: "Sarah Chen",
    lastActivity: "5d ago",
    daysInStage: 18,
  },
  // Proposal
  {
    id: "d7",
    title: "Scale Plan",
    company: "CloudOps Inc",
    value: 52000,
    stage: "proposal",
    healthScore: 85,
    assignee: "Mike Ross",
    lastActivity: "1h ago",
    daysInStage: 4,
  },
  {
    id: "d8",
    title: "Pro Seats x50",
    company: "TechFlow",
    value: 24000,
    stage: "proposal",
    healthScore: 60,
    assignee: "James Park",
    lastActivity: "2d ago",
    daysInStage: 11,
  },
  {
    id: "d9",
    title: "API Access Tier",
    company: "SwiftData",
    value: 19000,
    stage: "proposal",
    healthScore: 77,
    assignee: "Sarah Chen",
    lastActivity: "6h ago",
    daysInStage: 6,
  },
  {
    id: "d10",
    title: "White-label",
    company: "BrandForge",
    value: 88000,
    stage: "proposal",
    healthScore: 42,
    assignee: "Mike Ross",
    lastActivity: "4d ago",
    daysInStage: 22,
  },
  // Negotiation
  {
    id: "d11",
    title: "Multi-year Deal",
    company: "NetBridge",
    value: 120000,
    stage: "negotiation",
    healthScore: 91,
    assignee: "Mike Ross",
    lastActivity: "30m ago",
    daysInStage: 8,
  },
  {
    id: "d12",
    title: "Expansion",
    company: "Pinnacle Group",
    value: 38000,
    stage: "negotiation",
    healthScore: 68,
    assignee: "Sarah Chen",
    lastActivity: "1d ago",
    daysInStage: 14,
  },
  {
    id: "d13",
    title: "Renewal + Upsell",
    company: "CoreStack",
    value: 55000,
    stage: "negotiation",
    healthScore: 80,
    assignee: "James Park",
    lastActivity: "3h ago",
    daysInStage: 6,
  },
  // Closed Won
  {
    id: "d14",
    title: "Enterprise Suite",
    company: "Zenith Corp",
    value: 95000,
    stage: "closed-won",
    healthScore: 100,
    assignee: "Mike Ross",
    lastActivity: "1d ago",
    daysInStage: 0,
  },
  {
    id: "d15",
    title: "Growth Plan",
    company: "Lumen AI",
    value: 31000,
    stage: "closed-won",
    healthScore: 100,
    assignee: "Sarah Chen",
    lastActivity: "2d ago",
    daysInStage: 0,
  },
  {
    id: "d16",
    title: "Team License",
    company: "PixelWave",
    value: 14500,
    stage: "closed-won",
    healthScore: 100,
    assignee: "James Park",
    lastActivity: "3d ago",
    daysInStage: 0,
  },
];

export function groupDealsByStage(deals: Deal[]): Record<StageKey, Deal[]> {
  return STAGE_ORDER.reduce(
    (acc, stage) => {
      acc[stage] = deals.filter((d) => d.stage === stage);
      return acc;
    },
    {} as Record<StageKey, Deal[]>
  );
}
