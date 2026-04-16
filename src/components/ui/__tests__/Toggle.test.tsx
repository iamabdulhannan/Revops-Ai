import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "../Toggle";

describe("Toggle", () => {
  const defaultProps = {
    checked: false,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a switch element", () => {
    render(<Toggle {...defaultProps} />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("sets aria-checked to false when unchecked", () => {
    render(<Toggle {...defaultProps} checked={false} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("sets aria-checked to true when checked", () => {
    render(<Toggle {...defaultProps} checked={true} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("renders label text when provided", () => {
    render(<Toggle {...defaultProps} label="Enable notifications" />);
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
  });

  it("does not render label text when not provided", () => {
    const { container } = render(<Toggle {...defaultProps} />);
    const labelSpan = container.querySelector("label > span.text-sm");
    expect(labelSpan).not.toBeInTheDocument();
  });

  it("calls onChange with true when toggling from unchecked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Toggle checked={false} onChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange with false when toggling from checked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Toggle checked={true} onChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("does not call onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Toggle checked={false} onChange={onChange} disabled />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("disables the button when disabled prop is true", () => {
    render(<Toggle {...defaultProps} disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("applies checked styles when checked", () => {
    render(<Toggle {...defaultProps} checked={true} />);
    expect(screen.getByRole("switch")).toHaveClass("bg-black");
  });

  it("applies unchecked styles when not checked", () => {
    render(<Toggle {...defaultProps} checked={false} />);
    expect(screen.getByRole("switch")).toHaveClass("bg-grey-300");
  });

  it("applies opacity-50 when disabled", () => {
    const { container } = render(<Toggle {...defaultProps} disabled />);
    const label = container.querySelector("label");
    expect(label).toHaveClass("opacity-50");
  });

  it("merges custom className", () => {
    const { container } = render(<Toggle {...defaultProps} className="my-toggle" />);
    const label = container.querySelector("label");
    expect(label).toHaveClass("my-toggle");
  });
});
