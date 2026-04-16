"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/cn";
import { Dropdown } from "@/components/ui/Dropdown";

export function TopBar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-grey-300">
      <div className="h-full flex items-center justify-between px-6 gap-4">
        {/* Left: Search input */}
        <div className="flex-1 max-w-md">
          <div
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-sm border transition-colors duration-150",
              searchFocused
                ? "border-black"
                : "border-grey-300 hover:border-grey-400"
            )}
          >
            <Search size={16} className="shrink-0 text-grey-400" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent text-sm text-black placeholder:text-grey-400 outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right: Notifications + User */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="relative p-2 text-grey-500 hover:text-black hover:bg-grey-50 rounded-sm transition-colors duration-150"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
              </button>
            }
            items={[
              { label: "Acme Corp deal moved to Negotiation", onClick: () => {} },
              { label: "New churn alert: DataSync Ltd", onClick: () => {} },
              { label: "Playbook completed for CloudOps", onClick: () => {} },
            ]}
          />

          {/* User avatar dropdown */}
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 p-1.5 hover:bg-grey-50 rounded-sm transition-colors duration-150"
                aria-label="User menu"
              >
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
                  <span className="text-2xs font-semibold text-white">JD</span>
                </div>
                <ChevronDown size={14} className="text-grey-400" />
              </button>
            }
            items={[
              { label: "Profile", onClick: () => {}, icon: <User size={14} /> },
              { label: "Settings", onClick: () => {}, icon: <Settings size={14} /> },
              { label: "Sign Out", onClick: () => {}, icon: <LogOut size={14} /> },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
