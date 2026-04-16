import React from "react";
import { render, screen } from "@testing-library/react";
import { CustomerList } from "../CustomerList";

describe("CustomerList", () => {
  it("renders the section heading", () => {
    render(<CustomerList />);
    expect(screen.getByText("Customers")).toBeInTheDocument();
  });

  it("renders the placeholder text", () => {
    render(<CustomerList />);
    expect(
      screen.getByText("Customer list table will render here")
    ).toBeInTheDocument();
  });

  it("renders a card container", () => {
    const { container } = render(<CustomerList />);
    const card = container.querySelector(".shadow-card");
    expect(card).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    const { container } = render(<CustomerList />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
