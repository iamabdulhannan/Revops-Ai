import React from "react";
import { render, screen } from "@testing-library/react";
import { ComplianceScoreGauge } from "../ComplianceScoreGauge";

jest.mock("recharts", () => {
  const Original = jest.requireActual("recharts");
  return {
    ...Original,
    ResponsiveContainer: ({ children }: any) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

describe("ComplianceScoreGauge", () => {
  it("renders the score number", () => {
    render(<ComplianceScoreGauge score={72} />);
    expect(screen.getByText("72")).toBeInTheDocument();
  });

  it("renders the label when provided", () => {
    render(<ComplianceScoreGauge score={72} label="Overall Score" />);
    expect(screen.getByText("Overall Score")).toBeInTheDocument();
  });

  it("does not render a label when not provided", () => {
    render(<ComplianceScoreGauge score={72} />);
    expect(screen.queryByText("Overall Score")).not.toBeInTheDocument();
  });

  it("renders the responsive container", () => {
    render(<ComplianceScoreGauge score={72} />);
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <ComplianceScoreGauge score={72} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders different score values correctly", () => {
    const { rerender } = render(<ComplianceScoreGauge score={95} />);
    expect(screen.getByText("95")).toBeInTheDocument();

    rerender(<ComplianceScoreGauge score={30} />);
    expect(screen.getByText("30")).toBeInTheDocument();
  });
});
