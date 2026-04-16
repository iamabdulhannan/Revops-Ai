import React from "react";
import { render, screen } from "@testing-library/react";
import { Tooltip } from "../Tooltip";

describe("Tooltip", () => {
  it("renders children", () => {
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
  });

  it("renders tooltip content", () => {
    render(
      <Tooltip content="Tooltip message">
        <span>Target</span>
      </Tooltip>
    );
    expect(screen.getByText("Tooltip message")).toBeInTheDocument();
  });

  it("has role tooltip", () => {
    render(
      <Tooltip content="Info">
        <span>Target</span>
      </Tooltip>
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("tooltip is hidden by default (opacity-0 class)", () => {
    render(
      <Tooltip content="Hidden text">
        <span>Target</span>
      </Tooltip>
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveClass("opacity-0");
  });

  it("applies top position by default", () => {
    render(
      <Tooltip content="Top tooltip">
        <span>Target</span>
      </Tooltip>
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveClass("bottom-full", "mb-2");
  });

  it("applies bottom position", () => {
    render(
      <Tooltip content="Bottom tooltip" position="bottom">
        <span>Target</span>
      </Tooltip>
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveClass("top-full", "mt-2");
  });

  it("applies left position", () => {
    render(
      <Tooltip content="Left tooltip" position="left">
        <span>Target</span>
      </Tooltip>
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveClass("right-full", "mr-2");
  });

  it("applies right position", () => {
    render(
      <Tooltip content="Right tooltip" position="right">
        <span>Target</span>
      </Tooltip>
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveClass("left-full", "ml-2");
  });

  it("renders arrow with aria-hidden", () => {
    const { container } = render(
      <Tooltip content="With arrow">
        <span>Target</span>
      </Tooltip>
    );
    const arrow = container.querySelector('[aria-hidden="true"]');
    expect(arrow).toBeInTheDocument();
  });

  it("merges custom className onto wrapper", () => {
    const { container } = render(
      <Tooltip content="Tip" className="custom-tooltip">
        <span>Target</span>
      </Tooltip>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-tooltip");
  });

  it("wrapper has group class for hover interaction", () => {
    const { container } = render(
      <Tooltip content="Tip">
        <span>Target</span>
      </Tooltip>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("group");
  });

  it("tooltip has group-hover:opacity-100 for visibility on hover", () => {
    render(
      <Tooltip content="Visible on hover">
        <span>Target</span>
      </Tooltip>
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveClass("group-hover:opacity-100");
  });
});
