import { render, screen } from "@testing-library/react";
import { Timeline } from "../Timeline";
import type { TimelineEvent } from "@/types";

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "deal",
    title: "Deal Closed",
    description: "Closed deal with Acme Corp",
    timestamp: new Date().toISOString(),
    source: "Salesforce",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    description: "Invoice #1234 paid",
    timestamp: new Date().toISOString(),
    source: "Stripe",
  },
];

describe("Timeline", () => {
  it("renders 'No events to display' when events array is empty", () => {
    render(<Timeline events={[]} />);
    expect(screen.getByText("No events to display")).toBeInTheDocument();
  });

  it("renders all events", () => {
    render(<Timeline events={mockEvents} />);
    expect(screen.getByText("Deal Closed")).toBeInTheDocument();
    expect(screen.getByText("Payment Received")).toBeInTheDocument();
  });

  it("renders event descriptions", () => {
    render(<Timeline events={mockEvents} />);
    expect(screen.getByText("Closed deal with Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("Invoice #1234 paid")).toBeInTheDocument();
  });

  it("renders the vertical timeline line", () => {
    const { container } = render(<Timeline events={mockEvents} />);
    const line = container.querySelector("[aria-hidden='true']");
    expect(line).toBeInTheDocument();
  });

  it("renders event sources as badges", () => {
    render(<Timeline events={mockEvents} />);
    expect(screen.getByText("Salesforce")).toBeInTheDocument();
    expect(screen.getByText("Stripe")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Timeline events={mockEvents} className="timeline-custom" />
    );
    expect(container.firstChild).toHaveClass("timeline-custom");
  });

  it("applies custom className to empty state", () => {
    const { container } = render(
      <Timeline events={[]} className="empty-custom" />
    );
    expect(container.firstChild).toHaveClass("empty-custom");
  });
});
