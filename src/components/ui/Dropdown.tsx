"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
  align?: "left" | "right";
}

export function Dropdown({
  trigger,
  items,
  className,
  align = "left",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1 min-w-[180px] bg-white border border-grey-200 rounded shadow-dropdown animate-fade-in",
            align === "right" ? "right-0" : "left-0"
          )}
          role="menu"
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-grey-700 hover:bg-grey-50 hover:text-black transition-colors text-left"
                onClick={() => {
                  item.onClick();
                  close();
                }}
              >
                {item.icon && (
                  <span className="flex-shrink-0 text-grey-500">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
