import { ROUTES } from "../routes";

describe("ROUTES", () => {
  it("is a non-empty object", () => {
    expect(typeof ROUTES).toBe("object");
    expect(Object.keys(ROUTES).length).toBeGreaterThan(0);
  });

  it("has 20 route entries", () => {
    expect(Object.keys(ROUTES)).toHaveLength(19);
  });

  it("all values start with /", () => {
    for (const value of Object.values(ROUTES)) {
      expect(value).toMatch(/^\//);
    }
  });

  it("has expected core routes", () => {
    expect(ROUTES.HOME).toBe("/");
    expect(ROUTES.OVERVIEW).toBe("/overview");
    expect(ROUTES.CUSTOMERS).toBe("/customers");
    expect(ROUTES.PIPELINE).toBe("/pipeline");
    expect(ROUTES.COPILOT).toBe("/copilot");
    expect(ROUTES.REPORTS).toBe("/reports");
    expect(ROUTES.PLAYBOOKS).toBe("/playbooks");
    expect(ROUTES.INTEGRATIONS).toBe("/integrations");
    expect(ROUTES.SETTINGS).toBe("/settings");
  });

  it("has nested settings routes", () => {
    expect(ROUTES.SETTINGS_TEAM).toBe("/settings/team");
    expect(ROUTES.SETTINGS_BILLING).toBe("/settings/billing");
  });

  it("has compliance routes", () => {
    expect(ROUTES.COMPLIANCE).toBe("/compliance");
    expect(ROUTES.COMPLIANCE_AUDIT).toBe("/compliance/audit");
    expect(ROUTES.COMPLIANCE_REPORTS).toBe("/compliance/reports");
  });

  it("has auth routes", () => {
    expect(ROUTES.LOGIN).toBe("/login");
    expect(ROUTES.REGISTER).toBe("/register");
    expect(ROUTES.FORGOT_PASSWORD).toBe("/forgot-password");
  });

  it("has marketing routes", () => {
    expect(ROUTES.PRICING).toBe("/pricing");
    expect(ROUTES.ABOUT).toBe("/about");
  });
});
