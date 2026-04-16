"use client";

import { TrendingDown, Activity, BarChart3, LineChart } from "lucide-react";

const prompts = [
  {
    icon: TrendingDown,
    text: "Why did churn spike?",
  },
  {
    icon: Activity,
    text: "Pipeline health summary",
  },
  {
    icon: BarChart3,
    text: "Top performing campaigns",
  },
  {
    icon: LineChart,
    text: "Revenue forecast",
  },
];

interface SuggestedPromptsProps {
  onSelect?: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {prompts.map((prompt) => {
        const Icon = prompt.icon;
        return (
          <button
            key={prompt.text}
            type="button"
            onClick={() => onSelect?.(prompt.text)}
            className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-grey-50"
          >
            <Icon className="h-4 w-4 shrink-0 text-grey-500" />
            <span className="text-sm text-black">{prompt.text}</span>
          </button>
        );
      })}
    </div>
  );
}
