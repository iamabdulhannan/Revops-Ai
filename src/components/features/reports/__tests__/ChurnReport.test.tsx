import React from "react";
import { render, screen } from "@testing-library/react";
import { ChurnReport } from "../ChurnReport";

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
  getChurnMetrics: () => [
    { label: "Churn Rate", value: "3.2%", change: -0.9, changeLabel: "vs last quarter", trend: "down" },
    { label: "At Risk", value: "8", change: 2, changeLabel: "accounts", trend: "up" },
  ],
  getChurnTrendData: () => [
    { month: "Jan", revenue: 4.1 },
    { month: "Feb", revenue: 3.2 },
  ],
  getAtRiskAccounts: () => [
    { name: "DataSync", healthScore: 32, mrr: 4200, riskFactor: "Usage drop", daysSinceActivity: 45 },
  ],
  getAIInsight: () => "Churn risk has decreased this quarter.",
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

jest.mock("@/components/data-display/DataTable", () => ({
  DataTable: ({ data }: any) => (
    <div data-testid="data-table">
      {data.map((row: any) => (
        <span key={row.name}>{row.name}</span>
      ))}
    </div>
  ),
}));

describe("ChurnReport", () => {
  it("renders churn metric cards", () => {
    render(<ChurnReport timeRange="3m" />);
    expect(screen.getAllByTestId("metric-card")).toHaveLength(2);
  });

  it("renders the Churn Rate Trend chart", () => {
    render(<ChurnReport timeRange="3m" />);
    expect(screen.getByText("Churn Rate Trend")).toBeInTheDocument();
  });

  it("renders the At-Risk Accounts chart card", () => {
    render(<ChurnReport timeRange="3m" />);
    expect(screen.getByText("At-Risk Accounts")).toBeInTheDocument();
  });

  it("renders recovery playbooks section", () => {
    render(<ChurnReport timeRange="3m" />);
    expect(screen.getByText("Recovery Playbooks")).toBeInTheDocument();
    expect(screen.getByText("Churn Prevention")).toBeInTheDocument();
    expect(screen.getByText("Win-Back Campaign")).toBeInTheDocument();
    expect(screen.getByText("Executive Escalation")).toBeInTheDocument();
  });

  it("renders the accounts saved count for each playbook", () => {
    render(<ChurnReport timeRange="3m" />);
    expect(screen.getByText("18 accounts saved")).toBeInTheDocument();
    expect(screen.getByText("6 accounts saved")).toBeInTheDocument();
    expect(screen.getByText("4 accounts saved")).toBeInTheDocument();
  });

  it("renders the AI insight", () => {
    render(<ChurnReport timeRange="3m" />);
    expect(
      screen.getByText("Churn risk has decreased this quarter.")
    ).toBeInTheDocument();
  });
});
