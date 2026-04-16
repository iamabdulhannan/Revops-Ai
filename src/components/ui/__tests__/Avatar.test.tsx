import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar } from "../Avatar";

describe("Avatar", () => {
  it("renders with role img", () => {
    render(<Avatar />);
    expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    render(<Avatar src="/photo.jpg" alt="User photo" />);
    const wrapper = screen.getByLabelText("User photo");
    const img = wrapper.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/photo.jpg");
  });

  it("renders alt text on the image", () => {
    render(<Avatar src="/photo.jpg" alt="Jane Doe" />);
    const wrapper = screen.getByLabelText("Jane Doe");
    const img = wrapper.querySelector("img");
    expect(img).toHaveAttribute("alt", "Jane Doe");
  });

  it("falls back to initials when no src", () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("computes initials from single name", () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("computes initials from multi-word name using first and last", () => {
    render(<Avatar name="John Michael Smith" />);
    expect(screen.getByText("JS")).toBeInTheDocument();
  });

  it("shows initials when image fails to load", () => {
    render(<Avatar src="/broken.jpg" name="Jane Doe" />);
    const wrapper = screen.getByLabelText("Jane Doe");
    const img = wrapper.querySelector("img");
    fireEvent.error(img!);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("uses aria-label from alt prop", () => {
    render(<Avatar alt="Profile pic" />);
    expect(screen.getByLabelText("Profile pic")).toBeInTheDocument();
  });

  it("uses aria-label from name when no alt", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByLabelText("John Doe")).toBeInTheDocument();
  });

  it("defaults aria-label to Avatar when no alt or name", () => {
    render(<Avatar />);
    expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
  });

  it("applies sm size styles", () => {
    render(<Avatar size="sm" />);
    expect(screen.getByLabelText("Avatar")).toHaveClass("w-8", "h-8");
  });

  it("applies md size styles by default", () => {
    render(<Avatar />);
    expect(screen.getByLabelText("Avatar")).toHaveClass("w-10", "h-10");
  });

  it("applies lg size styles", () => {
    render(<Avatar size="lg" />);
    expect(screen.getByLabelText("Avatar")).toHaveClass("w-12", "h-12");
  });

  it("applies fallback background when no image", () => {
    render(<Avatar name="AB" />);
    expect(screen.getByLabelText("AB")).toHaveClass("bg-black", "text-white");
  });

  it("merges custom className", () => {
    render(<Avatar className="my-avatar" />);
    expect(screen.getByLabelText("Avatar")).toHaveClass("my-avatar");
  });

  it("handles null src gracefully", () => {
    render(<Avatar src={null} name="Test User" />);
    expect(screen.getByText("TU")).toBeInTheDocument();
  });
});
