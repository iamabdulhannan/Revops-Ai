import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "../SidebarItem";

const mockUsePathname = usePathname as jest.Mock;

beforeEach(() => {
  mockUsePathname.mockReturnValue("/overview");
});

describe("SidebarItem", () => {
  it("renders a link with the label", () => {
    render(
      <SidebarItem label="Dashboard" path="/overview" icon="LayoutDashboard" />
    );
    const link = screen.getByRole("link", { name: /Dashboard/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/overview");
  });

  it("applies active styles when pathname matches path exactly", () => {
    mockUsePathname.mockReturnValue("/overview");
    render(
      <SidebarItem label="Dashboard" path="/overview" icon="LayoutDashboard" />
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("bg-black");
    expect(link.className).toContain("text-white");
  });

  it("applies active styles when pathname is a sub-path", () => {
    mockUsePathname.mockReturnValue("/customers/123");
    render(
      <SidebarItem label="Customers" path="/customers" icon="Users" />
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("bg-black");
  });

  it("applies inactive styles when pathname does not match", () => {
    mockUsePathname.mockReturnValue("/settings");
    render(
      <SidebarItem label="Dashboard" path="/overview" icon="LayoutDashboard" />
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("text-grey-600");
    expect(link.className).not.toContain("bg-black");
  });

  it("renders badge text when provided", () => {
    render(
      <SidebarItem
        label="Pipeline"
        path="/pipeline"
        icon="Kanban"
        badge="12"
      />
    );
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("does not render badge when not provided", () => {
    render(
      <SidebarItem label="Dashboard" path="/overview" icon="LayoutDashboard" />
    );
    const badges = screen.queryByText(/^\d+$/);
    expect(badges).not.toBeInTheDocument();
  });

  it("hides label and shows tooltip in collapsed mode", () => {
    render(
      <SidebarItem
        label="Dashboard"
        path="/overview"
        icon="LayoutDashboard"
        collapsed
      />
    );
    const labels = screen.getAllByText("Dashboard");
    const tooltip = labels.find((el) =>
      el.className.includes("opacity-0")
    );
    expect(tooltip).toBeTruthy();
  });

  it("renders with justify-center in collapsed mode", () => {
    render(
      <SidebarItem
        label="Dashboard"
        path="/overview"
        icon="LayoutDashboard"
        collapsed
      />
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("justify-center");
  });

  it("renders badge in tooltip when collapsed with badge", () => {
    render(
      <SidebarItem
        label="Pipeline"
        path="/pipeline"
        icon="Kanban"
        badge="5"
        collapsed
      />
    );
    const badges = screen.getAllByText("5");
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });
});
