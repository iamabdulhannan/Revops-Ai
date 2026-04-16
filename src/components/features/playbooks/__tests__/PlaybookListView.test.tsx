import React from "react";
import { render, screen } from "@testing-library/react";
import { PlaybookListView } from "../PlaybookListView";
import type { PlaybookStep } from "@/data/playbook-data";

// Mock the playbook-flow-utils to provide stepMeta with icon components
jest.mock("../playbook-flow-utils", () => {
  const MockIcon = () => <svg data-testid="mock-icon" />;
  return {
    stepMeta: {
      trigger: { icon: MockIcon, colorClass: "text-black", bgClass: "bg-grey-100" },
      condition: { icon: MockIcon, colorClass: "text-grey-600", bgClass: "bg-grey-50" },
      action: { icon: MockIcon, colorClass: "text-success", bgClass: "bg-success-light" },
      delay: { icon: MockIcon, colorClass: "text-warning", bgClass: "bg-warning-light" },
    },
  };
});

const mockSteps: PlaybookStep[] = [
  {
    id: "s1",
    order: 1,
    type: "trigger",
    label: "Health Score Drops",
    description: "Triggered when a customer health score drops below 50",
    config: { threshold: 50 },
  },
  {
    id: "s2",
    order: 2,
    type: "action",
    label: "Send Alert Email",
    description: "Notify CSM about the health score change",
    config: { channel: "email" },
  },
  {
    id: "s3",
    order: 3,
    type: "delay",
    label: "Wait 48 Hours",
    description: "Wait for customer response before escalating",
    config: { hours: 48 },
  },
  {
    id: "s4",
    order: 4,
    type: "condition",
    label: "Check Response",
    description: "Evaluate if the customer has responded",
    config: { check: "response_received" },
  },
];

describe("PlaybookListView", () => {
  it("renders all step labels", () => {
    render(<PlaybookListView steps={mockSteps} />);
    expect(screen.getByText("Health Score Drops")).toBeInTheDocument();
    expect(screen.getByText("Send Alert Email")).toBeInTheDocument();
    expect(screen.getByText("Wait 48 Hours")).toBeInTheDocument();
    expect(screen.getByText("Check Response")).toBeInTheDocument();
  });

  it("renders step order numbers", () => {
    render(<PlaybookListView steps={mockSteps} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
    expect(screen.getByText("Step 4")).toBeInTheDocument();
  });

  it("renders step type labels", () => {
    render(<PlaybookListView steps={mockSteps} />);
    expect(screen.getByText("trigger")).toBeInTheDocument();
    expect(screen.getByText("action")).toBeInTheDocument();
    expect(screen.getByText("delay")).toBeInTheDocument();
    expect(screen.getByText("condition")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<PlaybookListView steps={mockSteps} />);
    expect(
      screen.getByText("Triggered when a customer health score drops below 50")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Wait for customer response before escalating")
    ).toBeInTheDocument();
  });

  it("renders correctly with a single step", () => {
    render(<PlaybookListView steps={[mockSteps[0]]} />);
    expect(screen.getByText("Health Score Drops")).toBeInTheDocument();
    expect(screen.getByText("Step 1")).toBeInTheDocument();
  });

  it("renders without crashing with an empty steps array", () => {
    const { container } = render(<PlaybookListView steps={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
