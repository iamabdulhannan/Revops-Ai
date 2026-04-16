import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatContainer } from "../ChatContainer";

describe("ChatContainer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders initial messages", () => {
    render(<ChatContainer />);
    expect(
      screen.getByText("Why did churn spike in January?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Which rep has the best pipeline?")
    ).toBeInTheDocument();
  });

  it("renders initial assistant responses", () => {
    render(<ChatContainer />);
    expect(
      screen.getByText(/January churn rose to 4.1%/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Mike Ross leads with \$213K/)
    ).toBeInTheDocument();
  });

  it("renders the chat input area", () => {
    render(<ChatContainer />);
    expect(
      screen.getByPlaceholderText("Ask anything about your revenue...")
    ).toBeInTheDocument();
  });

  it("adds a user message when text is submitted", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ChatContainer />);

    const textarea = screen.getByPlaceholderText(
      "Ask anything about your revenue..."
    );
    await user.type(textarea, "New test question");
    await user.click(screen.getByRole("button"));

    expect(screen.getByText("New test question")).toBeInTheDocument();
  });

  it("adds an assistant response after a delay", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ChatContainer />);

    const textarea = screen.getByPlaceholderText(
      "Ask anything about your revenue..."
    );
    await user.type(textarea, "Test query");
    await user.click(screen.getByRole("button"));

    // Advance timer by 800ms to trigger the assistant response
    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(
      screen.getByText(/I am analyzing your data/)
    ).toBeInTheDocument();
  });

  it("renders four initial messages", () => {
    render(<ChatContainer />);
    // There are 2 user + 2 assistant = 4 initial messages
    const messages = screen.getAllByText(/10:2[35] AM/);
    expect(messages).toHaveLength(4);
  });
});
