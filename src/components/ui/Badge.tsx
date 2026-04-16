"use client";

import React from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-grey-100 text-grey-700",
  success: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  danger: "bg-danger-light text-danger",
  info: "bg-info-light text-info",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-2xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({
  variant = "default",
  size = "md",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill font-semibold uppercase leading-none whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
