"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { SIDEBAR_NAVIGATION } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { SidebarItem } from "./SidebarItem";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-white shadow-modal flex flex-col transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-grey-300 shrink-0">
          <Link
            href={ROUTES.HOME}
            className="text-lg font-bold text-black tracking-tight"
            onClick={onClose}
          >
            RevOps AI
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-grey-500 hover:text-black hover:bg-grey-50 rounded-sm transition-colors duration-150"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-6">
            {SIDEBAR_NAVIGATION.map((group) => (
              <div key={group.label}>
                <p className="px-3 mb-2 text-2xs font-semibold uppercase tracking-wider text-grey-400">
                  {group.label}
                </p>
                <div className="space-y-0.5" onClick={onClose}>
                  {group.items.map((item) => (
                    <SidebarItem
                      key={item.path}
                      label={item.label}
                      path={item.path}
                      icon={item.icon}
                      badge={item.badge}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* User area */}
        <div className="shrink-0 border-t border-grey-300 py-3 px-4">
          <div className="flex items-center gap-3 rounded-sm p-2">
            <div className="shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <span className="text-xs font-semibold text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black truncate">John Doe</p>
              <p className="text-2xs text-grey-500 truncate">john@company.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
