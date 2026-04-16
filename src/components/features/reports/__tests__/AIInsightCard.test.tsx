import React from "react";
import { render, screen } from "@testing-library/react";
import { AIInsightCard } from "../AIInsightCard";

describe("AIInsightCard", () => {
  it("renders the title", () => {
    render(
      <AIInsightCard
        title="Revenue Highlights"
        content="Revenue increased by 18% QoQ."
      />
    );
    expect(screen.getByText("Revenue Highlights")).toBeInTheDocument();
  });

  it("renders the content", () => {
    render(
      <AIInsightCard
        title="Revenue Highlights"
        content="Revenue increased by 18% QoQ."
      />
    );
    expect(
      screen.getByText("Revenue increased by 18% QoQ.")
    ).toBeInTheDocument();
  });

  it("renders the AI Insight badge", () => {
    render(
      <AIInsightCard
        title="Test Title"
        content="Test content"
      />
    );
    expect(screen.getByText("AI Insight")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <AIInsightCard
        title="Test"
        content="Content"
        className="my-custom-class"
      />
    );
    expect(container.firstChild).toHaveClass("my-custom-class");
  });

  it("renders with long content text", () => {
    const longContent = "A".repeat(500);
    render(<AIInsightCard title="Title" content={longContent} />);
    expect(screen.getByText(longContent)).toBeInTheDocument();
  });
});
