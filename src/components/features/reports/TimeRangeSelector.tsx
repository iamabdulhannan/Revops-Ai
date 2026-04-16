"use client";

import { cn } from "@/lib/cn";
import type { TimeRange } from "@/types";

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

const options: { label: string; value: TimeRange }[] = [
  { label: "3 Month", value: "3m" },
  { label: "6 Month", value: "6m" },
  { label: "Annual", value: "1y" },
];

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="inline-flex rounded-[6px] border border-border bg-grey-50 p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-[4px] transition-colors duration-150",
            value === opt.value
              ? "bg-black text-white shadow-button"
              : "text-grey-600 hover:text-black"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
