"use client";

import { useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./playbook-flow.css";

import type { PlaybookStep } from "@/data/playbook-data";
import { stepsToNodesAndEdges } from "./playbook-flow-utils";
import { PlaybookFlowNode } from "./PlaybookFlowNode";

/* nodeTypes must be defined OUTSIDE the component to prevent
   React Flow from re-registering on every render */
const nodeTypes: NodeTypes = {
  playbookStep: PlaybookFlowNode as unknown as NodeTypes[string],
};

interface PlaybookFlowViewProps {
  steps: PlaybookStep[];
}

export function PlaybookFlowView({ steps }: PlaybookFlowViewProps) {
  const { nodes, edges } = useMemo(
    () => stepsToNodesAndEdges(steps),
    [steps]
  );

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

  return (
    <div
      className="rounded-[6px] bg-white border border-border shadow-card overflow-hidden"
      style={{ height: 600 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        proOptions={{ hideAttribution: true }}
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#e3e3e3"
        />
        <Controls
          showInteractive={false}
          className="react-flow-controls-baxter"
        />
      </ReactFlow>
    </div>
  );
}
