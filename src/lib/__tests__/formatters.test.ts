import {
  formatCurrency,
  formatPercentage,
  formatNumber,
  formatDate,
  formatRelativeTime,
} from "../formatters";

describe("formatCurrency", () => {
  it("formats non-compact with Intl USD", () => {
    expect(formatCurrency(1234)).toBe("$1,234");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("formats compact millions", () => {
    expect(formatCurrency(1000000, true)).toBe("$1.0M");
  });

  it("formats compact 2.5 million", () => {
    expect(formatCurrency(2500000, true)).toBe("$2.5M");
  });

  it("formats compact thousands", () => {
    expect(formatCurrency(1000, true)).toBe("$1K");
  });

  it("formats compact rounds thousands", () => {
    expect(formatCurrency(1500, true)).toBe("$2K");
  });

  it("falls through to Intl for compact below 1000", () => {
    expect(formatCurrency(500, true)).toBe("$500");
  });

  it("handles negative values", () => {
    expect(formatCurrency(-500)).toBe("-$500");
  });

  it("formats large compact value", () => {
    expect(formatCurrency(999999, true)).toBe("$1000K");
  });
});

describe("formatPercentage", () => {
  it("uses 1 decimal by default", () => {
    expect(formatPercentage(42.567)).toBe("42.6%");
  });

  it("supports custom decimal count", () => {
    expect(formatPercentage(42.567, 2)).toBe("42.57%");
  });

  it("formats zero", () => {
    expect(formatPercentage(0)).toBe("0.0%");
  });

  it("formats 100", () => {
    expect(formatPercentage(100)).toBe("100.0%");
  });

  it("formats negative", () => {
    expect(formatPercentage(-5.3)).toBe("-5.3%");
  });
});

describe("formatNumber", () => {
  it("formats with Intl en-US", () => {
    expect(formatNumber(1234)).toBe("1,234");
  });

  it("formats compact thousands", () => {
    expect(formatNumber(1000, true)).toBe("1K");
  });

  it("formats compact millions", () => {
    expect(formatNumber(2500000, true)).toBe("2.5M");
  });

  it("formats zero", () => {
    expect(formatNumber(0)).toBe("0");
  });

  it("below 1K compact falls through", () => {
    expect(formatNumber(500, true)).toBe("500");
  });

  it("formats 999 non-compact", () => {
    expect(formatNumber(999)).toBe("999");
  });
});

describe("formatDate", () => {
  it("formats Date object", () => {
    expect(formatDate(new Date("2024-01-15T00:00:00"))).toBe("Jan 15, 2024");
  });

  it("formats string input", () => {
    expect(formatDate("2024-12-25T00:00:00")).toBe("Dec 25, 2024");
  });

  it("formats another date", () => {
    expect(formatDate(new Date("2023-06-01T00:00:00"))).toBe("Jun 1, 2023");
  });
});

describe("formatRelativeTime", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-03-02T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns 'Just now' for < 1 minute ago", () => {
    const date = new Date("2026-03-02T11:59:30Z");
    expect(formatRelativeTime(date)).toBe("Just now");
  });

  it("returns minutes ago", () => {
    const date = new Date("2026-03-02T11:55:00Z");
    expect(formatRelativeTime(date)).toBe("5m ago");
  });

  it("returns hours ago", () => {
    const date = new Date("2026-03-02T09:00:00Z");
    expect(formatRelativeTime(date)).toBe("3h ago");
  });

  it("returns days ago", () => {
    const date = new Date("2026-02-28T12:00:00Z");
    expect(formatRelativeTime(date)).toBe("2d ago");
  });

  it("returns formatted date for >= 7 days", () => {
    const date = new Date("2026-02-20T12:00:00Z");
    expect(formatRelativeTime(date)).toBe("Feb 20, 2026");
  });

  it("returns formatted date for 30 days ago", () => {
    const date = new Date("2026-01-31T12:00:00Z");
    expect(formatRelativeTime(date)).toBe("Jan 31, 2026");
  });
});
