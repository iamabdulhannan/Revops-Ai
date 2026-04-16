import { cn } from "../cn";

describe("cn", () => {
  it("returns empty string for no arguments", () => {
    expect(cn()).toBe("");
  });

  it("passes through a single class", () => {
    expect(cn("text-sm")).toBe("text-sm");
  });

  it("merges multiple classes", () => {
    expect(cn("text-sm", "font-bold")).toBe("text-sm font-bold");
  });

  it("handles conditional objects", () => {
    expect(cn({ "bg-red-500": true, "bg-blue-500": false })).toBe(
      "bg-red-500"
    );
  });

  it("resolves Tailwind conflicts (last wins)", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("resolves text size conflicts", () => {
    expect(cn("text-sm text-grey-500", "text-lg")).toBe("text-grey-500 text-lg");
  });

  it("handles undefined and null values", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("handles array inputs", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });
});
