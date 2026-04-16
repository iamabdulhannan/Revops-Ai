"use client";

import { cn } from "@/lib/cn";
import {
  FileText,
  CreditCard,
  MessageSquare,
  Mail,
  Users,
} from "lucide-react";

const events = [
  {
    id: "1",
    icon: FileText,
    iconBg: "bg-info-light",
    iconColor: "text-info",
    title: "Contract renewed",
    description: "Annual contract renewed for $48,000",
    timestamp: "2 days ago",
  },
  {
    id: "2",
    icon: CreditCard,
    iconBg: "bg-success-light",
    iconColor: "text-success",
    title: "Payment received",
    description: "Monthly invoice of $4,000 paid",
    timestamp: "5 days ago",
  },
  {
    id: "3",
    icon: MessageSquare,
    iconBg: "bg-warning-light",
    iconColor: "text-warning",
    title: "Support ticket opened",
    description: "Integration issue reported by engineering team",
    timestamp: "1 week ago",
  },
  {
    id: "4",
    icon: Users,
    iconBg: "bg-grey-200",
    iconColor: "text-grey-700",
    title: "QBR completed",
    description: "Quarterly business review held with stakeholders",
    timestamp: "2 weeks ago",
  },
  {
    id: "5",
    icon: Mail,
    iconBg: "bg-info-light",
    iconColor: "text-info",
    title: "Onboarding email sent",
    description: "Welcome sequence triggered for 5 new users",
    timestamp: "3 weeks ago",
  },
];

export function CustomerTimeline() {
  return (
    <div className="rounded-[6px] bg-white p-6 shadow-card">
      <h3 className="text-md font-semibold text-black">Timeline</h3>

      <div className="mt-5 space-y-0">
        {events.map((event, index) => {
          const Icon = event.icon;
          const isLast = index === events.length - 1;
          return (
            <div key={event.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    event.iconBg
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", event.iconColor)} />
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-border-light" />
                )}
              </div>
              <div className={cn("pb-6", isLast && "pb-0")}>
                <p className="text-sm font-medium text-black">{event.title}</p>
                <p className="mt-0.5 text-xs text-grey-500">
                  {event.description}
                </p>
                <p className="mt-1 text-2xs text-grey-400">
                  {event.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
