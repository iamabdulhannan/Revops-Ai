import React from "react";
import { render, screen } from "@testing-library/react";
import { RevenueLineChart } from "../RevenueLineChart";

jest.mock("recharts", () => {
  const Original = jest.requireActual("recharts");
  return {
    ...Original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

describe("RevenueLineChart", () => {
  it("renders the responsive container", () => {
    render(<RevenueLineChart />);
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
  });

  it("renders with default data when no data prop is provided", () => {
    const { container } = render(<RevenueLineChart />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom data", () => {
    const customData = [
      { month: "Jan", revenue: 100000 },
      { month: "Feb", revenue: 120000 },
    ];
    const { container } = render(<RevenueLineChart data={customData} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<RevenueLineChart className="line-class" />);
    expect(container.firstChild).toHaveClass("line-class");
  });

  it("renders inside a container with the correct height class", () => {
    const { container } = render(<RevenueLineChart />);
    expect(container.firstChild).toHaveClass("h-[300px]");
  });
});
