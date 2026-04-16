import { csvTemplates, generateCSVTemplate } from "../csv-templates";

describe("csvTemplates", () => {
  it("has customers, deals, and revenue keys", () => {
    expect(Object.keys(csvTemplates)).toEqual(["customers", "deals", "revenue"]);
  });

  it("each template has label and columns", () => {
    for (const key of Object.keys(csvTemplates)) {
      const t = csvTemplates[key];
      expect(t).toHaveProperty("label");
      expect(t).toHaveProperty("columns");
      expect(Array.isArray(t.columns)).toBe(true);
      expect(t.columns.length).toBeGreaterThan(0);
    }
  });

  it("each column has key, label, required, example", () => {
    for (const key of Object.keys(csvTemplates)) {
      for (const col of csvTemplates[key].columns) {
        expect(col).toHaveProperty("key");
        expect(col).toHaveProperty("label");
        expect(typeof col.required).toBe("boolean");
        expect(col).toHaveProperty("example");
      }
    }
  });
});

describe("generateCSVTemplate", () => {
  it("generates customers template with header and example", () => {
    const result = generateCSVTemplate("customers");
    const lines = result.split("\n");
    expect(lines).toHaveLength(2);
    expect(lines[0]).toBe("Name,Email,Company,MRR,Health Score");
    expect(lines[1]).toBe("Acme Corp,contact@acme.com,Acme Corporation,2500,85");
  });

  it("generates deals template", () => {
    const result = generateCSVTemplate("deals");
    const lines = result.split("\n");
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain("Deal Title");
    expect(lines[0]).toContain("Deal Value");
  });

  it("generates revenue template", () => {
    const result = generateCSVTemplate("revenue");
    const lines = result.split("\n");
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain("Month");
    expect(lines[0]).toContain("Revenue");
  });

  it("returns empty string for invalid key", () => {
    expect(generateCSVTemplate("invalid")).toBe("");
  });

  it("returns empty string for empty key", () => {
    expect(generateCSVTemplate("")).toBe("");
  });
});
