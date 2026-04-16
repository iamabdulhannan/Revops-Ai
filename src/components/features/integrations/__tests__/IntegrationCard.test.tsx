import React from "react";
import { render, screen } from "@testing-library/react";
import { IntegrationCard } from "../IntegrationCard";
import type { Integration } from "@/types";

const connectedIntegration: Integration = {
  id: "int-1",
  name: "Salesforce",
  description: "Sync your CRM data bi-directionally.",
  category: "crm",
  connected: true,
  logo: "SF",
};

const disconnectedIntegration: Integration = {
  id: "int-2",
  name: "Stripe",
  description: "Track billing and payments.",
  category: "billing",
  connected: false,
  logo: "ST",
};

describe("IntegrationCard", () => {
  it("renders the integration name", () => {
    render(<IntegrationCard integration={connectedIntegration} />);
    expect(screen.getByText("Salesforce")).toBeInTheDocument();
  });

  it("renders the integration description", () => {
    render(<IntegrationCard integration={connectedIntegration} />);
    expect(
      screen.getByText("Sync your CRM data bi-directionally.")
    ).toBeInTheDocument();
  });

  it("renders the category badge", () => {
    render(<IntegrationCard integration={connectedIntegration} />);
    expect(screen.getByText("crm")).toBeInTheDocument();
  });

  it("renders the logo text", () => {
    render(<IntegrationCard integration={connectedIntegration} />);
    expect(screen.getByText("SF")).toBeInTheDocument();
  });

  it("shows Connected badge when connected", () => {
    render(<IntegrationCard integration={connectedIntegration} />);
    expect(screen.getByText("Connected")).toBeInTheDocument();
  });

  it("does not show Connect button when connected", () => {
    render(<IntegrationCard integration={connectedIntegration} />);
    expect(
      screen.queryByRole("button", { name: "Connect" })
    ).not.toBeInTheDocument();
  });

  it("shows Connect button when not connected", () => {
    render(<IntegrationCard integration={disconnectedIntegration} />);
    expect(
      screen.getByRole("button", { name: "Connect" })
    ).toBeInTheDocument();
  });

  it("does not show Connected badge when not connected", () => {
    render(<IntegrationCard integration={disconnectedIntegration} />);
    expect(screen.queryByText("Connected")).not.toBeInTheDocument();
  });

  it("renders billing category badge correctly", () => {
    render(<IntegrationCard integration={disconnectedIntegration} />);
    expect(screen.getByText("billing")).toBeInTheDocument();
  });
});
