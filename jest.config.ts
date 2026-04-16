import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jest-environment-jsdom",

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          module: "commonjs",
          moduleResolution: "node",
          esModuleInterop: true,
          allowJs: true,
          strict: true,
          paths: { "@/*": ["./src/*"] },
        },
      },
    ],
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot)$":
      "<rootDir>/__mocks__/fileMock.ts",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.test.{ts,tsx}",
    "<rootDir>/src/**/*.test.{ts,tsx}",
  ],

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/app/**/*",
    "!src/types/**/*",
    "!src/styles/**/*",
  ],

  coverageReporters: ["text", "text-summary", "lcov"],
  coverageDirectory: "coverage",
};

export default config;
