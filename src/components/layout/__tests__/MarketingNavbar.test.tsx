import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import { MarketingNavbar } from "../MarketingNavbar";

const mockUsePathname = usePathname as jest.Mock;

jest.mock("@/constants/routes", () => ({
  ROUTES: {
    HOME: "/",
    PRICING: "/pricing",
    ABOUT: "/about",
    LOGIN: "/login",
    REGISTER: "/register",
  },
}));

beforeEach(() => {
  mockUsePathname.mockReturnValue("/");
});

describe("MarketingNavbar", () => {
  it("renders the logo linking to home", () => {
    render(<MarketingNavbar />);
    const logo = screen.getByText("RevOps AI");
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders desktop nav links", () => {
    render(<MarketingNavbar />);
    expect(screen.getAllByText("Features").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Pricing").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
  });

  it("renders Login and Get Started buttons", () => {
    render(<MarketingNavbar />);
    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Get Started").length).toBeGreaterThanOrEqual(1);
  });

  it("Login links to /login", () => {
    render(<MarketingNavbar />);
    const loginLinks = screen.getAllByText("Login");
    const loginLink = loginLinks[0].closest("a");
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("Get Started links to /register", () => {
    render(<MarketingNavbar />);
    const ctaLinks = screen.getAllByText("Get Started");
    const ctaLink = ctaLinks[0].closest("a");
    expect(ctaLink).toHaveAttribute("href", "/register");
  });

  it("renders the mobile hamburger button", () => {
    render(<MarketingNavbar />);
    expect(
      screen.getByRole("button", { name: "Open menu" })
    ).toBeInTheDocument();
  });

  it("opens mobile menu on hamburger click", async () => {
    const user = userEvent.setup();
    render(<MarketingNavbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(
      screen.getByRole("button", { name: "Close menu" })
    ).toBeInTheDocument();
  });

  it("closes mobile menu on second hamburger click", async () => {
    const user = userEvent.setup();
    render(<MarketingNavbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("button", { name: "Close menu" }));

    expect(
      screen.getByRole("button", { name: "Open menu" })
    ).toBeInTheDocument();
  });

  it("renders nav element", () => {
    render(<MarketingNavbar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("applies active styles for matching pathname", () => {
    mockUsePathname.mockReturnValue("/pricing");
    render(<MarketingNavbar />);
    const pricingLinks = screen.getAllByText("Pricing");
    const desktopLink = pricingLinks.find(
      (el) => el.className.includes("text-black") && !el.className.includes("bg-grey-50")
    );
    expect(desktopLink).toBeTruthy();
  });
});
