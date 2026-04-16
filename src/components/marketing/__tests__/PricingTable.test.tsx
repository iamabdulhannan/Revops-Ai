import React from "react";
import { render, screen } from "@testing-library/react";
import { PricingTable } from "../PricingTable";

describe("PricingTable", () => {
  it("renders the section heading", () => {
    render(<PricingTable />);
    expect(
      screen.getByText("Simple, Transparent Pricing")
    ).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<PricingTable />);
    expect(
      screen.getByText(/Start free and scale as your revenue operations grow/)
    ).toBeInTheDocument();
  });

  it("renders all four plan names", () => {
    render(<PricingTable />);
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Growth")).toBeInTheDocument();
    expect(screen.getByText("Scale")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("renders plan prices", () => {
    render(<PricingTable />);
    expect(screen.getByText("$99")).toBeInTheDocument();
    expect(screen.getByText("$349")).toBeInTheDocument();
    expect(screen.getByText("$899")).toBeInTheDocument();
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("renders plan audience descriptions", () => {
    render(<PricingTable />);
    expect(screen.getByText("For early-stage startups")).toBeInTheDocument();
    expect(screen.getByText("For scaling teams")).toBeInTheDocument();
    expect(screen.getByText("For revenue teams")).toBeInTheDocument();
    expect(screen.getByText("For large organizations")).toBeInTheDocument();
  });

  it("renders CTA links for all plans", () => {
    render(<PricingTable />);
    const getStartedLinks = screen.getAllByText("Get Started");
    expect(getStartedLinks).toHaveLength(3);
    expect(screen.getByText("Contact Sales")).toBeInTheDocument();
  });

  it("renders feature lists for plans", () => {
    render(<PricingTable />);
    expect(screen.getByText("Up to 500 contacts")).toBeInTheDocument();
    expect(screen.getByText("AI forecasting")).toBeInTheDocument();
    expect(screen.getByText("Unlimited contacts")).toBeInTheDocument();
    expect(screen.getByText("SSO & SCIM")).toBeInTheDocument();
  });

  it("applies featured styling to Growth plan", () => {
    const { container } = render(<PricingTable />);
    const featuredCard = container.querySelector(".border-black.shadow-card-hover");
    expect(featuredCard).toBeInTheDocument();
  });

  it("has the pricing section id", () => {
    const { container } = render(<PricingTable />);
    const section = container.querySelector("#pricing");
    expect(section).toBeInTheDocument();
  });

  it("links Enterprise to /about page", () => {
    render(<PricingTable />);
    const contactSalesLink = screen.getByText("Contact Sales");
    expect(contactSalesLink.closest("a")).toHaveAttribute("href", "/about");
  });
});
