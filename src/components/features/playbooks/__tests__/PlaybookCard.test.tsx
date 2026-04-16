import React from "react";
import { render, screen } from "@testing-library/react";
import { PlaybookCard } from "../PlaybookCard";
import type { Playbook } from "@/types";

const activePlaybook: Playbook = {
  id: "pb1",
  name: "Churn Prevention",
  description: "Triggers when health score drops below 50",
  trigger: "Health Score < 50",
  actions: ["Send alert email", "Create task for CSM", "Schedule call"],
  active: true,
  executions: 142,
  lastRun: "2h ago",
};

const inactivePlaybook: Playbook = {
  id: "pb2",
  name: "Win-Back Campaign",
  description: "Re-engage churned customers",
  trigger: "Customer churned",
  actions: ["Send re-engagement email"],
  active: false,
  executions: 28,
  lastRun: "5d ago",
};

describe("PlaybookCard", () => {
  it("renders the playbook name", () => {
    render(<PlaybookCard playbook={activePlaybook} />);
    expect(screen.getByText("Churn Prevention")).toBeInTheDocument();
  });

  it("shows 'Active' label when playbook is active", () => {
    render(<PlaybookCard playbook={activePlaybook} />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("shows 'Inactive' label when playbook is not active", () => {
    render(<PlaybookCard playbook={inactivePlaybook} />);
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("renders the trigger text", () => {
    render(<PlaybookCard playbook={activePlaybook} />);
    expect(screen.getByText(/Health Score < 50/)).toBeInTheDocument();
  });

  it("renders action count with correct pluralization", () => {
    render(<PlaybookCard playbook={activePlaybook} />);
    expect(screen.getByText(/3 steps/)).toBeInTheDocument();
  });

  it("renders singular 'step' for single action", () => {
    render(<PlaybookCard playbook={inactivePlaybook} />);
    expect(screen.getByText(/1 step$/)).toBeInTheDocument();
  });

  it("renders the execution count", () => {
    render(<PlaybookCard playbook={activePlaybook} />);
    expect(screen.getByText("142 runs")).toBeInTheDocument();
  });

  it("renders the last run time", () => {
    render(<PlaybookCard playbook={activePlaybook} />);
    expect(screen.getByText("Last: 2h ago")).toBeInTheDocument();
  });
});
