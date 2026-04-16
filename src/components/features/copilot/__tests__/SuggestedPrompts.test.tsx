import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SuggestedPrompts } from "../SuggestedPrompts";

describe("SuggestedPrompts", () => {
  it("renders all four prompt buttons", () => {
    render(<SuggestedPrompts />);
    expect(
      screen.getByText("Why did churn spike?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Pipeline health summary")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Top performing campaigns")
    ).toBeInTheDocument();
    expect(screen.getByText("Revenue forecast")).toBeInTheDocument();
  });

  it("renders four buttons", () => {
    render(<SuggestedPrompts />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(4);
  });

  it("calls onSelect with the prompt text when a button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnSelect = jest.fn();
    render(<SuggestedPrompts onSelect={mockOnSelect} />);

    await user.click(screen.getByText("Why did churn spike?"));
    expect(mockOnSelect).toHaveBeenCalledWith("Why did churn spike?");
  });

  it("calls onSelect for each different prompt", async () => {
    const user = userEvent.setup();
    const mockOnSelect = jest.fn();
    render(<SuggestedPrompts onSelect={mockOnSelect} />);

    await user.click(screen.getByText("Revenue forecast"));
    expect(mockOnSelect).toHaveBeenCalledWith("Revenue forecast");

    await user.click(screen.getByText("Pipeline health summary"));
    expect(mockOnSelect).toHaveBeenCalledWith("Pipeline health summary");
  });

  it("renders without errors when onSelect is not provided", () => {
    render(<SuggestedPrompts />);
    expect(screen.getByText("Why did churn spike?")).toBeInTheDocument();
  });

  it("does not throw when a button is clicked and onSelect is undefined", async () => {
    const user = userEvent.setup();
    render(<SuggestedPrompts />);
    // Should not throw
    await user.click(screen.getByText("Why did churn spike?"));
  });
});
