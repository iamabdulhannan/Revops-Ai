import React from "react";
import { render, screen } from "@testing-library/react";
import { IntegrationLogos } from "../IntegrationLogos";

describe("IntegrationLogos", () => {
  it("renders the section heading", () => {
    render(<IntegrationLogos />);
    expect(
      screen.getByText("Connects With Your Favorite Tools")
    ).toBeInTheDocument();
  });

  it("renders all six integration names", () => {
    render(<IntegrationLogos />);
    expect(screen.getByText("HubSpot")).toBeInTheDocument();
    expect(screen.getByText("Salesforce")).toBeInTheDocument();
    expect(screen.getByText("Stripe")).toBeInTheDocument();
    expect(screen.getByText("Intercom")).toBeInTheDocument();
    expect(screen.getByText("Slack")).toBeInTheDocument();
    expect(screen.getByText("Google Analytics")).toBeInTheDocument();
  });

  it("has the integrations section id", () => {
    const { container } = render(<IntegrationLogos />);
    const section = container.querySelector("#integrations");
    expect(section).toBeInTheDocument();
  });

  it("renders six badge elements", () => {
    const { container } = render(<IntegrationLogos />);
    const badges = container.querySelectorAll(".rounded-pill");
    expect(badges).toHaveLength(6);
  });
});
