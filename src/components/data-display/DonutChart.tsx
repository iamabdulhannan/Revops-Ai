"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import type { TooltipProps } from "recharts";
import { cn } from "@/lib/cn";

const defaultData = [
  { name: "Enterprise", value: 40 },
  { name: "Growth", value: 35 },
  { name: "Starter", value: 25 },
];

const COLORS = ["#000000", "#878787", "#e3e3e3"];

function formatCurrency(value: number): string {
  return `$${(value * 8).toFixed(0)}K`;
}

function CustomTooltip({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  const entry = payload[0];
  return (
    <div className="bg-white border border-black rounded-[6px] shadow-dropdown px-3 py-2">
      <p className="text-xs font-medium text-black">{entry.name}</p>
      <p className="text-xs text-grey-500 mt-0.5">
        Share:{" "}
        <span className="text-black font-medium">{entry.value}%</span>
      </p>
      <p className="text-xs text-grey-500 mt-0.5">
        Revenue:{" "}
        <span className="text-black font-medium">
          {formatCurrency(entry.value as number)}
        </span>
      </p>
    </div>
  );
}

interface DonutChartProps {
  data?: { name: string; value: number }[];
  centerLabel?: string;
  centerValue?: string;
  className?: string;
}

export function DonutChart({ data, centerLabel, centerValue, className }: DonutChartProps) {
  const chartData = data ?? defaultData;
  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className={cn("w-full h-[300px] relative", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold text-black">
          {centerValue ?? `$${(total * 8).toFixed(0)}K`}
        </span>
        <span className="text-xs text-grey-500">{centerLabel ?? "Total MRR"}</span>
      </div>
    </div>
  );
}
