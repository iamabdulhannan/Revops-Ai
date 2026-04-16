import React from "react";
import { render, screen } from "@testing-library/react";
import { CustomerProfile } from "../CustomerProfile";

describe("CustomerProfile", () => {
  const defaultProps = {
    name: "John Doe",
    company: "Acme Corp",
    mrr: 4200,
    healthScore: 82,
  };

  it("renders the customer name", () => {
    render(<CustomerProfile {...defaultProps} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders the company name", () => {
    render(<CustomerProfile {...defaultProps} />);
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  });

  it("renders the formatted MRR", () => {
    render(<CustomerProfile {...defaultProps} />);
    expect(screen.getByText("$4,200")).toBeInTheDocument();
  });

  it("renders the health score", () => {
    render(<CustomerProfile {...defaultProps} />);
    expect(screen.getByText("82/100")).toBeInTheDocument();
  });

  it("shows 'Healthy' label for health score >= 70", () => {
    render(<CustomerProfile {...defaultProps} healthScore={75} />);
    expect(screen.getByText("Healthy")).toBeInTheDocument();
  });

  it("shows 'At Risk' label for health score >= 40 and < 70", () => {
    render(<CustomerProfile {...defaultProps} healthScore={55} />);
    expect(screen.getByText("At Risk")).toBeInTheDocument();
  });

  it("shows 'Critical' label for health score < 40", () => {
    render(<CustomerProfile {...defaultProps} healthScore={25} />);
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });

  it("applies correct health color for healthy score", () => {
    const { container } = render(
      <CustomerProfile {...defaultProps} healthScore={80} />
    );
    const dot = container.querySelector(".bg-success");
    expect(dot).toBeInTheDocument();
  });

  it("applies correct health color for at-risk score", () => {
    const { container } = render(
      <CustomerProfile {...defaultProps} healthScore={50} />
    );
    const dot = container.querySelector(".bg-warning");
    expect(dot).toBeInTheDocument();
  });

  it("applies correct health color for critical score", () => {
    const { container } = render(
      <CustomerProfile {...defaultProps} healthScore={20} />
    );
    const dot = container.querySelector(".bg-danger");
    expect(dot).toBeInTheDocument();
  });
});
