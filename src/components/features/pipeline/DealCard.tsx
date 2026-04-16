"use client";

import React from "react";
import { cn } from "@/lib/cn";
import type { Deal } from "@/types";

interface DealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  deal: Deal;
  isDragOverlay?: boolean;
  isDragging?: boolean;
  style?: React.CSSProperties;
}

export const DealCard = React.forwardRef<HTMLDivElement, DealCardProps>(
  function DealCard(
    { deal, isDragOverlay, isDragging, style, className, ...props },
    ref
  ) {
    const healthColor =
      deal.healthScore >= 70
        ? "bg-success"
        : deal.healthScore >= 40
          ? "bg-warning"
          : "bg-danger";

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          "rounded-[6px] bg-white p-4 shadow-card transition-shadow",
          isDragOverlay &&
            "shadow-card-hover scale-[1.03] rotate-[1.5deg] cursor-grabbing",
          isDragging && "opacity-30 scale-[0.98]",
          !isDragOverlay &&
            !isDragging &&
            "cursor-grab hover:shadow-card-hover active:cursor-grabbing",
          className
        )}
        {...props}
      >
        <p className="text-sm font-medium text-black">{deal.title}</p>
        <p className="mt-0.5 text-xs text-grey-500">{deal.company}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-black">
            ${deal.value.toLocaleString()}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-2xs text-grey-400">
              {deal.daysInStage}d in stage
            </span>
            <span
              className={cn(
                "inline-block h-2.5 w-2.5 rounded-full",
                healthColor
              )}
              title={`Health: ${deal.healthScore}`}
            />
          </div>
        </div>

        <p className="mt-2 text-2xs text-grey-400">{deal.assignee}</p>
      </div>
    );
  }
);
