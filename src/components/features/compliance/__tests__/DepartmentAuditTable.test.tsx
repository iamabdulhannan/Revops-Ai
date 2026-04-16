import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DepartmentAuditTable } from "../DepartmentAuditTable";
import type { ComplianceDepartment, ComplianceViolation } from "@/types";

const mockDepartments: ComplianceDepartment[] = [
  {
    id: "dept-hr",
    name: "HR",
    score: 78,
    status: "compliant",
    lastScanned: "2026-02-25T09:00:00Z",
    violationsCount: 0,
    categories: ["Employment Law"],
  },
  {
    id: "dept-finance",
    name: "Finance",
    score: 65,
    status: "at-risk",
    lastScanned: "2026-02-24T10:30:00Z",
    violationsCount: 2,
    categories: ["Tax Compliance"],
  },
];

const mockViolations: ComplianceViolation[] = [
  {
    id: "vio-007",
    framework: "SECP",
    department: "Finance",
    severity: "high",
    title: "Beneficial Ownership Disclosure Gap",
    description: "Register not updated",
    detectedAt: "2026-02-22T13:00:00Z",
    status: "open",
    recommendation: "File updated Form 45",
  },
];

describe("DepartmentAuditTable", () => {
  const mockOnScan = jest.fn();

  beforeEach(() => {
    mockOnScan.mockClear();
  });

  it("renders the table headers", () => {
    render(
      <DepartmentAuditTable
        departments={mockDepartments}
        violations={mockViolations}
        onScan={mockOnScan}
        scanningId={null}
      />
    );
    expect(screen.getByText("Department")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Violations")).toBeInTheDocument();
    expect(screen.getByText("Last Scanned")).toBeInTheDocument();
  });

  it("renders department names", () => {
    render(
      <DepartmentAuditTable
        departments={mockDepartments}
        violations={mockViolations}
        onScan={mockOnScan}
        scanningId={null}
      />
    );
    expect(screen.getByText("HR")).toBeInTheDocument();
    expect(screen.getByText("Finance")).toBeInTheDocument();
  });

  it("renders scan buttons for each department", () => {
    render(
      <DepartmentAuditTable
        departments={mockDepartments}
        violations={mockViolations}
        onScan={mockOnScan}
        scanningId={null}
      />
    );
    const scanButtons = screen.getAllByText("Scan");
    expect(scanButtons).toHaveLength(2);
  });

  it("calls onScan when scan button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <DepartmentAuditTable
        departments={mockDepartments}
        violations={mockViolations}
        onScan={mockOnScan}
        scanningId={null}
      />
    );
    const scanButtons = screen.getAllByText("Scan");
    await user.click(scanButtons[0]);
    expect(mockOnScan).toHaveBeenCalledWith("dept-hr");
  });

  it("shows 'Scanning...' text when department is being scanned", () => {
    render(
      <DepartmentAuditTable
        departments={mockDepartments}
        violations={mockViolations}
        onScan={mockOnScan}
        scanningId="dept-hr"
      />
    );
    expect(screen.getByText("Scanning...")).toBeInTheDocument();
  });

  it("expands a department row to show violations when clicked", async () => {
    const user = userEvent.setup();
    render(
      <DepartmentAuditTable
        departments={mockDepartments}
        violations={mockViolations}
        onScan={mockOnScan}
        scanningId={null}
      />
    );

    // Click Finance row to expand
    await user.click(screen.getByText("Finance"));
    expect(
      screen.getByText("Beneficial Ownership Disclosure Gap")
    ).toBeInTheDocument();
  });

  it("shows 'No violations found' when expanded department has no violations", async () => {
    const user = userEvent.setup();
    render(
      <DepartmentAuditTable
        departments={mockDepartments}
        violations={mockViolations}
        onScan={mockOnScan}
        scanningId={null}
      />
    );

    // Click HR row (has no violations)
    await user.click(screen.getByText("HR"));
    expect(
      screen.getByText("No violations found for this department.")
    ).toBeInTheDocument();
  });

  it("collapses the row when clicked again", async () => {
    const user = userEvent.setup();
    render(
      <DepartmentAuditTable
        departments={mockDepartments}
        violations={mockViolations}
        onScan={mockOnScan}
        scanningId={null}
      />
    );

    // Expand
    await user.click(screen.getByText("Finance"));
    expect(
      screen.getByText("Beneficial Ownership Disclosure Gap")
    ).toBeInTheDocument();

    // Collapse
    await user.click(screen.getByText("Finance"));
    expect(
      screen.queryByText("Beneficial Ownership Disclosure Gap")
    ).not.toBeInTheDocument();
  });
});
