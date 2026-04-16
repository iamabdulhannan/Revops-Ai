import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComplianceReportCard } from "../ComplianceReportCard";
import type { ComplianceReport } from "@/types";

const readyReport: ComplianceReport = {
  id: "rpt-esg",
  name: "ESG Annual Report",
  type: "esg",
  framework: "ESG",
  lastGenerated: "2026-02-15T10:00:00Z",
  status: "ready",
  fileSize: "2.4 MB",
};

const notGeneratedReport: ComplianceReport = {
  id: "rpt-financial",
  name: "Financial Compliance Report",
  type: "financial",
  framework: "FBR",
  lastGenerated: null,
  status: "not-generated",
};

const generatingReport: ComplianceReport = {
  id: "rpt-gen",
  name: "Generating Report",
  type: "regulatory",
  framework: "PTA",
  lastGenerated: null,
  status: "generating",
};

describe("ComplianceReportCard", () => {
  const mockOnGenerate = jest.fn();
  const mockOnDownload = jest.fn();

  beforeEach(() => {
    mockOnGenerate.mockClear();
    mockOnDownload.mockClear();
  });

  it("renders the report name", () => {
    render(
      <ComplianceReportCard
        report={readyReport}
        onGenerate={mockOnGenerate}
        onDownload={mockOnDownload}
        isGenerating={false}
      />
    );
    expect(screen.getByText("ESG Annual Report")).toBeInTheDocument();
  });

  it("renders the framework name", () => {
    render(
      <ComplianceReportCard
        report={readyReport}
        onGenerate={mockOnGenerate}
        onDownload={mockOnDownload}
        isGenerating={false}
      />
    );
    expect(screen.getByText("ESG")).toBeInTheDocument();
  });

  it("shows Download and Regenerate buttons when ready", () => {
    render(
      <ComplianceReportCard
        report={readyReport}
        onGenerate={mockOnGenerate}
        onDownload={mockOnDownload}
        isGenerating={false}
      />
    );
    expect(screen.getByText("Download")).toBeInTheDocument();
    expect(screen.getByText("Regenerate")).toBeInTheDocument();
  });

  it("calls onDownload when Download button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ComplianceReportCard
        report={readyReport}
        onGenerate={mockOnGenerate}
        onDownload={mockOnDownload}
        isGenerating={false}
      />
    );
    await user.click(screen.getByText("Download"));
    expect(mockOnDownload).toHaveBeenCalledWith("rpt-esg");
  });

  it("calls onGenerate when Regenerate button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ComplianceReportCard
        report={readyReport}
        onGenerate={mockOnGenerate}
        onDownload={mockOnDownload}
        isGenerating={false}
      />
    );
    await user.click(screen.getByText("Regenerate"));
    expect(mockOnGenerate).toHaveBeenCalledWith("rpt-esg");
  });

  it("shows Generate button when not-generated", () => {
    render(
      <ComplianceReportCard
        report={notGeneratedReport}
        onGenerate={mockOnGenerate}
        onDownload={mockOnDownload}
        isGenerating={false}
      />
    );
    expect(screen.getByText("Generate")).toBeInTheDocument();
    expect(screen.queryByText("Download")).not.toBeInTheDocument();
  });

  it("shows 'Generating...' text when report status is generating", () => {
    render(
      <ComplianceReportCard
        report={generatingReport}
        onGenerate={mockOnGenerate}
        onDownload={mockOnDownload}
        isGenerating={false}
      />
    );
    expect(screen.getByText("Generating...")).toBeInTheDocument();
  });

  it("renders the file size and generated date for ready reports", () => {
    render(
      <ComplianceReportCard
        report={readyReport}
        onGenerate={mockOnGenerate}
        onDownload={mockOnDownload}
        isGenerating={false}
      />
    );
    expect(screen.getByText(/2\.4 MB/)).toBeInTheDocument();
    expect(screen.getByText(/Feb 15, 2026/)).toBeInTheDocument();
  });

  it("shows Ready badge for ready reports", () => {
    render(
      <ComplianceReportCard
        report={readyReport}
        onGenerate={mockOnGenerate}
        onDownload={mockOnDownload}
        isGenerating={false}
      />
    );
    expect(screen.getByText("Ready")).toBeInTheDocument();
  });
});
