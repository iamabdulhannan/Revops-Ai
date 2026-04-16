"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/cn";

interface ComplianceScoreGaugeProps {
  score: number;
  label?: string;
  className?: string;
}

export function ComplianceScoreGauge({
  score,
  label,
  className,
}: ComplianceScoreGaugeProps) {
  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  const scoreColor =
    score >= 80 ? "#32cda3" : score >= 60 ? "#ffb038" : "#eb5757";

  const colors = [scoreColor, "#f4f4f4"];

  return (
    <div className={cn("w-full h-[250px] relative", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={105}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Centered overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-black">{score}</span>
        {label && (
          <span className="text-xs text-grey-500">{label}</span>
        )}
      </div>
    </div>
  );
}
