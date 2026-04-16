import React from "react";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "../EmptyState";

describe("EmptyState", () => {
  it("renders the title", () => {
    render(<EmptyState title="No results found" />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders title as an h3 element", () => {
    render(<EmptyState title="Empty" />);
    const heading = screen.getByText("Empty");
    expect(heading.tagName).toBe("H3");
  });

  it("renders description when provided", () => {
    render(<EmptyState title="No data" description="Try adjusting your filters" />);
    expect(screen.getByText("Try adjusting your filters")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<EmptyState title="No data" />);
    const container = screen.getByText("No data").parentElement;
    const paragraphs = container!.querySelectorAll("p");
    expect(paragraphs).toHaveLength(0);
  });

  it("renders icon when provided", () => {
    render(
      <EmptyState
        title="No items"
        icon={<svg data-testid="empty-icon" />}
      />
    );
    expect(screen.getByTestId("empty-icon")).toBeInTheDocument();
  });

  it("does not render icon container when icon is not provided", () => {
    const { container } = render(<EmptyState title="No items" />);
    const iconWrapper = container.querySelector(".text-grey-400.mb-4");
    expect(iconWrapper).not.toBeInTheDocument();
  });

  it("renders action when provided", () => {
    render(
      <EmptyState
        title="No items"
        action={<button>Add new item</button>}
      />
    );
    expect(screen.getByRole("button", { name: "Add new item" })).toBeInTheDocument();
  });

  it("does not render action container when action is not provided", () => {
    const { container } = render(<EmptyState title="No items" />);
    const actionWrapper = container.querySelector(".mt-2");
    expect(actionWrapper).not.toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(<EmptyState title="No items" className="custom-empty" />);
    expect(container.firstChild).toHaveClass("custom-empty");
  });

  it("centers content with flex", () => {
    const { container } = render(<EmptyState title="No items" />);
    expect(container.firstChild).toHaveClass("flex", "flex-col", "items-center", "justify-center", "text-center");
  });

  it("renders all optional elements together", () => {
    render(
      <EmptyState
        title="Nothing here"
        description="Create your first item to get started"
        icon={<span data-testid="icon">icon</span>}
        action={<button>Create</button>}
      />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByText("Create your first item to get started")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });
});
