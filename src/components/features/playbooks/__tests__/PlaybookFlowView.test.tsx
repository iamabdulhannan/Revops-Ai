import React from "react";
import { render, screen } from "@testing-library/react";
import { PlaybookFlowView } from "../PlaybookFlowView";
import type { PlaybookStep } from "@/data/playbook-data";

jest.mock("@xyflow/react", () => ({
  ReactFlow: ({ children }: any) => <div data-testid="react-flow">{children}</div>,
  Background: () => <div data-testid="rf-background" />,
  Controls: () => <div data-testid="rf-controls" />,
  BackgroundVariant: { Dots: "dots" },
  Handle: () => null,
  Position: { Top: "top", Bottom: "bottom" },
}));

jest.mock("@xyflow/react/dist/style.css", () => ({}));
jest.mock("../playbook-flow.css", () => ({}));

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
    label: "Send Alert",
    description: "Send notification to CSM",
    config: { channel: "email" },
  },
  {
    id: "s3",
    order: 3,
    type: "delay",
    label: "Wait 48 Hours",
    description: "Wait for customer response",
    config: { hours: 48 },
  },
];

describe("PlaybookFlowView", () => {
  it("renders the ReactFlow component", () => {
    render(<PlaybookFlowView steps={mockSteps} />);
    expect(screen.getByTestId("react-flow")).toBeInTheDocument();
  });

  it("renders the Background component", () => {
    render(<PlaybookFlowView steps={mockSteps} />);
    expect(screen.getByTestId("rf-background")).toBeInTheDocument();
  });

  it("renders the Controls component", () => {
    render(<PlaybookFlowView steps={mockSteps} />);
    expect(screen.getByTestId("rf-controls")).toBeInTheDocument();
  });

  it("renders without crashing with an empty steps array", () => {
    render(<PlaybookFlowView steps={[]} />);
    expect(screen.getByTestId("react-flow")).toBeInTheDocument();
  });

  it("renders the container with correct height styling", () => {
    const { container } = render(<PlaybookFlowView steps={mockSteps} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.height).toBe("600px");
  });
});
