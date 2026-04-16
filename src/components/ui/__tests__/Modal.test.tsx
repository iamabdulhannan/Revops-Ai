import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "../Modal";

describe("Modal", () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    children: <p>Modal content</p>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renders nothing when open is false", () => {
    render(<Modal open={false} onClose={jest.fn()}>Content</Modal>);
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders children when open is true", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("renders into document.body via portal", () => {
    const { baseElement } = render(<Modal {...defaultProps} />);
    const dialog = baseElement.querySelector('[role="dialog"]');
    expect(dialog).toBeInTheDocument();
    expect(document.body.contains(dialog)).toBe(true);
  });

  it("has role dialog and aria-modal true", () => {
    render(<Modal {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("sets aria-label from title prop", () => {
    render(<Modal {...defaultProps} title="Confirm Action" />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Confirm Action");
  });

  it("renders title heading when title is provided", () => {
    render(<Modal {...defaultProps} title="Delete Item" />);
    expect(screen.getByText("Delete Item")).toBeInTheDocument();
    expect(screen.getByText("Delete Item").tagName).toBe("H2");
  });

  it("renders close button with aria-label Close when title is present", () => {
    render(<Modal {...defaultProps} title="Title" />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("renders close button when title is absent", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<Modal open={true} onClose={onClose} title="Title">Content</Modal>);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when overlay is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<Modal open={true} onClose={onClose}>Content</Modal>);
    const overlay = document.querySelector('[aria-hidden="true"]') as HTMLElement;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = jest.fn();
    render(<Modal open={true} onClose={onClose}>Content</Modal>);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("sets body overflow hidden when open", () => {
    render(<Modal {...defaultProps} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body overflow when unmounted", () => {
    const { unmount } = render(<Modal {...defaultProps} />);
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("applies size md by default", () => {
    render(<Modal {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    const panel = dialog.querySelector(".max-w-lg");
    expect(panel).toBeInTheDocument();
  });

  it("applies size sm", () => {
    render(<Modal {...defaultProps} size="sm" />);
    const dialog = screen.getByRole("dialog");
    const panel = dialog.querySelector(".max-w-sm");
    expect(panel).toBeInTheDocument();
  });

  it("applies size lg", () => {
    render(<Modal {...defaultProps} size="lg" />);
    const dialog = screen.getByRole("dialog");
    const panel = dialog.querySelector(".max-w-2xl");
    expect(panel).toBeInTheDocument();
  });
});
