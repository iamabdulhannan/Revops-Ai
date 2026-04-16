"use client";

import { useState } from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";
import { Dropdown } from "@/components/ui/Dropdown";
import type { Deal } from "@/types";
import {
  type StageKey,
  STAGE_ORDER,
  STAGE_LABELS,
  groupDealsByStage,
} from "./pipeline-data";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface PipelineListViewProps {
  deals: Deal[];
  onDealMove: (dealId: string, newStage: Deal["stage"]) => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function healthColor(score: number): string {
  if (score >= 70) return "bg-success";
  if (score >= 40) return "bg-warning";
  return "bg-danger";
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ------------------------------------------------------------------ */
/*  PipelineListView                                                   */
/* ------------------------------------------------------------------ */

export function PipelineListView({
  deals,
  onDealMove,
}: PipelineListViewProps) {
  const [collapsedStages, setCollapsedStages] = useState<Set<StageKey>>(
    new Set()
  );

  const dealsByStage = groupDealsByStage(deals);

  function toggleCollapse(stage: StageKey) {
    setCollapsedStages((prev) => {
      const next = new Set(prev);
      if (next.has(stage)) {
        next.delete(stage);
      } else {
        next.add(stage);
      }
      return next;
    });
  }

  return (
    <div className="space-y-4">
      {STAGE_ORDER.map((stage) => {
        const stageDeals = dealsByStage[stage];
        const isCollapsed = collapsedStages.has(stage);
        const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

        return (
          <div
            key={stage}
            className="rounded-[6px] bg-white border border-border overflow-hidden"
          >
            {/* Group header */}
            <button
              type="button"
              onClick={() => toggleCollapse(stage)}
              className="w-full flex items-center justify-between px-4 py-3 bg-grey-50 hover:bg-grey-100 transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <ChevronRight
                  size={14}
                  className={cn(
                    "text-grey-500 transition-transform duration-150",
                    !isCollapsed && "rotate-90"
                  )}
                />
                <span className="text-sm font-semibold text-black">
                  {STAGE_LABELS[stage]}
                </span>
                <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-grey-200 px-1.5 text-2xs font-medium text-grey-600">
                  {stageDeals.length}
                </span>
              </div>
              <span className="text-xs font-medium text-grey-500">
                ${(totalValue / 1000).toFixed(0)}K
              </span>
            </button>

            {/* Deal rows */}
            {!isCollapsed && stageDeals.length > 0 && (
              <div>
                {/* Table header */}
                <div className="grid grid-cols-[2fr_90px_70px_50px] md:grid-cols-[2fr_110px_90px_90px_100px_80px_50px] gap-2 px-4 py-2 border-b border-grey-200 text-xs uppercase font-medium text-grey-500 tracking-wider">
                  <span>Deal</span>
                  <span>Value</span>
                  <span>Health</span>
                  <span className="hidden md:block">Assignee</span>
                  <span className="hidden md:block">Activity</span>
                  <span className="hidden md:block">Days</span>
                  <span />
                </div>

                {/* Rows */}
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="grid grid-cols-[2fr_90px_70px_50px] md:grid-cols-[2fr_110px_90px_90px_100px_80px_50px] items-center gap-2 px-4 py-3 border-b border-grey-100 last:border-b-0 hover:bg-grey-50 transition-colors duration-150"
                  >
                    {/* Deal name + company */}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-black truncate">
                        {deal.title}
                      </p>
                      <p className="text-2xs text-grey-500 truncate">
                        {deal.company}
                      </p>
                    </div>

                    {/* Value */}
                    <span className="text-sm font-bold text-black">
                      ${deal.value.toLocaleString()}
                    </span>

                    {/* Health */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full shrink-0",
                          healthColor(deal.healthScore)
                        )}
                      />
                      <span className="text-xs text-grey-600">
                        {deal.healthScore}
                      </span>
                    </div>

                    {/* Assignee (hidden on mobile) */}
                    <div className="hidden md:flex items-center">
                      <div className="h-6 w-6 rounded-full bg-grey-800 flex items-center justify-center">
                        <span className="text-2xs font-semibold text-white">
                          {initials(deal.assignee)}
                        </span>
                      </div>
                    </div>

                    {/* Last Activity (hidden on mobile) */}
                    <span className="hidden md:block text-xs text-grey-400">
                      {deal.lastActivity}
                    </span>

                    {/* Days in Stage (hidden on mobile) */}
                    <span className="hidden md:block text-xs text-grey-400">
                      {deal.daysInStage}d
                    </span>

                    {/* Stage change dropdown */}
                    <Dropdown
                      align="right"
                      trigger={
                        <button
                          type="button"
                          className="p-1 text-grey-400 hover:text-black hover:bg-grey-100 rounded-sm transition-colors"
                          aria-label="Move deal"
                        >
                          <MoreHorizontal size={14} />
                        </button>
                      }
                      items={STAGE_ORDER.map((s) => ({
                        label: STAGE_LABELS[s],
                        onClick: () => onDealMove(deal.id, s),
                      }))}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isCollapsed && stageDeals.length === 0 && (
              <p className="px-4 py-6 text-center text-xs text-grey-400">
                No deals in this stage
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
