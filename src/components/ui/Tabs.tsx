"use client";

import React from "react";
import { cn } from "@/lib/cn";

interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn("border-b border-grey-200", className)}
      role="tablist"
    >
      <div className="flex gap-0">
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.value)}
              className={cn(
                "relative px-4 pb-3 pt-1 text-sm font-medium transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                isActive
                  ? "text-black font-semibold"
                  : "text-grey-500 hover:text-grey-700"
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
