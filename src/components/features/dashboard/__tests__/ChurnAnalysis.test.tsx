import React from "react";
import { render, screen } from "@testing-library/react";
import { ChurnAnalysis } from "../ChurnAnalysis";

describe("ChurnAnalysis", () => {
  it("renders the section heading", () => {
    render(<ChurnAnalysis />);
    expect(screen.getByText("Churn Analysis")).toBeInTheDocument();
  });

  it("displays the current churn rate", () => {
    render(<ChurnAnalysis />);
    expect(screen.getByText("3.2%")).toBeInTheDocument();
  });

  it("displays the previous quarter churn rate", () => {
    render(<ChurnAnalysis />);
    expect(screen.getByText("4.1%")).toBeInTheDocument();
  });

  it("shows the improvement percentage", () => {
    render(<ChurnAnalysis />);
    expect(screen.getByText("0.9% improvement")).toBeInTheDocument();
  });

  it("renders the 'At-Risk Accounts' label", () => {
    render(<ChurnAnalysis />);
    expect(screen.getByText("At-Risk Accounts")).toBeInTheDocument();
  });

  it("displays all three at-risk account names", () => {
    render(<ChurnAnalysis />);
    expect(screen.getByText("DataSync Ltd")).toBeInTheDocument();
    expect(screen.getByText("CloudOps Inc")).toBeInTheDocument();
    expect(screen.getByText("NetFlow Systems")).toBeInTheDocument();
  });

  it("displays risk scores for each account", () => {
    render(<ChurnAnalysis />);
    expect(screen.getByText("Risk: 87")).toBeInTheDocument();
    expect(screen.getByText("Risk: 74")).toBeInTheDocument();
    expect(screen.getByText("Risk: 68")).toBeInTheDocument();
  });

  it("displays monthly revenue for each account", () => {
    render(<ChurnAnalysis />);
    expect(screen.getByText("$4,200/mo")).toBeInTheDocument();
    expect(screen.getByText("$3,800/mo")).toBeInTheDocument();
    expect(screen.getByText("$2,900/mo")).toBeInTheDocument();
  });
});
