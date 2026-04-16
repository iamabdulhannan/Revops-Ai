"use client";

import { cn } from "@/lib/cn";
import type { Playbook } from "@/types";
import { Zap, Play } from "lucide-react";

interface PlaybookCardProps {
  playbook: Playbook;
}

export function PlaybookCard({ playbook }: PlaybookCardProps) {
  return (
    <div className="rounded-[6px] bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              playbook.active ? "bg-success-light" : "bg-grey-200"
            )}
          >
            <Zap
              className={cn(
                "h-4 w-4",
                playbook.active ? "text-success" : "text-grey-400"
              )}
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-black">
              {playbook.name}
            </h4>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  playbook.active ? "bg-success" : "bg-grey-400"
                )}
              />
              <span className="text-2xs text-grey-500">
                {playbook.active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs text-grey-500">
          <span className="font-medium text-grey-700">Trigger:</span>{" "}
          {playbook.trigger}
        </p>
        <p className="mt-1 text-xs text-grey-500">
          <span className="font-medium text-grey-700">Actions:</span>{" "}
          {playbook.actions.length} step{playbook.actions.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border-light pt-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-2xs text-grey-400">
            <Play className="h-3 w-3" />
            {playbook.executions} runs
          </span>
          <span className="text-2xs text-grey-400">
            Last: {playbook.lastRun}
          </span>
        </div>
      </div>
    </div>
  );
}
