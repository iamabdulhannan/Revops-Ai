"use client";

import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/cn";
import { stepMeta } from "./playbook-flow-utils";

interface PlaybookNodeData {
  stepId: string;
  order: number;
  type: "trigger" | "condition" | "action" | "delay";
  label: string;
  description: string;
  [key: string]: unknown;
}

export function PlaybookFlowNode({ data }: { data: PlaybookNodeData }) {
  const meta = stepMeta[data.type];
  const Icon = meta.icon;

  return (
    <div className="w-[280px] rounded-[6px] border border-border bg-white shadow-card">
      {/* Target handle (top) */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-transparent !border-none !opacity-0"
      />

      <div className="flex items-start gap-3 p-4">
        {/* Step icon badge */}
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border",
            meta.bgClass
          )}
        >
          <Icon className={cn("h-4 w-4", meta.colorClass)} />
        </div>

        {/* Step content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xs font-semibold text-grey-400">
              Step {data.order}
            </span>
            <span className="text-2xs text-grey-400 capitalize">
              {data.type}
            </span>
          </div>
          <p className="mt-0.5 text-sm font-semibold text-black">
            {data.label}
          </p>
          <p className="mt-0.5 text-xs text-grey-500 line-clamp-2">
            {data.description}
          </p>
        </div>
      </div>

      {/* Source handle (bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-transparent !border-none !opacity-0"
      />
    </div>
  );
}
