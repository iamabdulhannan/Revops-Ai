"use client";

import { cn } from "@/lib/cn";
import { AlertTriangle, TrendingDown } from "lucide-react";

const atRiskAccounts = [
  { name: "DataSync Ltd", riskScore: 87, mrr: 4200 },
  { name: "CloudOps Inc", riskScore: 74, mrr: 3800 },
  { name: "NetFlow Systems", riskScore: 68, mrr: 2900 },
];

export function ChurnAnalysis() {
  return (
    <div className="rounded-[6px] bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold text-black">Churn Analysis</h3>
        <AlertTriangle className="h-4 w-4 text-warning" />
      </div>

      <div className="mt-5 flex items-center gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
            Current Churn
          </p>
          <p className="mt-1 text-2xl font-bold text-black">3.2%</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
            Previous Quarter
          </p>
          <p className="mt-1 text-2xl font-bold text-grey-500">4.1%</p>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingDown className="h-3.5 w-3.5 text-success" />
          <span className="text-xs font-medium text-success">
            0.9% improvement
          </span>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wider text-grey-500">
          At-Risk Accounts
        </p>
        <div className="mt-3 space-y-3">
          {atRiskAccounts.map((account) => (
            <div
              key={account.name}
              className="flex items-center justify-between rounded-[6px] border border-border-light px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-black">
                  {account.name}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "inline-flex items-center rounded-pill px-2 py-0.5 text-2xs font-semibold",
                    account.riskScore >= 80
                      ? "bg-danger-light text-danger"
                      : account.riskScore >= 70
                        ? "bg-warning-light text-warning"
                        : "bg-warning-light text-warning"
                  )}
                >
                  Risk: {account.riskScore}
                </span>
                <span className="text-sm font-bold text-black">
                  ${account.mrr.toLocaleString()}/mo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
