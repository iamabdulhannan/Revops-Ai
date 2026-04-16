import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReportGenerateModal } from "../ReportGenerateModal";

// Mock the Modal component to avoid createPortal issues in testing
jest.mock("@/components/ui/Modal", () => ({
  Modal: ({ open, onClose, title, children }: any) =>
    open ? (
      <div data-testid="modal" role="dialog" aria-label={title}>
        <h2>{title}</h2>
        <button onClick={onClose} aria-label="Close">
          Close
        </button>
        {children}
      </div>
    ) : null,
}));

// Mock the Toggle component
jest.mock("@/components/ui/Toggle", () => ({
  Toggle: ({ checked, onChange, label }: any) => (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e: any) => onChange(e.target.checked)}
        data-testid="toggle"
      />
      {label}
    </label>
  ),
}));

describe("ReportGenerateModal", () => {
  const mockOnClose = jest.fn();
  const mockOnGenerate = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnGenerate.mockClear();
  });

  it("renders the modal title when open", () => {
    render(
      <ReportGenerateModal
        open={true}
        onClose={mockOnClose}
        onGenerate={mockOnGenerate}
      />
    );
    expect(
      screen.getByText("Generate Compliance Report")
    ).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <ReportGenerateModal
        open={false}
        onClose={mockOnClose}
        onGenerate={mockOnGenerate}
      />
    );
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("renders framework select with options", () => {
    render(
      <ReportGenerateModal
        open={true}
        onClose={mockOnClose}
        onGenerate={mockOnGenerate}
      />
    );
    expect(screen.getByText("Framework")).toBeInTheDocument();
    const frameworkSelect = screen.getByDisplayValue("All");
    expect(frameworkSelect).toBeInTheDocument();
  });

  it("renders date range select", () => {
    render(
      <ReportGenerateModal
        open={true}
        onClose={mockOnClose}
        onGenerate={mockOnGenerate}
      />
    );
    expect(screen.getByText("Date Range")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Last Quarter")).toBeInTheDocument();
  });

  it("renders department checkboxes", () => {
    render(
      <ReportGenerateModal
        open={true}
        onClose={mockOnClose}
        onGenerate={mockOnGenerate}
      />
    );
    expect(screen.getByText("Departments")).toBeInTheDocument();
    expect(screen.getByText("HR")).toBeInTheDocument();
    expect(screen.getByText("Finance")).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ReportGenerateModal
        open={true}
        onClose={mockOnClose}
        onGenerate={mockOnGenerate}
      />
    );
    await user.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onGenerate with config when Generate button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ReportGenerateModal
        open={true}
        onClose={mockOnClose}
        onGenerate={mockOnGenerate}
      />
    );
    await user.click(screen.getByText("Generate"));
    expect(mockOnGenerate).toHaveBeenCalledTimes(1);
    const config = mockOnGenerate.mock.calls[0][0];
    expect(config.framework).toBe("All");
    expect(config.dateRange).toBe("Last Quarter");
    expect(config.includeRecommendations).toBe(true);
    expect(Array.isArray(config.departments)).toBe(true);
  });

  it("can change the framework selection", async () => {
    const user = userEvent.setup();
    render(
      <ReportGenerateModal
        open={true}
        onClose={mockOnClose}
        onGenerate={mockOnGenerate}
      />
    );
    const frameworkSelect = screen.getByDisplayValue("All");
    await user.selectOptions(frameworkSelect, "GDPR");
    await user.click(screen.getByText("Generate"));
    expect(mockOnGenerate.mock.calls[0][0].framework).toBe("GDPR");
  });

  it("can toggle department checkboxes", async () => {
    const user = userEvent.setup();
    render(
      <ReportGenerateModal
        open={true}
        onClose={mockOnClose}
        onGenerate={mockOnGenerate}
      />
    );
    // Uncheck HR
    const hrCheckbox = screen.getByLabelText("HR");
    await user.click(hrCheckbox);

    await user.click(screen.getByText("Generate"));
    const departments = mockOnGenerate.mock.calls[0][0].departments;
    expect(departments).not.toContain("HR");
  });
});
