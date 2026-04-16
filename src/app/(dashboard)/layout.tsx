"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[240px]">
        {/* Top bar with mobile hamburger */}
        <div className="sticky top-0 z-30">
          <div className="flex items-center">
            {/* Mobile hamburger button */}
            <button
              type="button"
              className="lg:hidden p-4 text-black hover:bg-grey-50 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="flex-1">
              <TopBar />
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 bg-background-secondary p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
