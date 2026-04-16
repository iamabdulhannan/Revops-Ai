import React from "react";
import { render, screen } from "@testing-library/react";
import { Spinner } from "../Spinner";

describe("Spinner", () => {
  it("renders with role status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has aria-label Loading", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  it("contains screen reader text", () => {
    render(<Spinner />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toHaveClass("sr-only");
  });

  it("applies spin animation", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveClass("animate-spin");
  });

  it("applies md size by default", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveClass("h-6", "w-6");
  });

  it("applies sm size styles", () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole("status")).toHaveClass("h-4", "w-4");
  });

  it("applies lg size styles", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveClass("h-8", "w-8");
  });

  it("has rounded-full border styling", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("rounded-full", "border-black", "border-t-transparent");
  });

  it("merges custom className", () => {
    render(<Spinner className="my-spinner" />);
    expect(screen.getByRole("status")).toHaveClass("my-spinner");
  });

  it("renders as inline-block", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveClass("inline-block");
  });
});
