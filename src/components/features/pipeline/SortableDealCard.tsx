"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Deal } from "@/types";
import { DealCard } from "./DealCard";

interface SortableDealCardProps {
  deal: Deal;
}

export function SortableDealCard({ deal }: SortableDealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <DealCard
      ref={setNodeRef}
      deal={deal}
      isDragging={isDragging}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
}
