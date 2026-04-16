import { render, screen } from "@testing-library/react";
import { TimelineEventCard } from "../TimelineEvent";
import type { TimelineEvent } from "@/types";

function makeEvent(overrides: Partial<TimelineEvent> = {}): TimelineEvent {
  return {
    id: "1",
    type: "deal",
    title: "Deal Created",
    description: "New enterprise deal opened",
    timestamp: new Date().toISOString(),
    source: "Salesforce",
    ...overrides,
  };
}

describe("TimelineEventCard", () => {
  it("renders the event title", () => {
    render(<TimelineEventCard event={makeEvent()} />);
    expect(screen.getByText("Deal Created")).toBeInTheDocument();
  });

  it("renders the event description", () => {
    render(<TimelineEventCard event={makeEvent()} />);
    expect(screen.getByText("New enterprise deal opened")).toBeInTheDocument();
  });

  it("renders the source badge", () => {
    render(<TimelineEventCard event={makeEvent({ source: "Stripe" })} />);
    expect(screen.getByText("Stripe")).toBeInTheDocument();
  });

  it("renders deal type dot with black color", () => {
    const { container } = render(
      <TimelineEventCard event={makeEvent({ type: "deal" })} />
    );
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).toHaveClass("bg-black");
  });

  it("renders payment type dot with success color", () => {
    const { container } = render(
      <TimelineEventCard event={makeEvent({ type: "payment" })} />
    );
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).toHaveClass("bg-success");
  });

  it("renders support type dot with warning color", () => {
    const { container } = render(
      <TimelineEventCard event={makeEvent({ type: "support" })} />
    );
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).toHaveClass("bg-warning");
  });

  it("renders email type dot with info color", () => {
    const { container } = render(
      <TimelineEventCard event={makeEvent({ type: "email" })} />
    );
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).toHaveClass("bg-info");
  });

  it("formats recent timestamps as relative time", () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60000).toISOString();
    render(<TimelineEventCard event={makeEvent({ timestamp: fiveMinutesAgo })} />);
    expect(screen.getByText("5m ago")).toBeInTheDocument();
  });

  it("formats hour-old timestamps as hours ago", () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 3600000).toISOString();
    render(<TimelineEventCard event={makeEvent({ timestamp: threeHoursAgo })} />);
    expect(screen.getByText("3h ago")).toBeInTheDocument();
  });

  it("formats day-old timestamps as days ago", () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString();
    render(<TimelineEventCard event={makeEvent({ timestamp: twoDaysAgo })} />);
    expect(screen.getByText("2d ago")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <TimelineEventCard event={makeEvent()} className="custom-event" />
    );
    expect(container.firstChild).toHaveClass("custom-event");
  });
});
