import React from "react";
import { render, screen } from "@testing-library/react";
import { RecentActivity } from "../RecentActivity";

describe("RecentActivity", () => {
  it("renders the section heading", () => {
    render(<RecentActivity />);
    expect(screen.getByText("Recent Activity")).toBeInTheDocument();
  });

  it("renders all six activity items", () => {
    render(<RecentActivity />);
    expect(
      screen.getByText("New deal: Acme Corp - $45K")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Customer churned: DataSync Ltd")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Payment received: $12,500 from TechFlow")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Meeting scheduled: CloudOps renewal call")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Deal closed: NetBridge - $28K ARR")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Follow-up sent: Proposal to Orion Systems")
    ).toBeInTheDocument();
  });

  it("renders timestamps for each activity", () => {
    render(<RecentActivity />);
    expect(screen.getByText("2 min ago")).toBeInTheDocument();
    expect(screen.getByText("18 min ago")).toBeInTheDocument();
    expect(screen.getByText("1 hr ago")).toBeInTheDocument();
    expect(screen.getByText("2 hr ago")).toBeInTheDocument();
    expect(screen.getByText("4 hr ago")).toBeInTheDocument();
    expect(screen.getByText("5 hr ago")).toBeInTheDocument();
  });

  it("renders the 'View all activity' button", () => {
    render(<RecentActivity />);
    expect(
      screen.getByRole("button", { name: "View all activity" })
    ).toBeInTheDocument();
  });
});
