"use client";

import { cn } from "@/lib/cn";
import type { Integration } from "@/types";

interface IntegrationCardProps {
  integration: Integration;
}

const categoryColors: Record<Integration["category"], string> = {
  crm: "bg-info-light text-info",
  billing: "bg-success-light text-success",
  support: "bg-warning-light text-warning",
  analytics: "bg-grey-200 text-grey-700",
  marketing: "bg-danger-light text-danger",
  communication: "bg-info-light text-info",
};

export function IntegrationCard({ integration }: IntegrationCardProps) {
  return (
    <div className="rounded-[6px] bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-grey-50 text-lg">
            {integration.logo}
          </span>
          <div>
            <h4 className="text-sm font-semibold text-black">
              {integration.name}
            </h4>
            <span
              className={cn(
                "mt-1 inline-block rounded-pill px-2 py-0.5 text-2xs font-medium capitalize",
                categoryColors[integration.category]
              )}
            >
              {integration.category}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-grey-500">{integration.description}</p>

      <div className="mt-4">
        {integration.connected ? (
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-success-light px-3 py-1 text-xs font-medium text-success">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
            Connected
          </span>
        ) : (
          <button
            type="button"
            className="rounded-[6px] bg-black px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-grey-800"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
}
