import { render, screen } from "@testing-library/react";
import { HealthBadge } from "../HealthBadge";

describe("HealthBadge", () => {
  it("renders 'Healthy' label for healthy status", () => {
    render(<HealthBadge status="healthy" />);
    expect(screen.getByText("Healthy")).toBeInTheDocument();
  });

  it("renders 'At Risk' label for at-risk status", () => {
    render(<HealthBadge status="at-risk" />);
    expect(screen.getByText("At Risk")).toBeInTheDocument();
  });

  it("renders 'Critical' label for critical status", () => {
    render(<HealthBadge status="critical" />);
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });

  it("renders the colored dot with aria-hidden", () => {
    const { container } = render(<HealthBadge status="healthy" />);
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveClass("bg-success");
  });

  it("renders warning dot for at-risk status", () => {
    const { container } = render(<HealthBadge status="at-risk" />);
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).toHaveClass("bg-warning");
  });

  it("renders danger dot for critical status", () => {
    const { container } = render(<HealthBadge status="critical" />);
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).toHaveClass("bg-danger");
  });

  it("does not show score by default", () => {
    render(<HealthBadge status="healthy" score={85} />);
    expect(screen.queryByText("(85)")).not.toBeInTheDocument();
  });

  it("shows score when showScore is true and score is provided", () => {
    render(<HealthBadge status="healthy" score={85} showScore />);
    expect(screen.getByText("(85)")).toBeInTheDocument();
  });

  it("does not show score when showScore is true but score is undefined", () => {
    render(<HealthBadge status="healthy" showScore />);
    expect(screen.queryByText(/\(\d+\)/)).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <HealthBadge status="healthy" className="extra-class" />
    );
    expect(container.firstChild).toHaveClass("extra-class");
  });
});
