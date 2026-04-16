import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Input label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("does not render label when not provided", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.queryByRole("label")).not.toBeInTheDocument();
  });

  it("associates label with input using htmlFor and id", () => {
    render(<Input label="Username" id="username-input" />);
    const label = screen.getByText("Username");
    expect(label).toHaveAttribute("for", "username-input");
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "username-input");
  });

  it("generates a unique id when no id prop is given", () => {
    render(<Input label="Field" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id");
    expect(input.getAttribute("id")).not.toBe("");
  });

  it("displays error message", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("This field is required");
  });

  it("sets aria-invalid when error is present", () => {
    render(<Input error="Error text" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid without error", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("sets aria-describedby when error is present", () => {
    render(<Input error="Error" id="test-input" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "test-input-error");
  });

  it("renders icon when provided", () => {
    render(<Input icon={<span data-testid="icon">@</span>} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies pl-9 class when icon is present", () => {
    render(<Input icon={<span>icon</span>} />);
    expect(screen.getByRole("textbox")).toHaveClass("pl-9");
  });

  it("forwards ref to input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("handles user typing", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    await user.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("supports disabled state", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("merges custom className onto the input element", () => {
    render(<Input className="custom-input" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-input");
  });

  it("applies error border class when error is present", () => {
    render(<Input error="Error" />);
    expect(screen.getByRole("textbox")).toHaveClass("border-danger");
  });
});
