"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { TooltipProps } from "recharts";
import { cn } from "@/lib/cn";

const defaultData = [
  { month: "Jul", newRevenue: 48000, churnedRevenue: 12000 },
  { month: "Aug", newRevenue: 55000, churnedRevenue: 8000 },
  { month: "Sep", newRevenue: 62000, churnedRevenue: 15000 },
  { month: "Oct", newRevenue: 58000, churnedRevenue: 10000 },
  { month: "Nov", newRevenue: 72000, churnedRevenue: 9000 },
  { month: "Dec", newRevenue: 80000, churnedRevenue: 11000 },
];

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-black rounded-[6px] shadow-dropdown px-3 py-2">
      <p className="text-xs font-medium text-black">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-xs text-grey-500 mt-0.5">
          {entry.dataKey === "newRevenue" ? "New" : "Churned"}:{" "}
          <span className="text-black font-medium">
            {formatCurrency(entry.value as number)}
          </span>
        </p>
      ))}
    </div>
  );
}

interface RevenueBarChartProps {
  data?: { month: string; newRevenue: number; churnedRevenue: number }[];
  className?: string;
}

export function RevenueBarChart({ data, className }: RevenueBarChartProps) {
  const chartData = data ?? defaultData;

  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f4f4f4"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#878787" }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#878787" }}
            tickFormatter={formatCurrency}
            dx={-4}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="newRevenue"
            fill="#000000"
            radius={[3, 3, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="churnedRevenue"
            fill="#e3e3e3"
            radius={[3, 3, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
