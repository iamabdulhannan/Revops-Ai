import React from "react";
import { render, screen } from "@testing-library/react";
import { PipelineKanban } from "../PipelineKanban";
import { INITIAL_DEALS, STAGE_LABELS } from "../pipeline-data";
import type { Deal } from "@/types";

jest.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }: any) => <div data-testid="dnd-context">{children}</div>,
  DragOverlay: ({ children }: any) => <div data-testid="drag-overlay">{children}</div>,
  closestCorners: jest.fn(),
  useSensor: jest.fn(() => ({})),
  useSensors: jest.fn(() => []),
  useDroppable: jest.fn(() => ({ setNodeRef: jest.fn(), isOver: false })),
  MouseSensor: jest.fn(),
  TouchSensor: jest.fn(),
  KeyboardSensor: jest.fn(),
}));
jest.mock("@dnd-kit/sortable", () => ({
  SortableContext: ({ children }: any) => <div>{children}</div>,
  useSortable: jest.fn(() => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: undefined,
    isDragging: false,
  })),
  verticalListSortingStrategy: "vertical",
}));
jest.mock("@dnd-kit/utilities", () => ({
  CSS: { Transform: { toString: jest.fn(() => "") } },
}));

describe("PipelineKanban", () => {
  const mockOnDealMove = jest.fn();

  beforeEach(() => {
    mockOnDealMove.mockClear();
  });

  it("renders all stage labels", () => {
    render(
      <PipelineKanban deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    Object.values(STAGE_LABELS).forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("renders the DndContext wrapper", () => {
    render(
      <PipelineKanban deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    expect(screen.getByTestId("dnd-context")).toBeInTheDocument();
  });

  it("renders the DragOverlay wrapper", () => {
    render(
      <PipelineKanban deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    expect(screen.getByTestId("drag-overlay")).toBeInTheDocument();
  });

  it("renders all deal cards", () => {
    render(
      <PipelineKanban deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    INITIAL_DEALS.forEach((deal) => {
      expect(screen.getByText(deal.title)).toBeInTheDocument();
    });
  });

  it("shows the deal count badge for each stage", () => {
    render(
      <PipelineKanban deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    // lead has 3 deals, qualified has 3, proposal has 4, negotiation has 3, closed-won has 3
    expect(screen.getAllByText("3")).toHaveLength(4); // lead, qualified, negotiation, closed-won
    expect(screen.getByText("4")).toBeInTheDocument(); // proposal
  });

  it("displays total value per stage in thousands", () => {
    render(
      <PipelineKanban deals={INITIAL_DEALS} onDealMove={mockOnDealMove} />
    );
    // lead: 45000+12000+28000 = 85000 => $85K
    expect(screen.getByText("$85K")).toBeInTheDocument();
  });

  it("renders with an empty deals array without error", () => {
    render(<PipelineKanban deals={[]} onDealMove={mockOnDealMove} />);
    Object.values(STAGE_LABELS).forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
