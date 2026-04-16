import { cn } from "@/lib/cn";

interface HealthBadgeProps {
  status: "healthy" | "at-risk" | "critical";
  score?: number;
  showScore?: boolean;
  className?: string;
}

const statusConfig = {
  healthy: {
    dotColor: "bg-success",
    label: "Healthy",
  },
  "at-risk": {
    dotColor: "bg-warning",
    label: "At Risk",
  },
  critical: {
    dotColor: "bg-danger",
    label: "Critical",
  },
};

export function HealthBadge({
  status,
  score,
  showScore = false,
  className,
}: HealthBadgeProps) {
  const { dotColor, label } = statusConfig[status];

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn("h-2 w-2 rounded-full shrink-0", dotColor)}
        aria-hidden="true"
      />
      <span className="text-xs font-medium text-black">{label}</span>
      {showScore && score !== undefined && (
        <span className="text-xs text-grey-500">({score})</span>
      )}
    </div>
  );
}
