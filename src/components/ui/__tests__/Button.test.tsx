import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("defaults to type button", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("accepts type submit", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("applies primary variant styles by default", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("bg-black", "text-white");
  });

  it("applies secondary variant styles", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("bg-white", "text-black");
  });

  it("applies ghost variant styles", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("bg-transparent", "text-grey-700");
  });

  it("applies danger variant styles", () => {
    render(<Button variant="danger">Danger</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("bg-danger", "text-white");
  });

  it("applies md size styles by default", () => {
    render(<Button>Default Size</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("h-10", "px-5", "text-sm");
  });

  it("applies sm size styles", () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("h-8", "px-3", "text-xs");
  });

  it("applies lg size styles", () => {
    render(<Button size="lg">Large</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("h-12", "px-7", "text-base");
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when loading is true", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows spinner SVG when loading", () => {
    render(<Button loading>Loading</Button>);
    const btn = screen.getByRole("button");
    const svg = btn.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("animate-spin");
  });

  it("does not show spinner when not loading", () => {
    render(<Button>Not Loading</Button>);
    const btn = screen.getByRole("button");
    const svg = btn.querySelector("svg");
    expect(svg).not.toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<Button className="extra-class">Custom</Button>);
    expect(screen.getByRole("button")).toHaveClass("extra-class");
  });

  it("forwards additional HTML button attributes", () => {
    render(<Button data-testid="custom-btn" aria-label="Custom action">Action</Button>);
    expect(screen.getByTestId("custom-btn")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Custom action");
  });
});
