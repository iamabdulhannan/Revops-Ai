import React from "react";
import { render, screen } from "@testing-library/react";
import { TeamMemberRow } from "../TeamMemberRow";

describe("TeamMemberRow", () => {
  it("renders the member name", () => {
    render(
      <TeamMemberRow name="Sarah Chen" email="sarah@example.com" role="admin" />
    );
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders the member email", () => {
    render(
      <TeamMemberRow name="Sarah Chen" email="sarah@example.com" role="admin" />
    );
    expect(screen.getByText("sarah@example.com")).toBeInTheDocument();
  });

  it("renders the role badge for admin", () => {
    render(
      <TeamMemberRow name="Sarah Chen" email="sarah@example.com" role="admin" />
    );
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  it("renders the role badge for member", () => {
    render(
      <TeamMemberRow name="James Park" email="james@example.com" role="member" />
    );
    expect(screen.getByText("member")).toBeInTheDocument();
  });

  it("renders the role badge for viewer", () => {
    render(
      <TeamMemberRow name="Mike Ross" email="mike@example.com" role="viewer" />
    );
    expect(screen.getByText("viewer")).toBeInTheDocument();
  });

  it("renders initials when no avatar is provided", () => {
    render(
      <TeamMemberRow name="Sarah Chen" email="sarah@example.com" role="admin" />
    );
    expect(screen.getByText("SC")).toBeInTheDocument();
  });

  it("renders avatar image when provided", () => {
    render(
      <TeamMemberRow
        name="Sarah Chen"
        email="sarah@example.com"
        role="admin"
        avatar="/avatar.png"
      />
    );
    const img = screen.getByAltText("Sarah Chen");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/avatar.png");
  });

  it("renders the Remove button", () => {
    render(
      <TeamMemberRow name="Sarah Chen" email="sarah@example.com" role="admin" />
    );
    expect(
      screen.getByRole("button", { name: "Remove" })
    ).toBeInTheDocument();
  });

  it("correctly generates initials from multi-part name", () => {
    render(
      <TeamMemberRow
        name="John Michael Doe"
        email="john@example.com"
        role="member"
      />
    );
    expect(screen.getByText("JM")).toBeInTheDocument();
  });
});
