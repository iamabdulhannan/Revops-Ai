import React from "react";
import { render, screen } from "@testing-library/react";
import { ChatMessage } from "../ChatMessage";
import type { ChatMessage as ChatMessageType } from "@/types";

const userMessage: ChatMessageType = {
  id: "u1",
  role: "user",
  content: "Why did churn spike in January?",
  timestamp: "10:23 AM",
};

const assistantMessage: ChatMessageType = {
  id: "a1",
  role: "assistant",
  content:
    "January churn rose to 4.1%, primarily driven by 3 enterprise accounts.",
  timestamp: "10:23 AM",
};

describe("ChatMessage", () => {
  it("renders the message content", () => {
    render(<ChatMessage message={userMessage} />);
    expect(
      screen.getByText("Why did churn spike in January?")
    ).toBeInTheDocument();
  });

  it("renders the timestamp", () => {
    render(<ChatMessage message={userMessage} />);
    expect(screen.getByText("10:23 AM")).toBeInTheDocument();
  });

  it("applies user styling (justify-end) for user messages", () => {
    const { container } = render(<ChatMessage message={userMessage} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("justify-end");
  });

  it("applies assistant styling (justify-start) for assistant messages", () => {
    const { container } = render(<ChatMessage message={assistantMessage} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("justify-start");
  });

  it("applies dark background for user messages", () => {
    const { container } = render(<ChatMessage message={userMessage} />);
    const bubble = container.querySelector(".bg-black");
    expect(bubble).toBeInTheDocument();
  });

  it("applies light background for assistant messages", () => {
    const { container } = render(<ChatMessage message={assistantMessage} />);
    const bubble = container.querySelector(".bg-grey-50");
    expect(bubble).toBeInTheDocument();
  });

  it("renders assistant message content", () => {
    render(<ChatMessage message={assistantMessage} />);
    expect(
      screen.getByText(/January churn rose to 4.1%/)
    ).toBeInTheDocument();
  });
});
