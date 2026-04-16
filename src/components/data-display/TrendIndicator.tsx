import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

interface TrendIndicatorProps {
  value: number;
  label?: string;
  trend: "up" | "down" | "flat";
  className?: string;
}

const trendConfig = {
  up: {
    icon: TrendingUp,
    textColor: "text-success",
  },
  down: {
    icon: TrendingDown,
    textColor: "text-danger",
  },
  flat: {
    icon: Minus,
    textColor: "text-grey-500",
  },
};

export function TrendIndicator({
  value,
  label,
  trend,
  className,
}: TrendIndicatorProps) {
  const { icon: TrendIcon, textColor } = trendConfig[trend];

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <TrendIcon className={cn("h-3.5 w-3.5", textColor)} />
      <span className={cn("text-xs font-medium", textColor)}>
        {value > 0 ? "+" : ""}
        {value}%
      </span>
      {label && <span className="text-xs text-grey-400">{label}</span>}
    </div>
  );
}
