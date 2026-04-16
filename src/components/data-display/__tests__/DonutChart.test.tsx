import React from "react";
import { render, screen } from "@testing-library/react";
import { DonutChart } from "../DonutChart";

jest.mock("recharts", () => {
  const Original = jest.requireActual("recharts");
  return {
    ...Original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

describe("DonutChart", () => {
  it("renders the responsive container", () => {
    render(<DonutChart />);
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
  });

  it("displays default center label 'Total MRR' when no props given", () => {
    render(<DonutChart />);
    expect(screen.getByText("Total MRR")).toBeInTheDocument();
  });

  it("displays computed default center value from default data", () => {
    render(<DonutChart />);
    expect(screen.getByText("$800K")).toBeInTheDocument();
  });

  it("displays custom center label", () => {
    render(<DonutChart centerLabel="ARR" />);
    expect(screen.getByText("ARR")).toBeInTheDocument();
  });

  it("displays custom center value", () => {
    render(<DonutChart centerValue="$1.2M" />);
    expect(screen.getByText("$1.2M")).toBeInTheDocument();
  });

  it("uses provided data and computes center value from it", () => {
    const customData = [
      { name: "Plan A", value: 50 },
      { name: "Plan B", value: 50 },
    ];
    render(<DonutChart data={customData} />);
    expect(screen.getByText("$800K")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<DonutChart className="donut-class" />);
    expect(container.firstChild).toHaveClass("donut-class");
  });
});
