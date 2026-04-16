import React from "react";
import { render, screen } from "@testing-library/react";
import { PipelineSummary } from "../PipelineSummary";

describe("PipelineSummary", () => {
  it("renders the section heading", () => {
    render(<PipelineSummary />);
    expect(screen.getByText("Pipeline Health")).toBeInTheDocument();
  });

  it("renders all stage names in the legend", () => {
    render(<PipelineSummary />);
    expect(screen.getByText(/Lead \(20%\)/)).toBeInTheDocument();
    expect(screen.getByText(/Qualified \(25%\)/)).toBeInTheDocument();
    expect(screen.getByText(/Proposal \(30%\)/)).toBeInTheDocument();
    expect(screen.getByText(/Negotiation \(15%\)/)).toBeInTheDocument();
    expect(screen.getByText(/Closed \(10%\)/)).toBeInTheDocument();
  });

  it("renders the total value stat", () => {
    render(<PipelineSummary />);
    expect(screen.getByText("Total Value")).toBeInTheDocument();
    expect(screen.getByText("$890K")).toBeInTheDocument();
  });

  it("renders the average deal size stat", () => {
    render(<PipelineSummary />);
    expect(screen.getByText("Avg Deal Size")).toBeInTheDocument();
    expect(screen.getByText("$21.2K")).toBeInTheDocument();
  });

  it("renders the win rate stat", () => {
    render(<PipelineSummary />);
    expect(screen.getByText("Win Rate")).toBeInTheDocument();
    expect(screen.getByText("34%")).toBeInTheDocument();
  });

  it("renders five pipeline stage segments", () => {
    const { container } = render(<PipelineSummary />);
    // The stacked bar has 5 colored segments
    const segments = container.querySelectorAll(
      ".h-full"
    );
    expect(segments.length).toBeGreaterThanOrEqual(5);
  });
});
