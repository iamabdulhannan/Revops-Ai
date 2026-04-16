import { stepsToNodesAndEdges, stepMeta } from "../playbook-flow-utils";
import type { PlaybookStep } from "@/data/playbook-data";

const makeStep = (
  overrides: Partial<PlaybookStep> & { id: string; order: number }
): PlaybookStep => ({
  type: "action",
  label: "Test Step",
  description: "Test description",
  config: {},
  ...overrides,
});

describe("stepMeta", () => {
  it("has entries for all four step types", () => {
    expect(Object.keys(stepMeta)).toEqual(["trigger", "condition", "action", "delay"]);
  });

  it("each entry has icon, colorClass, bgClass", () => {
    for (const key of Object.keys(stepMeta) as Array<keyof typeof stepMeta>) {
      expect(stepMeta[key]).toHaveProperty("icon");
      expect(stepMeta[key]).toHaveProperty("colorClass");
      expect(stepMeta[key]).toHaveProperty("bgClass");
    }
  });
});

describe("stepsToNodesAndEdges", () => {
  it("returns empty arrays for empty input", () => {
    const result = stepsToNodesAndEdges([]);
    expect(result).toEqual({ nodes: [], edges: [] });
  });

  it("returns 1 node and 0 edges for a single step", () => {
    const steps = [makeStep({ id: "s1", order: 1 })];
    const { nodes, edges } = stepsToNodesAndEdges(steps);
    expect(nodes).toHaveLength(1);
    expect(edges).toHaveLength(0);
  });

  it("returns 2 nodes and 1 edge for two steps", () => {
    const steps = [
      makeStep({ id: "s1", order: 1 }),
      makeStep({ id: "s2", order: 2 }),
    ];
    const { nodes, edges } = stepsToNodesAndEdges(steps);
    expect(nodes).toHaveLength(2);
    expect(edges).toHaveLength(1);
  });

  it("sorts steps by order field", () => {
    const steps = [
      makeStep({ id: "s3", order: 3, label: "Third" }),
      makeStep({ id: "s1", order: 1, label: "First" }),
      makeStep({ id: "s2", order: 2, label: "Second" }),
    ];
    const { nodes } = stepsToNodesAndEdges(steps);
    expect(nodes[0].data.label).toBe("First");
    expect(nodes[1].data.label).toBe("Second");
    expect(nodes[2].data.label).toBe("Third");
  });

  it("positions nodes vertically with 180px gap", () => {
    const steps = [
      makeStep({ id: "s1", order: 1 }),
      makeStep({ id: "s2", order: 2 }),
      makeStep({ id: "s3", order: 3 }),
    ];
    const { nodes } = stepsToNodesAndEdges(steps);
    expect(nodes[0].position).toEqual({ x: 0, y: 0 });
    expect(nodes[1].position).toEqual({ x: 0, y: 180 });
    expect(nodes[2].position).toEqual({ x: 0, y: 360 });
  });

  it("creates edge IDs in correct pattern", () => {
    const steps = [
      makeStep({ id: "s1", order: 1 }),
      makeStep({ id: "s2", order: 2 }),
    ];
    const { edges } = stepsToNodesAndEdges(steps);
    expect(edges[0].id).toBe("e-s1-s2");
    expect(edges[0].source).toBe("s1");
    expect(edges[0].target).toBe("s2");
  });

  it("uses smoothstep edge type", () => {
    const steps = [
      makeStep({ id: "s1", order: 1 }),
      makeStep({ id: "s2", order: 2 }),
    ];
    const { edges } = stepsToNodesAndEdges(steps);
    expect(edges[0].type).toBe("smoothstep");
  });

  it("marks all nodes as non-interactive", () => {
    const steps = [makeStep({ id: "s1", order: 1 })];
    const { nodes } = stepsToNodesAndEdges(steps);
    expect(nodes[0].draggable).toBe(false);
    expect(nodes[0].selectable).toBe(false);
    expect(nodes[0].connectable).toBe(false);
  });

  it("includes step data in node data field", () => {
    const steps = [
      makeStep({
        id: "s1",
        order: 1,
        type: "trigger",
        label: "New Customer",
        description: "When a new customer signs up",
      }),
    ];
    const { nodes } = stepsToNodesAndEdges(steps);
    expect(nodes[0].data).toEqual({
      stepId: "s1",
      order: 1,
      type: "trigger",
      label: "New Customer",
      description: "When a new customer signs up",
    });
  });
});
