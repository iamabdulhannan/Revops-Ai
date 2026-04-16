import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
  actions,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[6px] shadow-card overflow-hidden",
        className
      )}
    >
      <div className="flex items-start justify-between px-6 pt-6 pb-4">
        <div>
          <h3 className="text-base font-semibold text-black">{title}</h3>
          {subtitle && (
            <p className="text-xs text-grey-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="px-6 pb-6 min-h-[300px]">{children}</div>
    </div>
  );
}
