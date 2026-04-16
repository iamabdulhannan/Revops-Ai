import React from "react";
import { render, screen } from "@testing-library/react";
import { MarketingReport } from "../MarketingReport";

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
  getMarketingMetrics: () => [
    { label: "Total Leads", value: "1,240", change: 22, changeLabel: "QoQ", trend: "up" },
    { label: "CAC", value: "$142", change: -8, changeLabel: "vs last quarter", trend: "down" },
  ],
  getChannelPerformance: () => [
    { channel: "Organic", leads: 450, spend: 0 },
    { channel: "Paid", leads: 320, spend: 12000 },
  ],
  getMarketingFunnel: () => [
    { name: "Visitors", value: 10000, rate: 100 },
    { name: "Leads", value: 1200, rate: 12 },
  ],
  getCampaignROI: () => [
    { name: "Spring Campaign", channel: "Email", spend: 5000, leads: 200, conversions: 40, roi: 320 },
  ],
  getAIInsight: () => "Organic channel is the top performer.",
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

describe("MarketingReport", () => {
  it("renders metric cards", () => {
    render(<MarketingReport timeRange="3m" />);
    expect(screen.getAllByTestId("metric-card")).toHaveLength(2);
  });

  it("renders Total Leads and CAC labels", () => {
    render(<MarketingReport timeRange="3m" />);
    expect(screen.getByText("Total Leads")).toBeInTheDocument();
    expect(screen.getByText("CAC")).toBeInTheDocument();
  });

  it("renders the Channel Performance chart", () => {
    render(<MarketingReport timeRange="3m" />);
    expect(screen.getByText("Channel Performance")).toBeInTheDocument();
  });

  it("renders the Marketing Funnel chart", () => {
    render(<MarketingReport timeRange="3m" />);
    expect(screen.getByText("Marketing Funnel")).toBeInTheDocument();
  });

  it("renders the Campaign ROI table", () => {
    render(<MarketingReport timeRange="3m" />);
    expect(screen.getByText("Campaign ROI")).toBeInTheDocument();
    expect(screen.getByText("Spring Campaign")).toBeInTheDocument();
  });

  it("renders the AI insight", () => {
    render(<MarketingReport timeRange="3m" />);
    expect(
      screen.getByText("Organic channel is the top performer.")
    ).toBeInTheDocument();
  });

  it("renders funnel stages", () => {
    render(<MarketingReport timeRange="3m" />);
    expect(screen.getByText("Visitors")).toBeInTheDocument();
  });
});
