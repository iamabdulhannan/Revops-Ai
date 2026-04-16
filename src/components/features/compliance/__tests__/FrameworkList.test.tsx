import React from "react";
import { render, screen } from "@testing-library/react";
import { FrameworkList } from "../FrameworkList";
import type { ComplianceFramework } from "@/types";

const mockFrameworks: ComplianceFramework[] = [
  {
    id: "fw-gdpr",
    name: "General Data Protection Regulation",
    shortName: "GDPR",
    score: 85,
    status: "compliant",
    lastScanned: "2026-02-25T09:30:00Z",
    violationsCount: 1,
    description: "EU data protection regulation",
  },
  {
    id: "fw-pta",
    name: "Pakistan Telecom Authority",
    shortName: "PTA",
    score: 68,
    status: "at-risk",
    lastScanned: "2026-02-24T14:15:00Z",
    violationsCount: 3,
    description: "Telecom regulatory authority",
  },
  {
    id: "fw-esg",
    name: "Environmental, Social & Governance",
    shortName: "ESG",
    score: 42,
    status: "critical",
    lastScanned: "2026-02-20T16:30:00Z",
    violationsCount: 6,
    description: "ESG framework",
  },
];

describe("FrameworkList", () => {
  it("renders the section title", () => {
    render(<FrameworkList frameworks={mockFrameworks} />);
    expect(screen.getByText("Active Frameworks")).toBeInTheDocument();
  });

  it("renders the section description", () => {
    render(<FrameworkList frameworks={mockFrameworks} />);
    expect(
      screen.getByText("Regulatory frameworks being monitored")
    ).toBeInTheDocument();
  });

  it("renders short names for all frameworks", () => {
    render(<FrameworkList frameworks={mockFrameworks} />);
    expect(screen.getByText("GDPR")).toBeInTheDocument();
    expect(screen.getByText("PTA")).toBeInTheDocument();
    expect(screen.getByText("ESG")).toBeInTheDocument();
  });

  it("renders score labels for all frameworks", () => {
    render(<FrameworkList frameworks={mockFrameworks} />);
    expect(screen.getByText("85/100")).toBeInTheDocument();
    expect(screen.getByText("68/100")).toBeInTheDocument();
    expect(screen.getByText("42/100")).toBeInTheDocument();
  });

  it("renders status badges for all frameworks", () => {
    render(<FrameworkList frameworks={mockFrameworks} />);
    expect(screen.getByText("compliant")).toBeInTheDocument();
    expect(screen.getByText("at-risk")).toBeInTheDocument();
    expect(screen.getByText("critical")).toBeInTheDocument();
  });

  it("renders progress bars for all frameworks", () => {
    render(<FrameworkList frameworks={mockFrameworks} />);
    const progressBars = screen.getAllByRole("progressbar");
    expect(progressBars).toHaveLength(3);
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <FrameworkList frameworks={mockFrameworks} className="my-custom" />
    );
    expect(container.firstChild).toHaveClass("my-custom");
  });

  it("renders with an empty frameworks array", () => {
    render(<FrameworkList frameworks={[]} />);
    expect(screen.getByText("Active Frameworks")).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});
