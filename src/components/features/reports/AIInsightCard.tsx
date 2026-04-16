"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

interface AIInsightCardProps {
  title: string;
  content: string;
  className?: string;
}

export function AIInsightCard({ title, content, className }: AIInsightCardProps) {
  return (
    <div className={cn("rounded-[6px] bg-white border border-border p-6 shadow-card", className)}>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-grey-100">
          <Sparkles className="h-3.5 w-3.5 text-grey-600" />
        </div>
        <span className="inline-flex items-center rounded-pill bg-grey-100 px-2 py-0.5 text-2xs font-semibold text-grey-600">
          AI Insight
        </span>
        <span className="text-sm font-semibold text-black">{title}</span>
      </div>
      <p className="text-sm text-grey-600 leading-relaxed">{content}</p>
    </div>
  );
}
