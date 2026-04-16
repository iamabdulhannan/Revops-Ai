import React from "react";
import { render, screen } from "@testing-library/react";
import { ComplianceSummaryCards } from "../ComplianceSummaryCards";

describe("ComplianceSummaryCards", () => {
  const defaultProps = {
    compliant: 12,
    atRisk: 5,
    critical: 2,
    totalChecks: 19,
  };

  it("renders the compliant count", () => {
    render(<ComplianceSummaryCards {...defaultProps} />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("renders the at-risk count", () => {
    render(<ComplianceSummaryCards {...defaultProps} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders the critical count", () => {
    render(<ComplianceSummaryCards {...defaultProps} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders labels for each card type", () => {
    render(<ComplianceSummaryCards {...defaultProps} />);
    expect(screen.getByText("Compliant")).toBeInTheDocument();
    expect(screen.getByText("At Risk")).toBeInTheDocument();
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });

  it("renders total checks count for each card", () => {
    render(<ComplianceSummaryCards {...defaultProps} />);
    const totalTexts = screen.getAllByText("of 19 total checks");
    expect(totalTexts).toHaveLength(3);
  });

  it("renders three cards", () => {
    const { container } = render(
      <ComplianceSummaryCards {...defaultProps} />
    );
    const cards = container.querySelectorAll(".shadow-card");
    expect(cards).toHaveLength(3);
  });

  it("renders with zero values", () => {
    render(
      <ComplianceSummaryCards
        compliant={0}
        atRisk={0}
        critical={0}
        totalChecks={0}
      />
    );
    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(3);
    const totalTexts = screen.getAllByText("of 0 total checks");
    expect(totalTexts).toHaveLength(3);
  });
});
