import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { customersMap } from "@/data/mock-data";
import { cn } from "@/lib/cn";

const healthColors: Record<string, string> = {
  healthy: "bg-success",
  "at-risk": "bg-warning",
  critical: "bg-danger",
};

const healthLabels: Record<string, string> = {
  healthy: "Healthy",
  "at-risk": "At Risk",
  critical: "Critical",
};

const eventIcons: Record<string, { icon: string; color: string }> = {
  deal: { icon: "\u{1F4B0}", color: "bg-success-light" },
  payment: { icon: "\u{1F4B3}", color: "bg-info-light" },
  support: { icon: "\u{1F3A7}", color: "bg-warning-light" },
  email: { icon: "\u{1F4E7}", color: "bg-grey-100" },
  meeting: { icon: "\u{1F4C5}", color: "bg-grey-100" },
  note: { icon: "\u{1F4DD}", color: "bg-grey-100" },
};

export default function CustomerDetailPage({
  params,
}: {
  params: { customerId: string };
}) {
  const customer = customersMap[params.customerId];

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-bold text-black mb-2">Customer Not Found</h2>
        <p className="text-sm text-grey-500 mb-4">
          The customer you are looking for does not exist.
        </p>
        <Link
          href="/customers"
          className="text-sm font-medium text-black underline hover:text-grey-700"
        >
          Back to Customers
        </Link>
      </div>
    );
  }

  const initials = customer.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div>
      <Link
        href="/customers"
        className="inline-flex items-center gap-1 text-sm text-grey-500 hover:text-black transition-colors duration-150 mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Customers
      </Link>

      <PageHeader title={customer.name} subtitle={customer.company} />

      {/* Profile + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-[6px] bg-white border border-border p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-grey-800 flex items-center justify-center">
              <span className="text-lg font-bold text-white">{initials}</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-black">
                {customer.name}
              </h3>
              <p className="text-sm text-grey-500">{customer.email}</p>
              <p className="text-xs text-grey-400 mt-0.5">
                Joined {customer.joinedAt}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[6px] bg-white border border-border p-6 shadow-card">
          <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
            Monthly Recurring Revenue
          </p>
          <p className="mt-2 text-2xl font-bold text-black">
            ${customer.mrr.toLocaleString()}/mo
          </p>
          <p className="mt-1 text-xs text-grey-500">
            ${(customer.mrr * 12).toLocaleString()} ARR
          </p>
        </div>

        <div className="rounded-[6px] bg-white border border-border p-6 shadow-card">
          <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
            Health Score
          </p>
          <div className="mt-2 flex items-center gap-3">
            <p className="text-2xl font-bold text-black">
              {customer.healthScore}/100
            </p>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-2xs font-semibold text-white",
                healthColors[customer.status]
              )}
            >
              {healthLabels[customer.status]}
            </span>
          </div>
          <div className="mt-3 w-full h-2 bg-grey-100 rounded-pill overflow-hidden">
            <div
              className={cn("h-full rounded-pill", healthColors[customer.status])}
              style={{ width: `${customer.healthScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-6 rounded-[6px] bg-white border border-border p-6 shadow-card">
        <h3 className="text-base font-semibold text-black mb-4">
          Activity Timeline
        </h3>

        <div className="space-y-4">
          {customer.events.map((event) => {
            const eventConfig = eventIcons[event.type] ?? {
              icon: "\u{1F4CB}",
              color: "bg-grey-100",
            };
            return (
              <div key={event.id} className="flex gap-4">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-sm",
                    eventConfig.color
                  )}
                >
                  {eventConfig.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-black">
                      {event.title}
                    </p>
                    <span className="text-xs text-grey-400 shrink-0">
                      {event.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-grey-500 mt-0.5">
                    {event.description}
                  </p>
                  <span className="inline-flex items-center mt-1 rounded-pill bg-grey-100 px-2 py-0.5 text-2xs font-medium text-grey-600">
                    {event.source}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
