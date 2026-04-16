import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatInput } from "../ChatInput";

describe("ChatInput", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders the textarea with placeholder", () => {
    render(<ChatInput onSubmit={mockOnSubmit} />);
    expect(
      screen.getByPlaceholderText("Ask anything about your revenue...")
    ).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ChatInput onSubmit={mockOnSubmit} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
  });

  it("disables the submit button when textarea is empty", () => {
    render(<ChatInput onSubmit={mockOnSubmit} />);
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeDisabled();
  });

  it("enables the submit button when textarea has content", async () => {
    const user = userEvent.setup();
    render(<ChatInput onSubmit={mockOnSubmit} />);
    const textarea = screen.getByPlaceholderText(
      "Ask anything about your revenue..."
    );
    await user.type(textarea, "Hello");
    const submitButton = screen.getByRole("button");
    expect(submitButton).not.toBeDisabled();
  });

  it("calls onSubmit with trimmed text when button is clicked", async () => {
    const user = userEvent.setup();
    render(<ChatInput onSubmit={mockOnSubmit} />);
    const textarea = screen.getByPlaceholderText(
      "Ask anything about your revenue..."
    );
    await user.type(textarea, "  Test message  ");
    await user.click(screen.getByRole("button"));
    expect(mockOnSubmit).toHaveBeenCalledWith("Test message");
  });

  it("clears the textarea after successful submit", async () => {
    const user = userEvent.setup();
    render(<ChatInput onSubmit={mockOnSubmit} />);
    const textarea = screen.getByPlaceholderText(
      "Ask anything about your revenue..."
    ) as HTMLTextAreaElement;
    await user.type(textarea, "Test");
    await user.click(screen.getByRole("button"));
    expect(textarea.value).toBe("");
  });

  it("submits on Enter key press", async () => {
    const user = userEvent.setup();
    render(<ChatInput onSubmit={mockOnSubmit} />);
    const textarea = screen.getByPlaceholderText(
      "Ask anything about your revenue..."
    );
    await user.type(textarea, "Enter test{Enter}");
    expect(mockOnSubmit).toHaveBeenCalledWith("Enter test");
  });

  it("does not submit on Shift+Enter (allows new line)", async () => {
    const user = userEvent.setup();
    render(<ChatInput onSubmit={mockOnSubmit} />);
    const textarea = screen.getByPlaceholderText(
      "Ask anything about your revenue..."
    );
    await user.type(textarea, "Line 1{Shift>}{Enter}{/Shift}Line 2");
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("does not submit when textarea has only whitespace", async () => {
    const user = userEvent.setup();
    render(<ChatInput onSubmit={mockOnSubmit} />);
    const textarea = screen.getByPlaceholderText(
      "Ask anything about your revenue..."
    );
    await user.type(textarea, "   ");
    await user.click(screen.getByRole("button"));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
