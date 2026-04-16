import { cn } from "@/lib/cn";
import type { TimelineEvent } from "@/types";
import { TimelineEventCard } from "./TimelineEvent";

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  if (events.length === 0) {
    return (
      <div className={cn("py-8 text-center text-sm text-grey-500", className)}>
        No events to display
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div
        className="absolute left-[5px] top-2 bottom-2 w-px bg-grey-200"
        aria-hidden="true"
      />

      <div className="space-y-4">
        {events.map((event) => (
          <TimelineEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
