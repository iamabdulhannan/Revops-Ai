import React from "react";
import { render, screen } from "@testing-library/react";
import { SettingsForm } from "../SettingsForm";

describe("SettingsForm", () => {
  it("renders the title", () => {
    render(
      <SettingsForm title="General Settings" description="Configure your account">
        <div>Form content</div>
      </SettingsForm>
    );
    expect(screen.getByText("General Settings")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(
      <SettingsForm title="General" description="Manage your preferences">
        <div>Content</div>
      </SettingsForm>
    );
    expect(screen.getByText("Manage your preferences")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <SettingsForm title="Title" description="Desc">
        <button>Save Settings</button>
      </SettingsForm>
    );
    expect(
      screen.getByRole("button", { name: "Save Settings" })
    ).toBeInTheDocument();
  });

  it("renders the divider", () => {
    const { container } = render(
      <SettingsForm title="Title" description="Desc">
        <div>Content</div>
      </SettingsForm>
    );
    const divider = container.querySelector(".border-t");
    expect(divider).toBeInTheDocument();
  });

  it("renders with complex children", () => {
    render(
      <SettingsForm title="Profile" description="Your profile settings">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
      </SettingsForm>
    );
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });
});
