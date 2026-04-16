import React from "react";
import { render, screen } from "@testing-library/react";
import { CustomerTimeline } from "../CustomerTimeline";

describe("CustomerTimeline", () => {
  it("renders the section heading", () => {
    render(<CustomerTimeline />);
    expect(screen.getByText("Timeline")).toBeInTheDocument();
  });

  it("renders all five event titles", () => {
    render(<CustomerTimeline />);
    expect(screen.getByText("Contract renewed")).toBeInTheDocument();
    expect(screen.getByText("Payment received")).toBeInTheDocument();
    expect(screen.getByText("Support ticket opened")).toBeInTheDocument();
    expect(screen.getByText("QBR completed")).toBeInTheDocument();
    expect(screen.getByText("Onboarding email sent")).toBeInTheDocument();
  });

  it("renders event descriptions", () => {
    render(<CustomerTimeline />);
    expect(
      screen.getByText("Annual contract renewed for $48,000")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Monthly invoice of $4,000 paid")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Integration issue reported by engineering team")
    ).toBeInTheDocument();
  });

  it("renders event timestamps", () => {
    render(<CustomerTimeline />);
    expect(screen.getByText("2 days ago")).toBeInTheDocument();
    expect(screen.getByText("5 days ago")).toBeInTheDocument();
    expect(screen.getByText("1 week ago")).toBeInTheDocument();
    expect(screen.getByText("2 weeks ago")).toBeInTheDocument();
    expect(screen.getByText("3 weeks ago")).toBeInTheDocument();
  });

  it("renders five timeline events", () => {
    const { container } = render(<CustomerTimeline />);
    // Each event has an icon container with rounded-full class
    const eventIcons = container.querySelectorAll(".rounded-full");
    expect(eventIcons.length).toBeGreaterThanOrEqual(5);
  });
});
