"use client";

import { cn } from "@/lib/cn";
import { LayoutDashboard, DollarSign, Megaphone, UserMinus } from "lucide-react";

type ReportType = "board" | "sales" | "marketing" | "churn";

interface ReportCardProps {
  title: string;
  description: string;
  type: ReportType;
  lastGenerated: string;
}

const typeConfig: Record<
  ReportType,
  { icon: typeof LayoutDashboard; bg: string; color: string }
> = {
  board: { icon: LayoutDashboard, bg: "bg-grey-200", color: "text-grey-700" },
  sales: { icon: DollarSign, bg: "bg-success-light", color: "text-success" },
  marketing: { icon: Megaphone, bg: "bg-info-light", color: "text-info" },
  churn: { icon: UserMinus, bg: "bg-danger-light", color: "text-danger" },
};

export function ReportCard({
  title,
  description,
  type,
  lastGenerated,
}: ReportCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="rounded-[6px] bg-white p-5 shadow-card">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            config.bg
          )}
        >
          <Icon className={cn("h-4.5 w-4.5", config.color)} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-black">{title}</h4>
          <p className="mt-1 text-xs text-grey-500">{description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border-light pt-4">
        <span className="text-2xs text-grey-400">
          Last generated: {lastGenerated}
        </span>
        <button
          type="button"
          className="rounded-[6px] bg-black px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-grey-800"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
