"use client";

import React from "react";
import { cn } from "@/lib/cn";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  className,
}: ToggleProps) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2.5 select-none",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "relative inline-flex w-10 h-5 flex-shrink-0 rounded-full transition-colors duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
          checked ? "bg-black" : "bg-grey-300"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
            "absolute top-0.5",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
          aria-hidden="true"
        />
      </button>
      {label && (
        <span className="text-sm text-grey-700">{label}</span>
      )}
    </label>
  );
}
