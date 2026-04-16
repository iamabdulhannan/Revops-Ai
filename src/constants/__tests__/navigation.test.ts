import { SIDEBAR_NAVIGATION } from "../navigation";
import { ROUTES } from "../routes";

describe("SIDEBAR_NAVIGATION", () => {
  it("has 5 navigation groups", () => {
    expect(SIDEBAR_NAVIGATION).toHaveLength(5);
  });

  it("has correct group labels in order", () => {
    const labels = SIDEBAR_NAVIGATION.map((g) => g.label);
    expect(labels).toEqual([
      "Overview",
      "Revenue",
      "Tools",
      "Compliance",
      "Configuration",
    ]);
  });

  it("each group has label and non-empty items array", () => {
    for (const group of SIDEBAR_NAVIGATION) {
      expect(typeof group.label).toBe("string");
      expect(Array.isArray(group.items)).toBe(true);
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it("each nav item has label, path, and icon", () => {
    for (const group of SIDEBAR_NAVIGATION) {
      for (const item of group.items) {
        expect(typeof item.label).toBe("string");
        expect(typeof item.path).toBe("string");
        expect(typeof item.icon).toBe("string");
      }
    }
  });

  it("has 11 total nav items", () => {
    const total = SIDEBAR_NAVIGATION.reduce(
      (sum, g) => sum + g.items.length,
      0
    );
    expect(total).toBe(11);
  });

  it("all paths reference valid ROUTES values", () => {
    const routeValues = new Set(Object.values(ROUTES));
    for (const group of SIDEBAR_NAVIGATION) {
      for (const item of group.items) {
        expect(routeValues).toContain(item.path);
      }
    }
  });

  it("Overview group has Dashboard item", () => {
    expect(SIDEBAR_NAVIGATION[0].items[0].label).toBe("Dashboard");
    expect(SIDEBAR_NAVIGATION[0].items[0].icon).toBe("LayoutDashboard");
  });

  it("Compliance group has 3 items", () => {
    const compliance = SIDEBAR_NAVIGATION.find(
      (g) => g.label === "Compliance"
    );
    expect(compliance?.items).toHaveLength(3);
  });
});
