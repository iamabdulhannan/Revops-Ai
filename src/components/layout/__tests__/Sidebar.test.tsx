import { render, screen } from "@testing-library/react";
import { Sidebar } from "../Sidebar";

jest.mock("@/constants/navigation", () => ({
  SIDEBAR_NAVIGATION: [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", path: "/overview", icon: "LayoutDashboard" },
      ],
    },
    {
      label: "Revenue",
      items: [
        { label: "Customers", path: "/customers", icon: "Users" },
      ],
    },
  ],
}));

jest.mock("@/constants/routes", () => ({
  ROUTES: { HOME: "/" },
}));

describe("Sidebar", () => {
  it("renders the logo text 'RevOps AI' in expanded mode", () => {
    render(<Sidebar />);
    expect(screen.getByText("RevOps AI")).toBeInTheDocument();
  });

  it("renders the logo as a link to home", () => {
    render(<Sidebar />);
    const logoLink = screen.getByText("RevOps AI").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders abbreviated logo 'R' in collapsed mode", () => {
    render(<Sidebar collapsed />);
    expect(screen.getByText("R")).toBeInTheDocument();
    expect(screen.queryByText("RevOps AI")).not.toBeInTheDocument();
  });

  it("renders navigation group labels in expanded mode", () => {
    render(<Sidebar />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("hides group labels in collapsed mode", () => {
    render(<Sidebar collapsed />);
    expect(screen.queryByText("Overview")).not.toBeInTheDocument();
    expect(screen.queryByText("Revenue")).not.toBeInTheDocument();
  });

  it("renders navigation items", () => {
    render(<Sidebar />);
    expect(screen.getByRole("link", { name: /Dashboard/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Customers/ })).toBeInTheDocument();
  });

  it("renders user info in expanded mode", () => {
    render(<Sidebar />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@company.com")).toBeInTheDocument();
  });

  it("hides user info text in collapsed mode", () => {
    render(<Sidebar collapsed />);
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.queryByText("john@company.com")).not.toBeInTheDocument();
  });

  it("renders the user avatar with initials", () => {
    render(<Sidebar />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("uses narrower width in collapsed mode", () => {
    const { container } = render(<Sidebar collapsed />);
    const aside = container.querySelector("aside");
    expect(aside?.className).toContain("w-16");
  });

  it("uses wider width in expanded mode", () => {
    const { container } = render(<Sidebar />);
    const aside = container.querySelector("aside");
    expect(aside?.className).toContain("w-[240px]");
  });
});
