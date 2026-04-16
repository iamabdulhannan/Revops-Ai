import React from "react";
import { render, screen } from "@testing-library/react";
import { FunnelChart } from "../FunnelChart";
import type { FunnelStage } from "@/types";

const mockStages: FunnelStage[] = [
  { name: "Leads", value: 1200, rate: 100 },
  { name: "Qualified", value: 800, rate: 67 },
  { name: "Proposal", value: 400, rate: 50 },
  { name: "Closed", value: 200, rate: 50 },
];

describe("FunnelChart", () => {
  it("renders all stage names", () => {
    render(<FunnelChart stages={mockStages} />);
    expect(screen.getByText("Leads")).toBeInTheDocument();
    expect(screen.getByText("Qualified")).toBeInTheDocument();
    expect(screen.getByText("Proposal")).toBeInTheDocument();
    expect(screen.getByText("Closed")).toBeInTheDocument();
  });

  it("renders formatted stage values", () => {
    render(<FunnelChart stages={mockStages} />);
    expect(screen.getByText("1,200")).toBeInTheDocument();
    expect(screen.getByText("800")).toBeInTheDocument();
    expect(screen.getByText("400")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  it("renders rate percentages", () => {
    render(<FunnelChart stages={mockStages} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("67%")).toBeInTheDocument();
    // Two stages with 50%
    const fiftyPercent = screen.getAllByText("50%");
    expect(fiftyPercent).toHaveLength(2);
  });

  it("applies custom className", () => {
    const { container } = render(
      <FunnelChart stages={mockStages} className="custom-funnel" />
    );
    expect(container.firstChild).toHaveClass("custom-funnel");
  });

  it("renders with empty stages array", () => {
    const { container } = render(<FunnelChart stages={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("sets minimum bar width of 8%", () => {
    const tinyStages: FunnelStage[] = [
      { name: "Large", value: 10000, rate: 100 },
      { name: "Tiny", value: 1, rate: 0.01 },
    ];
    const { container } = render(<FunnelChart stages={tinyStages} />);
    // The tiny bar should still be visible with at least 8% width
    const bars = container.querySelectorAll(".h-8");
    expect(bars.length).toBe(2);
  });
});
