import { render, screen } from "@testing-library/react";
import { PageHeader } from "../PageHeader";

describe("PageHeader", () => {
  it("renders the title", () => {
    render(<PageHeader title="Dashboard" />);
    expect(
      screen.getByRole("heading", { name: "Dashboard" })
    ).toBeInTheDocument();
  });

  it("renders the title as an h1 element", () => {
    render(<PageHeader title="Dashboard" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Dashboard");
  });

  it("renders subtitle when provided", () => {
    render(<PageHeader title="Dashboard" subtitle="Welcome back" />);
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const { container } = render(<PageHeader title="Dashboard" />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBe(0);
  });

  it("renders children in the actions slot", () => {
    render(
      <PageHeader title="Dashboard">
        <button>Add New</button>
      </PageHeader>
    );
    expect(screen.getByRole("button", { name: "Add New" })).toBeInTheDocument();
  });

  it("does not render actions container when no children", () => {
    const { container } = render(<PageHeader title="Dashboard" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.children.length).toBe(1);
  });

  it("renders multiple action buttons", () => {
    render(
      <PageHeader title="Reports">
        <button>Export</button>
        <button>Filter</button>
      </PageHeader>
    );
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument();
  });
});
