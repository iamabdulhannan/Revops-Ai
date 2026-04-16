import { ROUTES } from "./routes";

export type NavItem = {
  label: string;
  path: string;
  icon: string;
  badge?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const SIDEBAR_NAVIGATION: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", path: ROUTES.OVERVIEW, icon: "LayoutDashboard" },
    ],
  },
  {
    label: "Revenue",
    items: [
      { label: "Customers", path: ROUTES.CUSTOMERS, icon: "Users" },
      { label: "Pipeline", path: ROUTES.PIPELINE, icon: "Kanban" },
      { label: "Reports", path: ROUTES.REPORTS, icon: "BarChart3" },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "AI Co-Pilot", path: ROUTES.COPILOT, icon: "MessageSquareText" },
      { label: "Playbooks", path: ROUTES.PLAYBOOKS, icon: "Workflow" },
    ],
  },
  {
    label: "Compliance",
    items: [
      { label: "Dashboard", path: ROUTES.COMPLIANCE, icon: "ShieldCheck" },
      { label: "Audit Scanner", path: ROUTES.COMPLIANCE_AUDIT, icon: "ScanSearch" },
      { label: "Reports", path: ROUTES.COMPLIANCE_REPORTS, icon: "FileCheck" },
    ],
  },
  {
    label: "Configuration",
    items: [
      { label: "Integrations", path: ROUTES.INTEGRATIONS, icon: "Plug" },
      { label: "Settings", path: ROUTES.SETTINGS, icon: "Settings" },
    ],
  },
];
