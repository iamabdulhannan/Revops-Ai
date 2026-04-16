import React from "react";
import { render, screen } from "@testing-library/react";
import { CTASection } from "../CTASection";

describe("CTASection", () => {
  it("renders the heading", () => {
    render(<CTASection />);
    expect(
      screen.getByText("Ready to See Your Revenue Clearly?")
    ).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<CTASection />);
    expect(
      screen.getByText(/Join hundreds of revenue teams/)
    ).toBeInTheDocument();
  });

  it("renders the Start Free Trial link", () => {
    render(<CTASection />);
    const link = screen.getByText("Start Free Trial");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/register");
  });

  it("has a black background section", () => {
    const { container } = render(<CTASection />);
    const section = container.querySelector(".bg-black");
    expect(section).toBeInTheDocument();
  });

  it("renders the heading in white text", () => {
    render(<CTASection />);
    const heading = screen.getByText("Ready to See Your Revenue Clearly?");
    expect(heading.className).toContain("text-white");
  });
});
