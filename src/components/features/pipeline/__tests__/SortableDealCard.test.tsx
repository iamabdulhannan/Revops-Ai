import React from "react";
import { render, screen } from "@testing-library/react";
import { SortableDealCard } from "../SortableDealCard";
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

const deal: Deal = {
  id: "d1",
  title: "Enterprise Plan",
  company: "Acme Corp",
  value: 45000,
  stage: "lead",
  healthScore: 82,
  assignee: "Sarah Chen",
  lastActivity: "2h ago",
  daysInStage: 3,
};

describe("SortableDealCard", () => {
  it("renders the underlying DealCard with deal data", () => {
    render(<SortableDealCard deal={deal} />);
    expect(screen.getByText("Enterprise Plan")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("$45,000")).toBeInTheDocument();
  });

  it("calls useSortable with the deal id", () => {
    const { useSortable } = require("@dnd-kit/sortable");
    render(<SortableDealCard deal={deal} />);
    expect(useSortable).toHaveBeenCalledWith({ id: "d1" });
  });

  it("calls CSS.Transform.toString with the transform value", () => {
    const { CSS } = require("@dnd-kit/utilities");
    render(<SortableDealCard deal={deal} />);
    expect(CSS.Transform.toString).toHaveBeenCalledWith(null);
  });

  it("renders the deal assignee", () => {
    render(<SortableDealCard deal={deal} />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders the health score indicator", () => {
    render(<SortableDealCard deal={deal} />);
    expect(screen.getByTitle("Health: 82")).toBeInTheDocument();
  });
});
