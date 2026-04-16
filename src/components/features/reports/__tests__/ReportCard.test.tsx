import React from "react";
import { render, screen } from "@testing-library/react";
import { ReportCard } from "../ReportCard";

describe("ReportCard", () => {
  it("renders the title", () => {
    render(
      <ReportCard
        title="Board Report"
        description="Monthly executive summary"
        type="board"
        lastGenerated="2 days ago"
      />
    );
    expect(screen.getByText("Board Report")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(
      <ReportCard
        title="Sales Report"
        description="Sales performance metrics"
        type="sales"
        lastGenerated="1 week ago"
      />
    );
    expect(screen.getByText("Sales performance metrics")).toBeInTheDocument();
  });

  it("renders the last generated text", () => {
    render(
      <ReportCard
        title="Marketing Report"
        description="Marketing overview"
        type="marketing"
        lastGenerated="3 hours ago"
      />
    );
    expect(screen.getByText("Last generated: 3 hours ago")).toBeInTheDocument();
  });

  it("renders the Generate button", () => {
    render(
      <ReportCard
        title="Churn Report"
        description="Churn analysis"
        type="churn"
        lastGenerated="Yesterday"
      />
    );
    expect(
      screen.getByRole("button", { name: "Generate" })
    ).toBeInTheDocument();
  });

  it("renders correctly for board type", () => {
    render(
      <ReportCard
        title="Board Report"
        description="Executive view"
        type="board"
        lastGenerated="Today"
      />
    );
    expect(screen.getByText("Board Report")).toBeInTheDocument();
  });

  it("renders correctly for sales type", () => {
    render(
      <ReportCard
        title="Sales Report"
        description="Sales overview"
        type="sales"
        lastGenerated="Today"
      />
    );
    expect(screen.getByText("Sales Report")).toBeInTheDocument();
  });

  it("renders correctly for marketing type", () => {
    render(
      <ReportCard
        title="Marketing Report"
        description="Campaign results"
        type="marketing"
        lastGenerated="Today"
      />
    );
    expect(screen.getByText("Marketing Report")).toBeInTheDocument();
  });

  it("renders correctly for churn type", () => {
    render(
      <ReportCard
        title="Churn Report"
        description="Churn trends"
        type="churn"
        lastGenerated="Today"
      />
    );
    expect(screen.getByText("Churn Report")).toBeInTheDocument();
  });
});
