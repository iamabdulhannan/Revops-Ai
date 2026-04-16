import { render, screen } from "@testing-library/react";
import { ChartCard } from "../ChartCard";

describe("ChartCard", () => {
  it("renders the title", () => {
    render(<ChartCard title="Revenue Overview">Chart here</ChartCard>);
    expect(
      screen.getByRole("heading", { name: "Revenue Overview" })
    ).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(<ChartCard title="Test">Chart content</ChartCard>);
    expect(screen.getByText("Chart content")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(
      <ChartCard title="Revenue" subtitle="Last 12 months">
        Chart
      </ChartCard>
    );
    expect(screen.getByText("Last 12 months")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const { container } = render(<ChartCard title="Revenue">Chart</ChartCard>);
    const subtitles = container.querySelectorAll("p.text-xs");
    expect(subtitles.length).toBe(0);
  });

  it("renders actions slot when provided", () => {
    render(
      <ChartCard title="Revenue" actions={<button>Export</button>}>
        Chart
      </ChartCard>
    );
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
  });

  it("does not render actions container when actions is not provided", () => {
    const { container } = render(<ChartCard title="Revenue">Chart</ChartCard>);
    const header = container.querySelector(
      ".flex.items-start.justify-between"
    );
    expect(header?.children.length).toBe(1);
  });

  it("applies custom className", () => {
    const { container } = render(
      <ChartCard title="Test" className="my-chart-class">
        Chart
      </ChartCard>
    );
    expect(container.firstChild).toHaveClass("my-chart-class");
  });
});
