import React from "react";
import { render, screen } from "@testing-library/react";
import { RevenueBarChart } from "../RevenueBarChart";

jest.mock("recharts", () => {
  const Original = jest.requireActual("recharts");
  return {
    ...Original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

describe("RevenueBarChart", () => {
  it("renders the responsive container", () => {
    render(<RevenueBarChart />);
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
  });

  it("renders with default data when no data prop is provided", () => {
    const { container } = render(<RevenueBarChart />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom data", () => {
    const customData = [
      { month: "Jan", newRevenue: 10000, churnedRevenue: 2000 },
      { month: "Feb", newRevenue: 15000, churnedRevenue: 3000 },
    ];
    const { container } = render(<RevenueBarChart data={customData} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<RevenueBarChart className="bar-class" />);
    expect(container.firstChild).toHaveClass("bar-class");
  });

  it("renders the BarChart component", () => {
    const { container } = render(<RevenueBarChart />);
    const barChart = container.querySelector(".recharts-wrapper");
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
  });
});
