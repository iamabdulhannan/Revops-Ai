"use client";

import React from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-grey-400">{icon}</div>
      )}
      <h3 className="text-md font-semibold text-black mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-grey-500 max-w-sm mb-6">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
