import { Zap, GitBranch, Play, Clock } from "lucide-react";
import type { Node, Edge } from "@xyflow/react";
import type { PlaybookStep } from "@/data/playbook-data";

/* ---------- shared step metadata ---------- */

export const stepMeta: Record<
  PlaybookStep["type"],
  { icon: typeof Zap; colorClass: string; bgClass: string }
> = {
  trigger: {
    icon: Zap,
    colorClass: "text-black",
    bgClass: "bg-grey-100 border-grey-300",
  },
  condition: {
    icon: GitBranch,
    colorClass: "text-grey-600",
    bgClass: "bg-grey-50 border-grey-300",
  },
  action: {
    icon: Play,
    colorClass: "text-success",
    bgClass: "bg-success-light border-success/30",
  },
  delay: {
    icon: Clock,
    colorClass: "text-warning",
    bgClass: "bg-warning-light border-warning/30",
  },
};

/* ---------- data → React Flow conversion ---------- */

const NODE_HEIGHT_ESTIMATE = 120;
const VERTICAL_GAP = 60;

export function stepsToNodesAndEdges(steps: PlaybookStep[]): {
  nodes: Node[];
  edges: Edge[];
} {
  const sorted = [...steps].sort((a, b) => a.order - b.order);

  const nodes: Node[] = sorted.map((step, idx) => ({
    id: step.id,
    type: "playbookStep",
    position: {
      x: 0,
      y: idx * (NODE_HEIGHT_ESTIMATE + VERTICAL_GAP),
    },
    data: {
      stepId: step.id,
      order: step.order,
      type: step.type,
      label: step.label,
      description: step.description,
    },
    draggable: false,
    selectable: false,
    connectable: false,
  }));

  const edges: Edge[] = sorted.slice(0, -1).map((step, idx) => ({
    id: `e-${step.id}-${sorted[idx + 1].id}`,
    source: step.id,
    target: sorted[idx + 1].id,
    type: "smoothstep",
    style: {
      stroke: "#e3e3e3",
      strokeWidth: 1.5,
    },
    animated: false,
  }));

  return { nodes, edges };
}
