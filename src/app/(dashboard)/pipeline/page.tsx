"use client";

import { useState, useMemo, useCallback } from "react";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/cn";
import { PageHeader } from "@/components/layout/PageHeader";
import { PipelineKanban } from "@/components/features/pipeline/PipelineKanban";
import { PipelineListView } from "@/components/features/pipeline/PipelineListView";
import { INITIAL_DEALS } from "@/components/features/pipeline/pipeline-data";
import type { Deal } from "@/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ViewMode = "board" | "list";

/* ------------------------------------------------------------------ */
/*  PipelinePage                                                       */
/* ------------------------------------------------------------------ */

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [view, setView] = useState<ViewMode>("board");

  /* ---- computed stats ---- */

  const stats = useMemo(() => {
    const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
    const count = deals.length;
    const avgValue = count > 0 ? totalValue / count : 0;
    return { totalValue, count, avgValue };
  }, [deals]);

  /* ---- handler ---- */

  const handleDealMove = useCallback(
    (dealId: string, newStage: Deal["stage"]) => {
      setDeals((prev) =>
        prev.map((d) =>
          d.id === dealId ? { ...d, stage: newStage, daysInStage: 0 } : d
        )
      );
    },
    []
  );

  return (
    <div className="min-w-0 w-full">
      <PageHeader title="Pipeline" subtitle="Track and manage your deals">
        {/* Segmented view toggle */}
        <div className="inline-flex rounded-sm border border-grey-300 overflow-hidden">
          <button
            type="button"
            onClick={() => setView("list")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors duration-150",
              view === "list"
                ? "bg-black text-white"
                : "bg-white text-grey-700 hover:bg-grey-50"
            )}
          >
            <List size={13} />
            List
          </button>
          <button
            type="button"
            onClick={() => setView("board")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors duration-150",
              view === "board"
                ? "bg-black text-white"
                : "bg-white text-grey-700 hover:bg-grey-50"
            )}
          >
            <LayoutGrid size={13} />
            Board
          </button>
        </div>
      </PageHeader>

      {/* Summary stats bar */}
      <div className="flex items-center gap-6 mb-5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-grey-500">Pipeline</span>
          <span className="text-sm font-bold text-black">
            ${(stats.totalValue / 1000).toFixed(0)}K
          </span>
        </div>
        <div className="h-3 w-px bg-grey-300" />
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-grey-500">Deals</span>
          <span className="text-sm font-bold text-black">{stats.count}</span>
        </div>
        <div className="h-3 w-px bg-grey-300" />
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-grey-500">Avg</span>
          <span className="text-sm font-bold text-black">
            ${(stats.avgValue / 1000).toFixed(1)}K
          </span>
        </div>
      </div>

      {/* Active view */}
      {view === "board" ? (
        <PipelineKanban deals={deals} onDealMove={handleDealMove} />
      ) : (
        <PipelineListView deals={deals} onDealMove={handleDealMove} />
      )}
    </div>
  );
}
