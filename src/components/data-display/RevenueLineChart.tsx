"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { TooltipProps } from "recharts";
import { cn } from "@/lib/cn";

const defaultData = [
  { month: "Jan", revenue: 182000 },
  { month: "Feb", revenue: 195000 },
  { month: "Mar", revenue: 210000 },
  { month: "Apr", revenue: 205000 },
  { month: "May", revenue: 228000 },
  { month: "Jun", revenue: 245000 },
  { month: "Jul", revenue: 252000 },
  { month: "Aug", revenue: 265000 },
  { month: "Sep", revenue: 278000 },
  { month: "Oct", revenue: 290000 },
  { month: "Nov", revenue: 305000 },
  { month: "Dec", revenue: 320000 },
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
      <p className="text-xs text-grey-500 mt-0.5">
        Revenue:{" "}
        <span className="text-black font-medium">
          {formatCurrency(payload[0].value as number)}
        </span>
      </p>
    </div>
  );
}

interface RevenueLineChartProps {
  data?: { month: string; revenue: number }[];
  className?: string;
}

export function RevenueLineChart({ data, className }: RevenueLineChartProps) {
  const chartData = data ?? defaultData;

  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
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
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#000000"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: "#000000",
              stroke: "#ffffff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
