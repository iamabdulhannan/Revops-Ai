import { render, screen } from "@testing-library/react";
import { MarketingFooter } from "../MarketingFooter";

describe("MarketingFooter", () => {
  it("renders all four column headings", () => {
    render(<MarketingFooter />);
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("renders Product column links", () => {
    render(<MarketingFooter />);
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Integrations")).toBeInTheDocument();
    expect(screen.getByText("Changelog")).toBeInTheDocument();
  });

  it("renders Company column links", () => {
    render(<MarketingFooter />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Careers")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders Resources column links", () => {
    render(<MarketingFooter />);
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(screen.getByText("API Reference")).toBeInTheDocument();
    expect(screen.getByText("Help Center")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders Legal column links", () => {
    render(<MarketingFooter />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Cookie Policy")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
  });

  it("renders copyright text with current year", () => {
    render(<MarketingFooter />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`\u00A9 ${year} RevOps AI. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("renders 'Built by Orbiqon' link", () => {
    render(<MarketingFooter />);
    const orbiqonLink = screen.getByText("Orbiqon");
    expect(orbiqonLink.closest("a")).toHaveAttribute(
      "href",
      "https://orbiqon.com"
    );
    expect(orbiqonLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(orbiqonLink.closest("a")).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );
  });

  it("renders as a footer element", () => {
    render(<MarketingFooter />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("all column links are anchor elements", () => {
    render(<MarketingFooter />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(17);
  });

  it("Features link points to /#features", () => {
    render(<MarketingFooter />);
    const link = screen.getByText("Features").closest("a");
    expect(link).toHaveAttribute("href", "/#features");
  });
});
