"use client";

import { cn } from "@/lib/cn";
import {
  DollarSign,
  UserMinus,
  CreditCard,
  FileText,
  Users,
  Mail,
} from "lucide-react";

const activities = [
  {
    id: "1",
    icon: FileText,
    iconBg: "bg-info-light",
    iconColor: "text-info",
    text: "New deal: Acme Corp - $45K",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    icon: UserMinus,
    iconBg: "bg-danger-light",
    iconColor: "text-danger",
    text: "Customer churned: DataSync Ltd",
    timestamp: "18 min ago",
  },
  {
    id: "3",
    icon: CreditCard,
    iconBg: "bg-success-light",
    iconColor: "text-success",
    text: "Payment received: $12,500 from TechFlow",
    timestamp: "1 hr ago",
  },
  {
    id: "4",
    icon: Users,
    iconBg: "bg-info-light",
    iconColor: "text-info",
    text: "Meeting scheduled: CloudOps renewal call",
    timestamp: "2 hr ago",
  },
  {
    id: "5",
    icon: DollarSign,
    iconBg: "bg-success-light",
    iconColor: "text-success",
    text: "Deal closed: NetBridge - $28K ARR",
    timestamp: "4 hr ago",
  },
  {
    id: "6",
    icon: Mail,
    iconBg: "bg-warning-light",
    iconColor: "text-warning",
    text: "Follow-up sent: Proposal to Orion Systems",
    timestamp: "5 hr ago",
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-[6px] bg-white p-6 shadow-card">
      <h3 className="text-md font-semibold text-black">Recent Activity</h3>

      <div className="mt-5 space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  activity.iconBg
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", activity.iconColor)} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-black">{activity.text}</p>
                <p className="mt-0.5 text-2xs text-grey-400">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-5 w-full text-center text-xs font-medium text-grey-500 transition-colors hover:text-black"
      >
        View all activity
      </button>
    </div>
  );
}
