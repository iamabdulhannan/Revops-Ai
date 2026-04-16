import React from "react";
import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<Badge>Status</Badge>);
    const badge = screen.getByText("Status");
    expect(badge.tagName).toBe("SPAN");
  });

  it("applies default variant styles", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge).toHaveClass("bg-grey-100", "text-grey-700");
  });

  it("applies success variant styles", () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText("Success");
    expect(badge).toHaveClass("bg-success-light", "text-success");
  });

  it("applies warning variant styles", () => {
    render(<Badge variant="warning">Warning</Badge>);
    const badge = screen.getByText("Warning");
    expect(badge).toHaveClass("bg-warning-light", "text-warning");
  });

  it("applies danger variant styles", () => {
    render(<Badge variant="danger">Danger</Badge>);
    const badge = screen.getByText("Danger");
    expect(badge).toHaveClass("bg-danger-light", "text-danger");
  });

  it("applies info variant styles", () => {
    render(<Badge variant="info">Info</Badge>);
    const badge = screen.getByText("Info");
    expect(badge).toHaveClass("bg-info-light", "text-info");
  });

  it("applies sm size styles", () => {
    render(<Badge size="sm">Small</Badge>);
    const badge = screen.getByText("Small");
    expect(badge).toHaveClass("px-1.5", "py-0.5", "text-2xs");
  });

  it("applies md size styles by default", () => {
    render(<Badge>Medium</Badge>);
    const badge = screen.getByText("Medium");
    expect(badge).toHaveClass("px-2.5", "py-1", "text-xs");
  });

  it("merges custom className", () => {
    render(<Badge className="my-custom-class">Custom</Badge>);
    const badge = screen.getByText("Custom");
    expect(badge).toHaveClass("my-custom-class");
  });

  it("always applies base classes", () => {
    render(<Badge>Base</Badge>);
    const badge = screen.getByText("Base");
    expect(badge).toHaveClass("inline-flex", "items-center", "font-semibold", "uppercase");
  });

  it("renders React node children", () => {
    render(
      <Badge>
        <strong>Bold</strong>
      </Badge>
    );
    expect(screen.getByText("Bold")).toBeInTheDocument();
  });
});
