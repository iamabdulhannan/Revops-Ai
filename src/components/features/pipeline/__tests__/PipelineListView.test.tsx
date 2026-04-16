import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PipelineListView } from "../PipelineListView";
import { INITIAL_DEALS, STAGE_LABELS } from "../pipeline-data";

// Mock the Dropdown component to simplify testing
jest.mock("@/components/ui/Dropdown", () => ({
  Dropdown: ({ trigger }: any) => <div>{trigger}</div>,
}));

describe("PipelineListView", () => {
  const mockOnDealMove = jest.fn();

  beforeEach(() => {
    mockOnDealMove.mockClear();
  });

  it("renders all stage group headers", () => {
    render(
      <PipelineListView deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    Object.values(STAGE_LABELS).forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("renders deal titles in the expanded (default) state", () => {
    render(
      <PipelineListView deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    INITIAL_DEALS.forEach((deal) => {
      expect(screen.getByText(deal.title)).toBeInTheDocument();
    });
  });

  it("renders deal values formatted with commas", () => {
    render(
      <PipelineListView deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    expect(screen.getByText("$45,000")).toBeInTheDocument();
    expect(screen.getByText("$120,000")).toBeInTheDocument();
  });

  it("collapses a stage group when the header is clicked", async () => {
    const user = userEvent.setup();
    render(
      <PipelineListView deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );

    // "Enterprise Plan" is in the "Lead" stage and should be visible
    expect(screen.getByText("Enterprise Plan")).toBeInTheDocument();

    // Click the "Lead" stage header to collapse it
    const leadHeader = screen.getByText("Lead").closest("button")!;
    await user.click(leadHeader);

    // The deals within the Lead stage should now be hidden
    expect(screen.queryByText("Enterprise Plan")).not.toBeInTheDocument();
  });

  it("expands a collapsed stage group when the header is clicked again", async () => {
    const user = userEvent.setup();
    render(
      <PipelineListView deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );

    const leadHeader = screen.getByText("Lead").closest("button")!;

    // Collapse
    await user.click(leadHeader);
    expect(screen.queryByText("Enterprise Plan")).not.toBeInTheDocument();

    // Expand
    await user.click(leadHeader);
    expect(screen.getByText("Enterprise Plan")).toBeInTheDocument();
  });

  it("renders health score values for deals", () => {
    render(
      <PipelineListView deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    // Health score 82 from first deal
    expect(screen.getByText("82")).toBeInTheDocument();
  });

  it("renders the total value for each stage group", () => {
    render(
      <PipelineListView deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    // Lead stage total: 45000+12000+28000 = 85000 => $85K
    expect(screen.getByText("$85K")).toBeInTheDocument();
  });

  it("shows empty state text when a stage has no deals", () => {
    const singleDeal = [INITIAL_DEALS[0]]; // Only lead deal
    render(
      <PipelineListView deals={singleDeal} onDealMove={mockOnDealMove} />
    );
    const emptyMessages = screen.getAllByText("No deals in this stage");
    // 4 stages without deals should show this message
    expect(emptyMessages).toHaveLength(4);
  });

  it("renders Move deal buttons for each deal row", () => {
    render(
      <PipelineListView deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    const moveButtons = screen.getAllByLabelText("Move deal");
    expect(moveButtons.length).toBe(INITIAL_DEALS.length);
  });
});
