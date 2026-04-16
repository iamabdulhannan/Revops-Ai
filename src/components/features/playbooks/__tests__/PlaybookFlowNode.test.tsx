import React from "react";
import { render, screen } from "@testing-library/react";
import { PlaybookFlowNode } from "../PlaybookFlowNode";

jest.mock("@xyflow/react", () => ({
  ReactFlow: ({ children }: any) => <div data-testid="react-flow">{children}</div>,
  Background: () => <div data-testid="rf-background" />,
  Controls: () => <div data-testid="rf-controls" />,
  BackgroundVariant: { Dots: "dots" },
  Handle: () => null,
  Position: { Top: "top", Bottom: "bottom" },
}));

describe("PlaybookFlowNode", () => {
  const triggerData = {
    stepId: "s1",
    order: 1,
    type: "trigger" as const,
    label: "Health Score Alert",
    description: "Triggered when health score drops below 50",
  };

  const actionData = {
    stepId: "s2",
    order: 2,
    type: "action" as const,
    label: "Send Email",
    description: "Send an alert email to the CSM",
  };

  const conditionData = {
    stepId: "s3",
    order: 3,
    type: "condition" as const,
    label: "Check MRR",
    description: "If MRR > $5K, escalate",
  };

  const delayData = {
    stepId: "s4",
    order: 4,
    type: "delay" as const,
    label: "Wait 2 Days",
    description: "Wait for customer response",
  };

  it("renders the step order number", () => {
    render(<PlaybookFlowNode data={triggerData} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
  });

  it("renders the step label", () => {
    render(<PlaybookFlowNode data={triggerData} />);
    expect(screen.getByText("Health Score Alert")).toBeInTheDocument();
  });

  it("renders the step description", () => {
    render(<PlaybookFlowNode data={triggerData} />);
    expect(
      screen.getByText("Triggered when health score drops below 50")
    ).toBeInTheDocument();
  });

  it("renders the step type", () => {
    render(<PlaybookFlowNode data={triggerData} />);
    expect(screen.getByText("trigger")).toBeInTheDocument();
  });

  it("renders action type node correctly", () => {
    render(<PlaybookFlowNode data={actionData} />);
    expect(screen.getByText("Send Email")).toBeInTheDocument();
    expect(screen.getByText("action")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });

  it("renders condition type node correctly", () => {
    render(<PlaybookFlowNode data={conditionData} />);
    expect(screen.getByText("Check MRR")).toBeInTheDocument();
    expect(screen.getByText("condition")).toBeInTheDocument();
  });

  it("renders delay type node correctly", () => {
    render(<PlaybookFlowNode data={delayData} />);
    expect(screen.getByText("Wait 2 Days")).toBeInTheDocument();
    expect(screen.getByText("delay")).toBeInTheDocument();
  });
});
