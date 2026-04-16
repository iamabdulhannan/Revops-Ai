import React from "react";
import { render, screen } from "@testing-library/react";
import { SalesReport } from "../SalesReport";

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
  getSalesMetrics: () => [
    { label: "Pipeline Value", value: "$890K", change: 12, changeLabel: "QoQ", trend: "up" },
    { label: "Win Rate", value: "34%", change: 5, changeLabel: "vs last quarter", trend: "up" },
  ],
  getSalesFunnel: () => [
    { name: "Leads", value: 200, rate: 100 },
    { name: "Won", value: 50, rate: 25 },
  ],
  getRepPerformance: () => [
    { name: "Mike Ross", deals: 4, pipeline: 213000, winRate: 42, avgDealSize: 53250, velocity: 18 },
  ],
  getAIInsight: () => "Sales performance improved by 12%.",
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

jest.mock("@/components/data-display/DataTable", () => ({
  DataTable: ({ data }: any) => (
    <div data-testid="data-table">
      {data.map((row: any) => (
        <span key={row.name}>{row.name}</span>
      ))}
    </div>
  ),
}));

describe("SalesReport", () => {
  it("renders metric cards", () => {
    render(<SalesReport timeRange="3m" />);
    expect(screen.getAllByTestId("metric-card")).toHaveLength(2);
  });

  it("renders pipeline value and win rate", () => {
    render(<SalesReport timeRange="3m" />);
    expect(screen.getByText("Pipeline Value")).toBeInTheDocument();
    expect(screen.getByText("Win Rate")).toBeInTheDocument();
  });

  it("renders the Sales Funnel chart card", () => {
    render(<SalesReport timeRange="3m" />);
    expect(screen.getByText("Sales Funnel")).toBeInTheDocument();
  });

  it("renders the Rep Performance chart card", () => {
    render(<SalesReport timeRange="3m" />);
    expect(screen.getByText("Rep Performance")).toBeInTheDocument();
  });

  it("renders the AI insight", () => {
    render(<SalesReport timeRange="3m" />);
    expect(
      screen.getByText("Sales performance improved by 12%.")
    ).toBeInTheDocument();
  });

  it("renders the funnel chart with stage data", () => {
    render(<SalesReport timeRange="3m" />);
    expect(screen.getByText("Leads")).toBeInTheDocument();
    expect(screen.getByText("Won")).toBeInTheDocument();
  });
});
