import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "../Dropdown";

const sampleItems = [
  { label: "Edit", onClick: jest.fn() },
  { label: "Delete", onClick: jest.fn() },
  { label: "Share", onClick: jest.fn() },
];

describe("Dropdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sampleItems.forEach((item) => (item.onClick = jest.fn()));
  });

  it("renders the trigger", () => {
    render(<Dropdown trigger={<button>Menu</button>} items={sampleItems} />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("does not show menu items initially", () => {
    render(<Dropdown trigger={<button>Menu</button>} items={sampleItems} />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("shows menu items after clicking trigger", async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button>Menu</button>} items={sampleItems} />);
    await user.click(screen.getByText("Menu"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("renders item labels in the menu", async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button>Menu</button>} items={sampleItems} />);
    await user.click(screen.getByText("Menu"));
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
  });

  it("calls item onClick and closes menu when item is clicked", async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button>Menu</button>} items={sampleItems} />);
    await user.click(screen.getByText("Menu"));
    await user.click(screen.getByText("Edit"));
    expect(sampleItems[0].onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("toggles menu open and closed on trigger click", async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button>Menu</button>} items={sampleItems} />);
    await user.click(screen.getByText("Menu"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(screen.getByText("Menu"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes menu when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button>Menu</button>} items={sampleItems} />);
    await user.click(screen.getByText("Menu"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes menu when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Dropdown trigger={<button>Menu</button>} items={sampleItems} />
        <button>Outside</button>
      </div>
    );
    await user.click(screen.getByText("Menu"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByText("Outside"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("sets aria-haspopup and aria-expanded on trigger container", async () => {
    const user = userEvent.setup();
    const { container } = render(<Dropdown trigger={<button>Menu</button>} items={sampleItems} />);
    const triggerDiv = container.querySelector('[aria-haspopup="true"]');
    expect(triggerDiv).toBeInTheDocument();
    expect(triggerDiv).toHaveAttribute("aria-expanded", "false");
    await user.click(screen.getByText("Menu"));
    expect(triggerDiv).toHaveAttribute("aria-expanded", "true");
  });

  it("aligns menu to left by default", async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button>Menu</button>} items={sampleItems} />);
    await user.click(screen.getByText("Menu"));
    const menu = screen.getByRole("menu");
    expect(menu).toHaveClass("left-0");
  });

  it("aligns menu to right when align=right", async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button>Menu</button>} items={sampleItems} align="right" />);
    await user.click(screen.getByText("Menu"));
    const menu = screen.getByRole("menu");
    expect(menu).toHaveClass("right-0");
  });

  it("renders item icon when provided", async () => {
    const user = userEvent.setup();
    const itemsWithIcon = [
      { label: "Edit", onClick: jest.fn(), icon: <span data-testid="edit-icon">E</span> },
    ];
    render(<Dropdown trigger={<button>Menu</button>} items={itemsWithIcon} />);
    await user.click(screen.getByText("Menu"));
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(
      <Dropdown trigger={<button>Menu</button>} items={sampleItems} className="my-dropdown" />
    );
    expect(container.firstChild).toHaveClass("my-dropdown");
  });
});
