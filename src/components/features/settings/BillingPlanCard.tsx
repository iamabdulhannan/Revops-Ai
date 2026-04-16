"use client";

import { cn } from "@/lib/cn";
import { Check } from "lucide-react";

interface BillingPlanCardProps {
  name: string;
  price: string;
  features: string[];
  current: boolean;
}

export function BillingPlanCard({
  name,
  price,
  features,
  current,
}: BillingPlanCardProps) {
  return (
    <div
      className={cn(
        "rounded-[6px] border bg-white p-5",
        current ? "border-black" : "border-border"
      )}
    >
      <div>
        <h4 className="text-sm font-semibold text-black">{name}</h4>
        <p className="mt-2 text-2xl font-bold text-black">{price}</p>
        <p className="text-xs text-grey-500">per month</p>
      </div>

      <ul className="mt-5 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 shrink-0 text-success" />
            <span className="text-xs text-grey-700">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        {current ? (
          <span className="inline-flex w-full items-center justify-center rounded-[6px] border border-black bg-white px-4 py-2 text-xs font-medium text-black">
            Current Plan
          </span>
        ) : (
          <button
            type="button"
            className="w-full rounded-[6px] bg-black px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-grey-800"
          >
            Upgrade
          </button>
        )}
      </div>
    </div>
  );
}
