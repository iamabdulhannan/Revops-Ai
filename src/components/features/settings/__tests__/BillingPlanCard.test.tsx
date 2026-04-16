import React from "react";
import { render, screen } from "@testing-library/react";
import { BillingPlanCard } from "../BillingPlanCard";

describe("BillingPlanCard", () => {
  const defaultProps = {
    name: "Growth",
    price: "$349",
    features: ["Up to 5,000 contacts", "10 integrations", "AI forecasting"],
    current: false,
  };

  it("renders the plan name", () => {
    render(<BillingPlanCard {...defaultProps} />);
    expect(screen.getByText("Growth")).toBeInTheDocument();
  });

  it("renders the price", () => {
    render(<BillingPlanCard {...defaultProps} />);
    expect(screen.getByText("$349")).toBeInTheDocument();
  });

  it("renders 'per month' text", () => {
    render(<BillingPlanCard {...defaultProps} />);
    expect(screen.getByText("per month")).toBeInTheDocument();
  });

  it("renders all features", () => {
    render(<BillingPlanCard {...defaultProps} />);
    expect(screen.getByText("Up to 5,000 contacts")).toBeInTheDocument();
    expect(screen.getByText("10 integrations")).toBeInTheDocument();
    expect(screen.getByText("AI forecasting")).toBeInTheDocument();
  });

  it("shows Upgrade button when not the current plan", () => {
    render(<BillingPlanCard {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: "Upgrade" })
    ).toBeInTheDocument();
  });

  it("shows 'Current Plan' text when it is the current plan", () => {
    render(<BillingPlanCard {...defaultProps} current={true} />);
    expect(screen.getByText("Current Plan")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Upgrade" })).not.toBeInTheDocument();
  });

  it("applies border-black for current plan", () => {
    const { container } = render(
      <BillingPlanCard {...defaultProps} current={true} />
    );
    expect(container.firstChild).toHaveClass("border-black");
  });

  it("applies border-border for non-current plan", () => {
    const { container } = render(
      <BillingPlanCard {...defaultProps} current={false} />
    );
    expect(container.firstChild).toHaveClass("border-border");
  });
});
