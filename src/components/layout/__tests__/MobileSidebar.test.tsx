import { render, screen, fireEvent } from "@testing-library/react";
import { MobileSidebar } from "../MobileSidebar";

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

describe("MobileSidebar", () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    document.body.style.overflow = "";
  });

  it("renders the logo as a link to home", () => {
    render(<MobileSidebar open={true} onClose={onClose} />);
    const logoLink = screen.getByText("RevOps AI").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders the close button with accessible label", () => {
    render(<MobileSidebar open={true} onClose={onClose} />);
    expect(
      screen.getByRole("button", { name: "Close sidebar" })
    ).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(<MobileSidebar open={true} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Close sidebar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when overlay is clicked", () => {
    const { container } = render(
      <MobileSidebar open={true} onClose={onClose} />
    );
    const overlay = container.querySelector("[aria-hidden='true']");
    fireEvent.click(overlay!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed while open", () => {
    render(<MobileSidebar open={true} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on Escape when closed", () => {
    render(<MobileSidebar open={false} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("locks body scroll when open", () => {
    render(<MobileSidebar open={true} onClose={onClose} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("unlocks body scroll when closed", () => {
    const { rerender } = render(
      <MobileSidebar open={true} onClose={onClose} />
    );
    rerender(<MobileSidebar open={false} onClose={onClose} />);
    expect(document.body.style.overflow).toBe("");
  });

  it("renders navigation items", () => {
    render(<MobileSidebar open={true} onClose={onClose} />);
    expect(screen.getByRole("link", { name: /Dashboard/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Customers/ })).toBeInTheDocument();
  });

  it("renders group labels", () => {
    render(<MobileSidebar open={true} onClose={onClose} />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("renders user info", () => {
    render(<MobileSidebar open={true} onClose={onClose} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@company.com")).toBeInTheDocument();
  });

  it("applies translate-x-0 when open", () => {
    const { container } = render(
      <MobileSidebar open={true} onClose={onClose} />
    );
    const drawer = container.querySelector(".w-\\[280px\\]");
    expect(drawer?.className).toContain("translate-x-0");
  });
});
