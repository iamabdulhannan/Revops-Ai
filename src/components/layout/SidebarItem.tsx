"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Kanban,
  BarChart3,
  MessageSquareText,
  Workflow,
  Plug,
  Settings,
  ShieldCheck,
  ScanSearch,
  FileCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Kanban,
  BarChart3,
  MessageSquareText,
  Workflow,
  Plug,
  Settings,
  ShieldCheck,
  ScanSearch,
  FileCheck,
};

interface SidebarItemProps {
  label: string;
  path: string;
  icon: string;
  badge?: string;
  collapsed?: boolean;
}

export function SidebarItem({ label, path, icon, badge, collapsed = false }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === path || pathname.startsWith(path + "/");
  const Icon = iconMap[icon];

  const content = (
    <Link
      href={path}
      className={cn(
        "group relative flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm transition-colors duration-150",
        collapsed && "justify-center px-0",
        isActive
          ? "bg-black text-white"
          : "text-grey-600 hover:bg-grey-50 hover:text-black"
      )}
    >
      {Icon && (
        <Icon
          size={18}
          className={cn(
            "shrink-0",
            isActive ? "text-white" : "text-grey-500 group-hover:text-black"
          )}
        />
      )}

      {!collapsed && (
        <>
          <span className="truncate">{label}</span>
          {badge && (
            <span
              className={cn(
                "ml-auto inline-flex items-center justify-center px-1.5 py-0.5 text-2xs font-semibold rounded-sm",
                isActive
                  ? "bg-white text-black"
                  : "bg-grey-100 text-grey-600"
              )}
            >
              {badge}
            </span>
          )}
        </>
      )}

      {/* Tooltip for collapsed mode */}
      {collapsed && (
        <span className="absolute left-full ml-2 px-2 py-1 text-2xs font-medium text-white bg-black rounded-sm whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50 shadow-dropdown">
          {label}
          {badge && (
            <span className="ml-1.5 inline-flex items-center justify-center px-1 py-0.5 text-2xs font-semibold bg-white text-black rounded-sm">
              {badge}
            </span>
          )}
        </span>
      )}
    </Link>
  );

  return content;
}
