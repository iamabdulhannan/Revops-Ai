import { cn } from "@/lib/cn";
import type { TimelineEvent as TimelineEventType } from "@/types";

interface TimelineEventProps {
  event: TimelineEventType;
  className?: string;
}

const dotColorMap: Record<TimelineEventType["type"], string> = {
  deal: "bg-black",
  payment: "bg-success",
  support: "bg-warning",
  email: "bg-info",
  meeting: "bg-grey-500",
  note: "bg-grey-400",
};

const sourceBadgeMap: Record<string, string> = {
  salesforce: "bg-grey-50 text-grey-700",
  stripe: "bg-grey-50 text-grey-700",
  zendesk: "bg-grey-50 text-grey-700",
  hubspot: "bg-grey-50 text-grey-700",
  gmail: "bg-grey-50 text-grey-700",
  calendar: "bg-grey-50 text-grey-700",
  manual: "bg-grey-50 text-grey-500",
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export function TimelineEventCard({ event, className }: TimelineEventProps) {
  const dotColor = dotColorMap[event.type] || "bg-grey-400";
  const badgeStyle =
    sourceBadgeMap[event.source.toLowerCase()] ||
    "bg-grey-50 text-grey-700";

  return (
    <div className={cn("flex items-start gap-3 group", className)}>
      <div className="flex flex-col items-center pt-1">
        <span
          className={cn("h-2.5 w-2.5 rounded-full shrink-0", dotColor)}
          aria-hidden="true"
        />
      </div>

      <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-black truncate">
            {event.title}
          </p>
          <p className="text-xs text-grey-500 mt-0.5 line-clamp-2">
            {event.description}
          </p>
          <p className="text-2xs text-grey-400 mt-1">
            {formatTimestamp(event.timestamp)}
          </p>
        </div>

        <span
          className={cn(
            "inline-flex items-center shrink-0 px-2 py-0.5 rounded-sm text-2xs font-medium",
            badgeStyle
          )}
        >
          {event.source}
        </span>
      </div>
    </div>
  );
}
