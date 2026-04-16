import React from "react";
import { render, screen } from "@testing-library/react";
import { BoardReport } from "../BoardReport";

jest.mock("recharts", () => {
  const Original = jest.requireActual("recharts");
  return {
    ...Original,
    ResponsiveContainer: ({ children }: any) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

jest.mock("@/data/mock-data", () => ({
  getBoardMetrics: () => [
    { label: "ARR", value: "$2.4M", change: 18, changeLabel: "QoQ", trend: "up" },
    { label: "MRR", value: "$200K", change: 15, changeLabel: "vs last month", trend: "up" },
  ],
  getRevenueLineData: () => [
    { month: "Jan", revenue: 180000 },
    { month: "Feb", revenue: 200000 },
  ],
  getRevenueBarData: () => [
    { month: "Jan", newRevenue: 25000, churnedRevenue: 5000 },
  ],
  getAIInsight: () => "Revenue grew 18% quarter-over-quarter.",
}));

jest.mock("@/components/data-display/MetricCard", () => ({
  MetricCard: ({ label, value }: any) => (
    <div data-testid="metric-card">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  ),
}));

jest.mock("@/components/data-display/ChartCard", () => ({
  ChartCard: ({ title, children }: any) => (
    <div data-testid="chart-card">
      <span>{title}</span>
      {children}
    </div>
  ),
}));

jest.mock("@/components/data-display/RevenueLineChart", () => ({
  RevenueLineChart: () => <div data-testid="revenue-line-chart" />,
}));

jest.mock("@/components/data-display/RevenueBarChart", () => ({
  RevenueBarChart: () => <div data-testid="revenue-bar-chart" />,
}));

describe("BoardReport", () => {
  it("renders metric cards", () => {
    render(<BoardReport timeRange="3m" />);
    const metricCards = screen.getAllByTestId("metric-card");
    expect(metricCards).toHaveLength(2);
  });

  it("renders the ARR and MRR labels", () => {
    render(<BoardReport timeRange="3m" />);
    expect(screen.getByText("ARR")).toBeInTheDocument();
    expect(screen.getByText("MRR")).toBeInTheDocument();
  });

  it("renders chart cards", () => {
    render(<BoardReport timeRange="3m" />);
    const chartCards = screen.getAllByTestId("chart-card");
    expect(chartCards).toHaveLength(2);
  });

  it("renders Revenue Trend chart", () => {
    render(<BoardReport timeRange="3m" />);
    expect(screen.getByText("Revenue Trend")).toBeInTheDocument();
  });

  it("renders the AI insight card", () => {
    render(<BoardReport timeRange="3m" />);
    expect(screen.getByText("Revenue Highlights")).toBeInTheDocument();
    expect(
      screen.getByText("Revenue grew 18% quarter-over-quarter.")
    ).toBeInTheDocument();
  });
});
