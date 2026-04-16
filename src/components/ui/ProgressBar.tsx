"use client";

import React from "react";
import { cn } from "@/lib/cn";

type ProgressColor = "default" | "success" | "warning" | "danger";

interface ProgressBarProps {
  value: number;
  color?: ProgressColor;
  className?: string;
  showLabel?: boolean;
}

const colorStyles: Record<ProgressColor, string> = {
  default: "bg-black",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export function ProgressBar({
  value,
  color = "default",
  className,
  showLabel = false,
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-end mb-1">
          <span className="text-xs font-medium text-grey-600">
            {Math.round(clampedValue)}%
          </span>
        </div>
      )}
      <div
        className="bg-grey-100 rounded-full h-2 overflow-hidden"
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorStyles[color]
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
