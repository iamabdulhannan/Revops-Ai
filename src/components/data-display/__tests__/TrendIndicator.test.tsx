import { render, screen } from "@testing-library/react";
import { TrendIndicator } from "../TrendIndicator";

describe("TrendIndicator", () => {
  it("renders positive value with plus sign", () => {
    render(<TrendIndicator value={15} trend="up" />);
    expect(screen.getByText("+15%")).toBeInTheDocument();
  });

  it("renders negative value without plus sign", () => {
    render(<TrendIndicator value={-7} trend="down" />);
    expect(screen.getByText("-7%")).toBeInTheDocument();
  });

  it("renders zero value without plus sign", () => {
    render(<TrendIndicator value={0} trend="flat" />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders optional label when provided", () => {
    render(<TrendIndicator value={10} trend="up" label="vs last month" />);
    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });

  it("does not render label when not provided", () => {
    render(<TrendIndicator value={10} trend="up" />);
    expect(screen.queryByText("vs last month")).not.toBeInTheDocument();
  });

  it("applies success color for up trend", () => {
    render(<TrendIndicator value={10} trend="up" />);
    expect(screen.getByText("+10%").className).toContain("text-success");
  });

  it("applies danger color for down trend", () => {
    render(<TrendIndicator value={-3} trend="down" />);
    expect(screen.getByText("-3%").className).toContain("text-danger");
  });

  it("applies grey color for flat trend", () => {
    render(<TrendIndicator value={0} trend="flat" />);
    expect(screen.getByText("0%").className).toContain("text-grey-500");
  });

  it("applies custom className", () => {
    const { container } = render(
      <TrendIndicator value={5} trend="up" className="my-class" />
    );
    expect(container.firstChild).toHaveClass("my-class");
  });
});
