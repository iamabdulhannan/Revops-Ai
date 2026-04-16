import React from "react";
import { render, screen } from "@testing-library/react";
import { RevenueOverview } from "../RevenueOverview";

describe("RevenueOverview", () => {
  it("renders all four metric labels", () => {
    render(<RevenueOverview />);
    expect(
      screen.getByText("Annual Recurring Revenue")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Monthly Recurring Revenue")
    ).toBeInTheDocument();
    expect(screen.getByText("Churn Rate")).toBeInTheDocument();
    expect(screen.getByText("Pipeline")).toBeInTheDocument();
  });

  it("renders all four metric values", () => {
    render(<RevenueOverview />);
    expect(screen.getByText("$2.4M")).toBeInTheDocument();
    expect(screen.getByText("$200K")).toBeInTheDocument();
    expect(screen.getByText("3.2%")).toBeInTheDocument();
    expect(screen.getByText("$890K")).toBeInTheDocument();
  });

  it("renders change values", () => {
    render(<RevenueOverview />);
    expect(screen.getByText("+18%")).toBeInTheDocument();
    expect(screen.getByText("+$18K")).toBeInTheDocument();
    expect(screen.getByText("-0.9%")).toBeInTheDocument();
    expect(screen.getByText("42 deals")).toBeInTheDocument();
  });

  it("renders change labels", () => {
    render(<RevenueOverview />);
    expect(screen.getByText("QoQ")).toBeInTheDocument();
    expect(screen.getByText("vs last month")).toBeInTheDocument();
    expect(screen.getByText("vs last quarter")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
  });

  it("renders four metric cards", () => {
    const { container } = render(<RevenueOverview />);
    const cards = container.querySelectorAll(".shadow-card");
    expect(cards).toHaveLength(4);
  });
});
