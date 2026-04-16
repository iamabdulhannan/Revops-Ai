"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/cn";
import type { Deal } from "@/types";
import { DealCard } from "./DealCard";
import { SortableDealCard } from "./SortableDealCard";
import {
  type StageKey,
  STAGE_ORDER,
  STAGE_LABELS,
  groupDealsByStage,
} from "./pipeline-data";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface PipelineKanbanProps {
  deals: Deal[];
  onDealMove: (dealId: string, newStage: Deal["stage"]) => void;
}

/* ------------------------------------------------------------------ */
/*  StageColumn — droppable column                                     */
/* ------------------------------------------------------------------ */

function StageColumn({
  stage,
  deals,
}: {
  stage: StageKey;
  deals: Deal[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-w-[280px] w-[280px] flex-shrink-0 rounded-lg p-3 transition-colors duration-150",
        isOver ? "bg-grey-100 ring-2 ring-grey-300" : "bg-grey-50"
      )}
    >
      {/* Column header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-black">
            {STAGE_LABELS[stage]}
          </h4>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-grey-200 text-2xs font-medium text-grey-600">
            {deals.length}
          </span>
        </div>
        <span className="text-xs font-medium text-grey-500">
          ${(totalValue / 1000).toFixed(0)}K
        </span>
      </div>

      {/* Sortable deal cards */}
      <SortableContext
        items={deals.map((d) => d.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3 min-h-[40px]">
          {deals.map((deal) => (
            <SortableDealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PipelineKanban — main board with DndContext                        */
/* ------------------------------------------------------------------ */

export function PipelineKanban({ deals, onDealMove }: PipelineKanbanProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  const dealsByStage = groupDealsByStage(deals);

  /* ---- helpers ---- */

  function findStageForDealId(id: string): StageKey | null {
    const deal = deals.find((d) => d.id === id);
    return deal ? (deal.stage as StageKey) : null;
  }

  /* ---- drag handlers ---- */

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeDealId = active.id as string;
    const overId = over.id as string;

    // Dragging over a stage column directly
    if ((STAGE_ORDER as readonly string[]).includes(overId)) {
      const activeDeal = deals.find((d) => d.id === activeDealId);
      if (activeDeal && activeDeal.stage !== overId) {
        onDealMove(activeDealId, overId as Deal["stage"]);
      }
      return;
    }

    // Dragging over another deal card — find which stage it belongs to
    const activeStage = findStageForDealId(activeDealId);
    const overStage = findStageForDealId(overId);

    if (activeStage && overStage && activeStage !== overStage) {
      onDealMove(activeDealId, overStage as Deal["stage"]);
    }
  }

  function handleDragEnd(_event: DragEndEvent) {
    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const activeDeal = activeId
    ? deals.find((d) => d.id === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGE_ORDER.map((stage) => (
          <StageColumn
            key={stage}
            stage={stage}
            deals={dealsByStage[stage]}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeDeal ? (
          <DealCard deal={activeDeal} isDragOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
