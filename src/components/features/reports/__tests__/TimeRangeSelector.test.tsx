import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimeRangeSelector } from "../TimeRangeSelector";

describe("TimeRangeSelector", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders all three time range options", () => {
    render(<TimeRangeSelector value="3m" onChange={mockOnChange} />);
    expect(screen.getByText("3 Month")).toBeInTheDocument();
    expect(screen.getByText("6 Month")).toBeInTheDocument();
    expect(screen.getByText("Annual")).toBeInTheDocument();
  });

  it("highlights the currently selected option", () => {
    render(<TimeRangeSelector value="3m" onChange={mockOnChange} />);
    const activeButton = screen.getByText("3 Month");
    expect(activeButton.className).toContain("bg-black");
    expect(activeButton.className).toContain("text-white");
  });

  it("does not highlight non-selected options", () => {
    render(<TimeRangeSelector value="3m" onChange={mockOnChange} />);
    const inactiveButton = screen.getByText("6 Month");
    expect(inactiveButton.className).not.toContain("bg-black");
  });

  it("calls onChange with '6m' when 6 Month is clicked", async () => {
    const user = userEvent.setup();
    render(<TimeRangeSelector value="3m" onChange={mockOnChange} />);
    await user.click(screen.getByText("6 Month"));
    expect(mockOnChange).toHaveBeenCalledWith("6m");
  });

  it("calls onChange with '1y' when Annual is clicked", async () => {
    const user = userEvent.setup();
    render(<TimeRangeSelector value="3m" onChange={mockOnChange} />);
    await user.click(screen.getByText("Annual"));
    expect(mockOnChange).toHaveBeenCalledWith("1y");
  });

  it("calls onChange with '3m' when 3 Month is clicked", async () => {
    const user = userEvent.setup();
    render(<TimeRangeSelector value="6m" onChange={mockOnChange} />);
    await user.click(screen.getByText("3 Month"));
    expect(mockOnChange).toHaveBeenCalledWith("3m");
  });

  it("renders three buttons", () => {
    render(<TimeRangeSelector value="3m" onChange={mockOnChange} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });
});
