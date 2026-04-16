"use client";

import React from "react";
import { cn } from "@/lib/cn";

type SkeletonVariant = "text" | "circle" | "rect";

interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded-sm",
  circle: "rounded-full",
  rect: "rounded-sm",
};

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-grey-100 animate-pulse-subtle",
        variantStyles[variant],
        className
      )}
      aria-hidden="true"
    />
  );
}
