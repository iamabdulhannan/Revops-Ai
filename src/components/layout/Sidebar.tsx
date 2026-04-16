"use client";

import Link from "next/link";
import { SIDEBAR_NAVIGATION } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 bottom-0 z-40 flex flex-col bg-white border-r border-grey-300 transition-[width] duration-200 ease-in-out",
        collapsed ? "w-16" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "h-16 flex items-center shrink-0 border-b border-grey-300",
          collapsed ? "justify-center px-2" : "px-5"
        )}
      >
        <Link
          href={ROUTES.HOME}
          className={cn(
            "font-bold text-black tracking-tight transition-all duration-200",
            collapsed ? "text-base" : "text-lg"
          )}
        >
          {collapsed ? "R" : "RevOps AI"}
        </Link>
      </div>

      {/* Navigation groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-6">
          {SIDEBAR_NAVIGATION.map((group) => (
            <div key={group.label}>
              {/* Group label */}
              {!collapsed && (
                <p className="px-3 mb-2 text-2xs font-semibold uppercase tracking-wider text-grey-400">
                  {group.label}
                </p>
              )}

              {/* Collapsed mode: divider between groups */}
              {collapsed && (
                <div className="mb-2 mx-2 border-t border-grey-200" />
              )}

              {/* Group items */}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.path}
                    label={item.label}
                    path={item.path}
                    icon={item.icon}
                    badge={item.badge}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* User area at bottom */}
      <div
        className={cn(
          "shrink-0 border-t border-grey-300 py-3",
          collapsed ? "px-2" : "px-4"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 rounded-sm p-2 hover:bg-grey-50 transition-colors duration-150 cursor-pointer",
            collapsed && "justify-center"
          )}
        >
          {/* Avatar */}
          <div className="shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <span className="text-xs font-semibold text-white">JD</span>
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black truncate">John Doe</p>
              <p className="text-2xs text-grey-500 truncate">john@company.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
