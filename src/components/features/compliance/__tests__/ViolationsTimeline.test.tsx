import React from "react";
import { render, screen } from "@testing-library/react";
import { ViolationsTimeline } from "../ViolationsTimeline";
import type { ComplianceViolation } from "@/types";

const mockViolations: ComplianceViolation[] = [
  {
    id: "vio-001",
    framework: "ESG",
    department: "Operations",
    severity: "critical",
    title: "Missing Scope 2 Emissions Reporting",
    description: "Annual Scope 2 emissions not reported",
    detectedAt: "2026-02-18T10:00:00Z",
    status: "open",
    recommendation: "Compile records and calculate emissions",
  },
  {
    id: "vio-002",
    framework: "ESG",
    department: "Operations",
    severity: "high",
    title: "Overdue Waste Management Audit",
    description: "Bi-annual audit not conducted",
    detectedAt: "2026-02-10T08:30:00Z",
    status: "in-review",
    recommendation: "Schedule immediate audit",
  },
  {
    id: "vio-003",
    framework: "GDPR",
    department: "Data Handling",
    severity: "medium",
    title: "Unsigned DPA with Vendor",
    description: "Vendor processing data without DPA",
    detectedAt: "2026-02-15T14:20:00Z",
    status: "resolved",
    recommendation: "Execute DPA and halt transfers",
  },
];

describe("ViolationsTimeline", () => {
  it("renders the section heading", () => {
    render(<ViolationsTimeline violations={mockViolations} />);
    expect(screen.getByText("Recent Violations")).toBeInTheDocument();
  });

  it("renders all violation titles", () => {
    render(<ViolationsTimeline violations={mockViolations} />);
    expect(
      screen.getByText("Missing Scope 2 Emissions Reporting")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Overdue Waste Management Audit")
    ).toBeInTheDocument();
    expect(screen.getByText("Unsigned DPA with Vendor")).toBeInTheDocument();
  });

  it("renders severity badges", () => {
    render(<ViolationsTimeline violations={mockViolations} />);
    expect(screen.getByText("critical")).toBeInTheDocument();
    expect(screen.getByText("high")).toBeInTheDocument();
    expect(screen.getByText("medium")).toBeInTheDocument();
  });

  it("renders framework and department info", () => {
    render(<ViolationsTimeline violations={mockViolations} />);
    const esgOps = screen.getAllByText(/ESG/);
    expect(esgOps.length).toBeGreaterThanOrEqual(1);
  });

  it("renders formatted dates", () => {
    render(<ViolationsTimeline violations={mockViolations} />);
    expect(screen.getByText("Feb 18, 2026")).toBeInTheDocument();
    expect(screen.getByText("Feb 10, 2026")).toBeInTheDocument();
    expect(screen.getByText("Feb 15, 2026")).toBeInTheDocument();
  });

  it("limits displayed violations when limit prop is provided", () => {
    render(<ViolationsTimeline violations={mockViolations} limit={2} />);
    expect(
      screen.getByText("Missing Scope 2 Emissions Reporting")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Overdue Waste Management Audit")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Unsigned DPA with Vendor")
    ).not.toBeInTheDocument();
  });

  it("shows empty state when no violations", () => {
    render(<ViolationsTimeline violations={[]} />);
    expect(
      screen.getByText("No violations to display.")
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ViolationsTimeline violations={mockViolations} className="custom" />
    );
    expect(container.firstChild).toHaveClass("custom");
  });
});
