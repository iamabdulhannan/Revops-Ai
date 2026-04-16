"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/constants/routes";

const NAV_LINKS = [
  { label: "Features", path: "/#features" },
  { label: "Use Cases", path: ROUTES.USE_CASES },
  { label: "Pricing", path: ROUTES.PRICING },
  { label: "About", path: ROUTES.ABOUT },
];

export function MarketingNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-grey-300">
      <div className="max-w-container mx-auto h-full px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="text-lg font-bold text-black tracking-tight">
          RevOps AI
        </Link>

        {/* Center nav links - desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "text-sm font-medium transition-colors duration-150",
                pathname === link.path
                  ? "text-black"
                  : "text-grey-600 hover:text-black"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side buttons - desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={ROUTES.LOGIN}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-transparent hover:bg-grey-50 rounded-sm transition-colors duration-150"
          >
            Login
          </Link>
          <Link
            href={ROUTES.REGISTER}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black hover:bg-grey-800 rounded-sm shadow-button transition-colors duration-150"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-black hover:bg-grey-50 rounded-sm transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-grey-300 animate-fade-in">
          <div className="max-w-container mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2.5 text-sm font-medium rounded-sm transition-colors duration-150",
                  pathname === link.path
                    ? "text-black bg-grey-50"
                    : "text-grey-600 hover:text-black hover:bg-grey-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-grey-300 flex flex-col gap-2">
              <Link
                href={ROUTES.LOGIN}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-black bg-transparent hover:bg-grey-50 rounded-sm transition-colors duration-150"
              >
                Login
              </Link>
              <Link
                href={ROUTES.REGISTER}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-black hover:bg-grey-800 rounded-sm shadow-button transition-colors duration-150"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
