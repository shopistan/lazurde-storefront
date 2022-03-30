const path = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  coveragePathIgnorePatterns: [],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
    "^.+\\.jsx?$": "esbuild-jest",
  },
  moduleNameMapper: {
    "\\module\\.css$": "identity-obj-proxy",
    // "\\.css$": require.resolve("./test/mockcss.js"),
    // "\\.scss$": require.resolve("./test/mockcss.js"),
  },
  moduleDirectories: ["node_modules", path.join(__dirname, "src"), "shared"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
  collectCoverage: true,
  collectCoverageFrom: [
    "components/**/*.{js,jsx,tsx,ts}",
    "!components/**/descriptor.js",
    "!components/icons/*.{js,jsx,tsx,ts}",
    "!components/xm-component-library.ts",
    "!pages/cms/*.{js,jsx,tsx,ts}",
  ],
  setupFiles: ["./setup.js"],
};
