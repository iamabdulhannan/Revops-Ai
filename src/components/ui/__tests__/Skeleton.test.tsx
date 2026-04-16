import React from "react";
import { render } from "@testing-library/react";
import { Skeleton } from "../Skeleton";

describe("Skeleton", () => {
  it("renders a div element", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it("has aria-hidden true", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("applies base animation class", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("bg-grey-100", "animate-pulse-subtle");
  });

  it("applies text variant by default", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("h-4", "w-full", "rounded-sm");
  });

  it("applies circle variant styles", () => {
    const { container } = render(<Skeleton variant="circle" />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });

  it("applies rect variant styles", () => {
    const { container } = render(<Skeleton variant="rect" />);
    expect(container.firstChild).toHaveClass("rounded-sm");
  });

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="h-10 w-10" />);
    expect(container.firstChild).toHaveClass("h-10", "w-10");
  });

  it("does not have text variant classes when using circle variant", () => {
    const { container } = render(<Skeleton variant="circle" />);
    expect(container.firstChild).not.toHaveClass("h-4", "w-full");
  });

  it("renders without any visible text content", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveTextContent("");
  });
});
