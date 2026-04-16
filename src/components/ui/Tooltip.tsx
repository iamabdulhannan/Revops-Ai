"use client";

import React from "react";
import { cn } from "@/lib/cn";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: TooltipPosition;
  className?: string;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-grey-800 border-x-transparent border-b-transparent border-[4px]",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-grey-800 border-x-transparent border-t-transparent border-[4px]",
  left: "left-full top-1/2 -translate-y-1/2 border-l-grey-800 border-y-transparent border-r-transparent border-[4px]",
  right: "right-full top-1/2 -translate-y-1/2 border-r-grey-800 border-y-transparent border-l-transparent border-[4px]",
};

export function Tooltip({
  content,
  children,
  position = "top",
  className,
}: TooltipProps) {
  return (
    <div className={cn("relative inline-flex group", className)}>
      {children}
      <div
        className={cn(
          "absolute z-50 pointer-events-none",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-150",
          positionStyles[position]
        )}
        role="tooltip"
      >
        <div className="bg-grey-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {content}
        </div>
        <span
          className={cn("absolute w-0 h-0", arrowStyles[position])}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
