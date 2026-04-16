import React from "react";
import { render, screen } from "@testing-library/react";
import { FeatureGrid } from "../FeatureGrid";

describe("FeatureGrid", () => {
  it("renders the section heading", () => {
    render(<FeatureGrid />);
    expect(
      screen.getByText("Everything You Need to Grow Revenue")
    ).toBeInTheDocument();
  });

  it("renders all six feature titles", () => {
    render(<FeatureGrid />);
    expect(screen.getByText("Connect Tools")).toBeInTheDocument();
    expect(screen.getByText("Customer Timeline")).toBeInTheDocument();
    expect(screen.getByText("AI Forecasting")).toBeInTheDocument();
    expect(screen.getByText("Pipeline Scoring")).toBeInTheDocument();
    expect(screen.getByText("Automated Playbooks")).toBeInTheDocument();
    expect(screen.getByText("Revenue Attribution")).toBeInTheDocument();
  });

  it("renders feature descriptions", () => {
    render(<FeatureGrid />);
    expect(
      screen.getByText(/Integrate your CRM, billing, support/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/See every customer interaction/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Predict revenue, churn risk/)
    ).toBeInTheDocument();
  });

  it("renders six feature cards", () => {
    const { container } = render(<FeatureGrid />);
    // Each feature card has a border class
    const cards = container.querySelectorAll(".border.border-border");
    expect(cards).toHaveLength(6);
  });

  it("has the features section id", () => {
    const { container } = render(<FeatureGrid />);
    const section = container.querySelector("#features");
    expect(section).toBeInTheDocument();
  });
});
