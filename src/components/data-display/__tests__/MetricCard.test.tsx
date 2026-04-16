import { render, screen } from "@testing-library/react";
import { MetricCard } from "../MetricCard";

describe("MetricCard", () => {
  const defaultProps = {
    label: "Monthly Revenue",
    value: "$245K",
    change: 12.5,
    changeLabel: "vs last month",
    trend: "up" as const,
  };

  it("renders label, value, and change label", () => {
    render(<MetricCard {...defaultProps} />);
    expect(screen.getByText("Monthly Revenue")).toBeInTheDocument();
    expect(screen.getByText("$245K")).toBeInTheDocument();
    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });

  it("formats positive change with a plus sign", () => {
    render(<MetricCard {...defaultProps} change={12.5} trend="up" />);
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
  });

  it("formats negative change without a plus sign", () => {
    render(<MetricCard {...defaultProps} change={-8} trend="down" />);
    expect(screen.getByText("-8%")).toBeInTheDocument();
  });

  it("formats zero change without a plus sign", () => {
    render(<MetricCard {...defaultProps} change={0} trend="flat" />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders up trend with success color", () => {
    const { container } = render(<MetricCard {...defaultProps} trend="up" />);
    const changeSpan = screen.getByText("+12.5%");
    expect(changeSpan.className).toContain("text-success");
  });

  it("renders down trend with danger color", () => {
    render(<MetricCard {...defaultProps} change={-5} trend="down" />);
    const changeSpan = screen.getByText("-5%");
    expect(changeSpan.className).toContain("text-danger");
  });

  it("renders flat trend with grey color", () => {
    render(<MetricCard {...defaultProps} change={0} trend="flat" />);
    const changeSpan = screen.getByText("0%");
    expect(changeSpan.className).toContain("text-grey-500");
  });

  it("applies custom className", () => {
    const { container } = render(
      <MetricCard {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
