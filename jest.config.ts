/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  testEnvironment: "jsdom",
  projects: ["<rootDir>", "<rootDir>/apps/*", "<rootDir>/packages/*"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/apps/**/src/**/*.[jt]sx?",
    "<rootDir>/packages/**/src/**/*.[jt]sx?",
  ],
  coverageDirectory: "coverage",
  transform: {
    "\\.[jt]sx?$": ["babel-jest", { rootMode: "upward" }],
  },
};
