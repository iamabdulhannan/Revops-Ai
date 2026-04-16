import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";

describe("HeroSection", () => {
  it("renders the headline", () => {
    render(<HeroSection />);
    expect(
      screen.getByText("Stop Losing Revenue to Broken Handoffs")
    ).toBeInTheDocument();
  });

  it("renders the subheadline", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/One platform that connects your Marketing/)
    ).toBeInTheDocument();
  });

  it("renders the Get Started Free link", () => {
    render(<HeroSection />);
    const link = screen.getByText("Get Started Free");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/register");
  });

  it("renders the See Demo link", () => {
    render(<HeroSection />);
    const link = screen.getByText("See Demo");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/#features");
  });

  it("renders all four stat boxes", () => {
    render(<HeroSection />);
    expect(screen.getByText("20-30%")).toBeInTheDocument();
    expect(screen.getByText("10 Min")).toBeInTheDocument();
    expect(screen.getByText("300%+")).toBeInTheDocument();
    expect(screen.getByText("$5B+")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(<HeroSection />);
    expect(screen.getByText("Revenue Saved")).toBeInTheDocument();
    expect(screen.getByText("Setup Time")).toBeInTheDocument();
    expect(screen.getByText("RevOps Growth")).toBeInTheDocument();
    expect(screen.getByText("Market Size")).toBeInTheDocument();
  });
});
