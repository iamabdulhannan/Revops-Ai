"use client";

import { useState, useMemo, type ReactNode } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      let comparison = 0;
      if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortKey, sortDirection]);

  function renderSortIcon(key: string) {
    if (sortKey !== key) {
      return <ChevronsUpDown className="h-3 w-3 text-grey-400" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="h-3 w-3 text-black" />
    ) : (
      <ChevronDown className="h-3 w-3 text-black" />
    );
  }

  return (
    <div
      className={cn(
        "bg-white border border-grey-300 rounded-[6px] overflow-hidden",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-grey-50 border-b border-grey-300">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "text-left text-xs uppercase font-medium text-grey-500 px-4 py-3",
                    "tracking-wider",
                    column.sortable && "cursor-pointer select-none"
                  )}
                  onClick={
                    column.sortable
                      ? () => handleSort(column.key)
                      : undefined
                  }
                >
                  <div className="flex items-center gap-1">
                    <span>{column.label}</span>
                    {column.sortable && renderSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "border-b border-grey-100 last:border-b-0",
                  "transition-colors duration-150 hover:bg-grey-50"
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-3 text-sm text-black"
                  >
                    {column.render
                      ? column.render(
                          row[column.key] as T[keyof T],
                          row
                        )
                      : String(row[column.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-grey-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
