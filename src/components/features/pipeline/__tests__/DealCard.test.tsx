import React from "react";
import { render, screen } from "@testing-library/react";
import { DealCard } from "../DealCard";
import type { Deal } from "@/types";

const baseDeal: Deal = {
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

describe("DealCard", () => {
  it("renders the deal title and company", () => {
    render(<DealCard deal={baseDeal} />);
    expect(screen.getByText("Enterprise Plan")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  });

  it("renders the formatted deal value", () => {
    render(<DealCard deal={baseDeal} />);
    expect(screen.getByText("$45,000")).toBeInTheDocument();
  });

  it("renders the assignee name", () => {
    render(<DealCard deal={baseDeal} />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders days in stage", () => {
    render(<DealCard deal={baseDeal} />);
    expect(screen.getByText("3d in stage")).toBeInTheDocument();
  });

  it("shows the health score in the title attribute", () => {
    render(<DealCard deal={baseDeal} />);
    expect(screen.getByTitle("Health: 82")).toBeInTheDocument();
  });

  it("uses green health color for scores >= 70", () => {
    render(<DealCard deal={{ ...baseDeal, healthScore: 85 }} />);
    const dot = screen.getByTitle("Health: 85");
    expect(dot.className).toContain("bg-success");
  });

  it("uses yellow health color for scores >= 40 and < 70", () => {
    render(<DealCard deal={{ ...baseDeal, healthScore: 55 }} />);
    const dot = screen.getByTitle("Health: 55");
    expect(dot.className).toContain("bg-warning");
  });

  it("uses red health color for scores < 40", () => {
    render(<DealCard deal={{ ...baseDeal, healthScore: 30 }} />);
    const dot = screen.getByTitle("Health: 30");
    expect(dot.className).toContain("bg-danger");
  });

  it("applies drag overlay styles when isDragOverlay is true", () => {
    const { container } = render(
      <DealCard deal={baseDeal} isDragOverlay />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("cursor-grabbing");
  });

  it("applies dragging styles when isDragging is true", () => {
    const { container } = render(
      <DealCard deal={baseDeal} isDragging />
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("opacity-30");
  });
});
