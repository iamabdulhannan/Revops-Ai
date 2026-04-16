"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Toggle } from "@/components/ui/Toggle";
import { cn } from "@/lib/cn";

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({
    email: true,
    slack: true,
    churn: true,
    weekly: false,
  });
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your workspace configuration" />

      {/* Settings sub-navigation */}
      <div className="flex items-center gap-0 border-b border-grey-200 mb-6">
        {[
          { label: "General", href: "/settings", active: true },
          { label: "Team", href: "/settings/team", active: false },
          { label: "Billing", href: "/settings/billing", active: false },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "relative px-4 pb-3 pt-1 text-sm font-medium transition-colors duration-150",
              tab.active
                ? "text-black font-semibold"
                : "text-grey-500 hover:text-grey-700"
            )}
          >
            {tab.label}
            {tab.active && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </Link>
        ))}
      </div>

      <div className="space-y-6">
        {/* Workspace section */}
        <div className="rounded-[6px] bg-white border border-border p-6 shadow-card">
          <h3 className="text-base font-semibold text-black">Workspace</h3>
          <p className="mt-1 text-sm text-grey-500">
            General workspace settings and branding.
          </p>

          <div className="mt-5 space-y-4 max-w-md">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="workspace-name"
                className="text-xs font-medium text-grey-700 uppercase tracking-wider"
              >
                Workspace Name
              </label>
              <input
                id="workspace-name"
                type="text"
                defaultValue="My Company"
                className="h-10 w-full px-3 border border-grey-300 rounded-sm bg-white text-base placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-grey-700 uppercase tracking-wider">
                Workspace Logo
              </label>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-[6px] bg-grey-100 border border-border-light flex items-center justify-center">
                  <span className="text-xs text-grey-400">Logo</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-sm bg-white text-black border border-grey-300 hover:bg-grey-50 transition-colors duration-150"
                >
                  Upload
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className={cn(
                "inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-sm transition-colors duration-150",
                saved
                  ? "bg-success text-white"
                  : "bg-black text-white hover:bg-grey-800"
              )}
            >
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Notifications section */}
        <div className="rounded-[6px] bg-white border border-border p-6 shadow-card">
          <h3 className="text-base font-semibold text-black">Notifications</h3>
          <p className="mt-1 text-sm text-grey-500">
            Configure how and when you receive notifications.
          </p>

          <div className="mt-5 space-y-4 max-w-md">
            {([
              { key: "email" as const, label: "Email notifications", description: "Receive updates via email" },
              { key: "slack" as const, label: "Slack notifications", description: "Get alerts in Slack channels" },
              { key: "churn" as const, label: "Churn alerts", description: "Notify when health scores drop" },
              { key: "weekly" as const, label: "Weekly digest", description: "Summary report every Monday" },
            ]).map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="text-sm font-medium text-black">{item.label}</p>
                  <p className="text-xs text-grey-500">{item.description}</p>
                </div>
                <Toggle
                  checked={notifs[item.key]}
                  onChange={(val) =>
                    setNotifs((prev) => ({ ...prev, [item.key]: val }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-[6px] bg-white border border-danger/30 p-6 shadow-card">
          <h3 className="text-base font-semibold text-danger">Danger Zone</h3>
          <p className="mt-1 text-sm text-grey-500">
            Irreversible actions that affect your entire workspace.
          </p>

          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-sm bg-danger text-white hover:bg-danger-dark transition-colors duration-150"
            >
              Delete Workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
