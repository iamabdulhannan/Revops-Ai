import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "../Tabs";

const sampleTabs = [
  { label: "Overview", value: "overview" },
  { label: "Details", value: "details" },
  { label: "Settings", value: "settings" },
];

describe("Tabs", () => {
  const defaultProps = {
    tabs: sampleTabs,
    activeTab: "overview",
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a tablist", () => {
    render(<Tabs {...defaultProps} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders all tab buttons", () => {
    render(<Tabs {...defaultProps} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);
  });

  it("renders tab labels", () => {
    render(<Tabs {...defaultProps} />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("marks the active tab with aria-selected true", () => {
    render(<Tabs {...defaultProps} activeTab="details" />);
    expect(screen.getByText("Details").closest("button")).toHaveAttribute("aria-selected", "true");
  });

  it("marks inactive tabs with aria-selected false", () => {
    render(<Tabs {...defaultProps} activeTab="overview" />);
    expect(screen.getByText("Details").closest("button")).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText("Settings").closest("button")).toHaveAttribute("aria-selected", "false");
  });

  it("sets tabIndex 0 on active tab and -1 on inactive tabs", () => {
    render(<Tabs {...defaultProps} activeTab="overview" />);
    expect(screen.getByText("Overview").closest("button")).toHaveAttribute("tabindex", "0");
    expect(screen.getByText("Details").closest("button")).toHaveAttribute("tabindex", "-1");
    expect(screen.getByText("Settings").closest("button")).toHaveAttribute("tabindex", "-1");
  });

  it("calls onChange with the tab value when clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Tabs {...defaultProps} onChange={onChange} />);
    await user.click(screen.getByText("Details"));
    expect(onChange).toHaveBeenCalledWith("details");
  });

  it("applies active styling to selected tab", () => {
    render(<Tabs {...defaultProps} activeTab="overview" />);
    const activeBtn = screen.getByText("Overview").closest("button");
    expect(activeBtn).toHaveClass("text-black", "font-semibold");
  });

  it("applies inactive styling to non-selected tabs", () => {
    render(<Tabs {...defaultProps} activeTab="overview" />);
    const inactiveBtn = screen.getByText("Details").closest("button");
    expect(inactiveBtn).toHaveClass("text-grey-500");
  });

  it("renders active indicator span on active tab", () => {
    render(<Tabs {...defaultProps} activeTab="overview" />);
    const activeBtn = screen.getByText("Overview").closest("button");
    const indicator = activeBtn!.querySelector("span.bg-black");
    expect(indicator).toBeInTheDocument();
  });

  it("does not render indicator on inactive tabs", () => {
    render(<Tabs {...defaultProps} activeTab="overview" />);
    const inactiveBtn = screen.getByText("Details").closest("button");
    const indicator = inactiveBtn!.querySelector("span.bg-black");
    expect(indicator).not.toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<Tabs {...defaultProps} className="my-tabs" />);
    expect(screen.getByRole("tablist")).toHaveClass("my-tabs");
  });

  it("all tabs have type button", () => {
    render(<Tabs {...defaultProps} />);
    const tabs = screen.getAllByRole("tab");
    tabs.forEach((tab) => {
      expect(tab).toHaveAttribute("type", "button");
    });
  });
});
