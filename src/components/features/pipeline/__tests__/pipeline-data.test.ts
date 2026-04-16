import {
  STAGE_ORDER,
  STAGE_LABELS,
  INITIAL_DEALS,
  groupDealsByStage,
  type StageKey,
} from "../pipeline-data";
import type { Deal } from "@/types";

describe("pipeline-data", () => {
  describe("STAGE_ORDER", () => {
    it("contains five stages in the correct order", () => {
      expect(STAGE_ORDER).toEqual([
        "lead",
        "qualified",
        "proposal",
        "negotiation",
        "closed-won",
      ]);
    });

    it("has the correct length", () => {
      expect(STAGE_ORDER).toHaveLength(5);
    });
  });

  describe("STAGE_LABELS", () => {
    it("maps each stage key to a human-readable label", () => {
      expect(STAGE_LABELS["lead"]).toBe("Lead");
      expect(STAGE_LABELS["qualified"]).toBe("Qualified");
      expect(STAGE_LABELS["proposal"]).toBe("Proposal");
      expect(STAGE_LABELS["negotiation"]).toBe("Negotiation");
      expect(STAGE_LABELS["closed-won"]).toBe("Closed Won");
    });

    it("has labels for all stages in STAGE_ORDER", () => {
      STAGE_ORDER.forEach((stage) => {
        expect(STAGE_LABELS[stage]).toBeDefined();
      });
    });
  });

  describe("INITIAL_DEALS", () => {
    it("contains 16 deals", () => {
      expect(INITIAL_DEALS).toHaveLength(16);
    });

    it("has deals in every stage", () => {
      const stages = new Set(INITIAL_DEALS.map((d) => d.stage));
      STAGE_ORDER.forEach((stage) => {
        expect(stages.has(stage)).toBe(true);
      });
    });

    it("each deal has all required properties", () => {
      INITIAL_DEALS.forEach((deal) => {
        expect(deal.id).toBeDefined();
        expect(deal.title).toBeDefined();
        expect(deal.company).toBeDefined();
        expect(typeof deal.value).toBe("number");
        expect(deal.stage).toBeDefined();
        expect(typeof deal.healthScore).toBe("number");
        expect(deal.assignee).toBeDefined();
        expect(deal.lastActivity).toBeDefined();
        expect(typeof deal.daysInStage).toBe("number");
      });
    });
  });

  describe("groupDealsByStage", () => {
    it("groups deals by their stage property", () => {
      const grouped = groupDealsByStage(INITIAL_DEALS);
      expect(Object.keys(grouped)).toHaveLength(STAGE_ORDER.length);
      STAGE_ORDER.forEach((stage) => {
        expect(Array.isArray(grouped[stage])).toBe(true);
      });
    });

    it("places each deal in the correct stage bucket", () => {
      const grouped = groupDealsByStage(INITIAL_DEALS);
      STAGE_ORDER.forEach((stage) => {
        grouped[stage].forEach((deal) => {
          expect(deal.stage).toBe(stage);
        });
      });
    });

    it("returns empty arrays for stages with no deals", () => {
      const singleDeal: Deal[] = [
        {
          id: "x1",
          title: "Test",
          company: "Test Co",
          value: 1000,
          stage: "lead",
          healthScore: 50,
          assignee: "Tester",
          lastActivity: "1h ago",
          daysInStage: 1,
        },
      ];
      const grouped = groupDealsByStage(singleDeal);
      expect(grouped["lead"]).toHaveLength(1);
      expect(grouped["qualified"]).toHaveLength(0);
      expect(grouped["proposal"]).toHaveLength(0);
      expect(grouped["negotiation"]).toHaveLength(0);
      expect(grouped["closed-won"]).toHaveLength(0);
    });

    it("preserves total deal count across all groups", () => {
      const grouped = groupDealsByStage(INITIAL_DEALS);
      const totalGrouped = STAGE_ORDER.reduce(
        (sum, stage) => sum + grouped[stage].length,
        0
      );
      expect(totalGrouped).toBe(INITIAL_DEALS.length);
    });
  });
});
