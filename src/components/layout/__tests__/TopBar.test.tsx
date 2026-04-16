import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TopBar } from "../TopBar";

jest.mock("@/components/ui/Dropdown", () => ({
  Dropdown: ({
    trigger,
    items,
  }: {
    trigger: React.ReactNode;
    items: { label: string; onClick: () => void; icon?: React.ReactNode }[];
  }) => (
    <div>
      {trigger}
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <button onClick={item.onClick}>{item.label}</button>
          </li>
        ))}
      </ul>
    </div>
  ),
}));

describe("TopBar", () => {
  it("renders the search input", () => {
    render(<TopBar />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders the notifications button", () => {
    render(<TopBar />);
    expect(
      screen.getByRole("button", { name: "Notifications" })
    ).toBeInTheDocument();
  });

  it("renders the user menu button", () => {
    render(<TopBar />);
    expect(
      screen.getByRole("button", { name: "User menu" })
    ).toBeInTheDocument();
  });

  it("renders notification dropdown items", () => {
    render(<TopBar />);
    expect(
      screen.getByText("Acme Corp deal moved to Negotiation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("New churn alert: DataSync Ltd")
    ).toBeInTheDocument();
  });

  it("renders user dropdown items", () => {
    render(<TopBar />);
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("renders user avatar with initials", () => {
    render(<TopBar />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders as a header element", () => {
    render(<TopBar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("changes search border on focus", () => {
    render(<TopBar />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.focus(input);
    const wrapper = input.closest("div.flex.items-center") as HTMLElement;
    expect(wrapper.className).toContain("border-black");
  });

  it("reverts search border on blur", () => {
    render(<TopBar />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.focus(input);
    fireEvent.blur(input);
    const wrapper = input.closest("div.flex.items-center") as HTMLElement;
    expect(wrapper.className).toContain("border-grey-300");
  });
});
