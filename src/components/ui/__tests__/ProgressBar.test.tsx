import React from "react";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "../ProgressBar";

describe("ProgressBar", () => {
  it("renders a progressbar element", () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets aria-valuenow to the provided value", () => {
    render(<ProgressBar value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
  });

  it("sets aria-valuemin to 0", () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemin", "0");
  });

  it("sets aria-valuemax to 100", () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "100");
  });

  it("clamps value to 0 when negative", () => {
    render(<ProgressBar value={-10} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("clamps value to 100 when exceeding 100", () => {
    render(<ProgressBar value={150} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });

  it("sets the inner bar width style based on value", () => {
    render(<ProgressBar value={60} />);
    const progressbar = screen.getByRole("progressbar");
    const innerBar = progressbar.firstChild as HTMLElement;
    expect(innerBar).toHaveStyle({ width: "60%" });
  });

  it("does not show label by default", () => {
    render(<ProgressBar value={50} />);
    expect(screen.queryByText("50%")).not.toBeInTheDocument();
  });

  it("shows percentage label when showLabel is true", () => {
    render(<ProgressBar value={50} showLabel />);
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("rounds label to nearest integer", () => {
    render(<ProgressBar value={33.7} showLabel />);
    expect(screen.getByText("34%")).toBeInTheDocument();
  });

  it("applies default color (bg-black)", () => {
    render(<ProgressBar value={50} />);
    const progressbar = screen.getByRole("progressbar");
    const innerBar = progressbar.firstChild as HTMLElement;
    expect(innerBar).toHaveClass("bg-black");
  });

  it("applies success color", () => {
    render(<ProgressBar value={50} color="success" />);
    const progressbar = screen.getByRole("progressbar");
    const innerBar = progressbar.firstChild as HTMLElement;
    expect(innerBar).toHaveClass("bg-success");
  });

  it("applies warning color", () => {
    render(<ProgressBar value={50} color="warning" />);
    const progressbar = screen.getByRole("progressbar");
    const innerBar = progressbar.firstChild as HTMLElement;
    expect(innerBar).toHaveClass("bg-warning");
  });

  it("applies danger color", () => {
    render(<ProgressBar value={50} color="danger" />);
    const progressbar = screen.getByRole("progressbar");
    const innerBar = progressbar.firstChild as HTMLElement;
    expect(innerBar).toHaveClass("bg-danger");
  });

  it("merges custom className", () => {
    const { container } = render(<ProgressBar value={50} className="my-progress" />);
    expect(container.firstChild).toHaveClass("my-progress");
  });
});
